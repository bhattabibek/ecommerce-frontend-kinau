import { addProducts, updateProductReducer } from "@/redux/features/product.slice";
import type { RootState } from "@/redux/root-reducer";
import { createProduct, updateProduct } from "@/redux/thunk/product.thunk";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface ProductFormProps {
  initialData?: any | null;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const dispatch = useDispatch<any>();
  const {isLoading, categories, error } = useSelector((state:RootState)=>state.categories)

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [basePrice, setBasePrice] = useState<number>(
    initialData?.basePrice || 0
  );

  const [mainImages, setMainImages] = useState<File[]>([]);

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const [weight, setWeight] = useState<number | "">(
    initialData?.weight || ""
  );

  const [dimensions, setDimensions] = useState({
    length: initialData?.dimensions?.length || "",
    width: initialData?.dimensions?.width || "",
    height: initialData?.dimensions?.height || "",
  });

  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seoDescription || ""
  );

  const isEditMode = Boolean(initialData?._id)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setMainImages(Array.from(e.target.files).slice(0, 5));
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    if (shortDescription) formData.append("shortDescription", shortDescription);
    formData.append("category", category);
    if (brand) formData.append("brand", brand);
    formData.append("basePrice", String(basePrice));

    if (weight !== "") formData.append("weight", String(weight));

    // if (dimensions.length)
    //   formData.append("dimensions.length", String(dimensions.length));

    // if (dimensions.width)
    //   formData.append("dimensions.width", String(dimensions.width));

    // if (dimensions.height)
    //   formData.append("dimensions.height", String(dimensions.height));

    if (seoTitle) formData.append("seoTitle", seoTitle);
    if (seoDescription)
      formData.append("seoDescription", seoDescription);

    tags.forEach((tag) => formData.append("tags", tag));

    mainImages.forEach((file) => {
      formData.append("mainImages", file);
    });

    if(isEditMode){
      try {
        const result = await dispatch(updateProduct(formData))
        if (updateProduct.fulfilled.match(result)) {
          dispatch(updateProductReducer(result.payload));
          toast.success("product updated");
        }
      } catch (error) {
        console.log(error, " error")
      }
    }else {
      try {
        const result = await dispatch(createProduct(formData));

        if (createProduct.fulfilled.match(result)) {
          dispatch(addProducts(result.payload))
          toast.success("Product created successfully");
        } else {
          console.error(result);
        }
      } catch (error) {
        console.log(error, " error")
      }
    }

   
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">Add / Edit Product</h2>

      {/* Name */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Short Description */}
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
          disabled={isLoading}
        >
          <option value="">
            {isLoading ? "Loading categories..." : "Select category"}
          </option>

          {categories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {error ? (
          <p className="text-red-500 text-sm mt-1">
            Failed to load categories
          </p>
        ): null}
      </div>


      {/* Brand */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      {/* Base Price */}
      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Base Price"
        value={basePrice}
        onChange={(e) => setBasePrice(Number(e.target.value))}
        required
      />

      {/* Images */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
      <p className="text-sm text-gray-500">Max 5 images</p>

      {/* Tags */}
      <div>
        <input
          className="w-full border p-2 rounded"
          placeholder="Type tag & press Enter"
          onKeyDown={handleTagAdd}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Weight */}
      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      {/* Dimensions */}
      <div className="grid grid-cols-3 gap-3">
        <input
          type="number"
          placeholder="Length"
          className="border p-2 rounded"
          value={dimensions.length}
          onChange={(e) =>
            setDimensions({ ...dimensions, length: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Width"
          className="border p-2 rounded"
          value={dimensions.width}
          onChange={(e) =>
            setDimensions({ ...dimensions, width: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Height"
          className="border p-2 rounded"
          value={dimensions.height}
          onChange={(e) =>
            setDimensions({ ...dimensions, height: Number(e.target.value) })
          }
        />
      </div>

      {/* SEO */}
      <input
        className="w-full border p-2 rounded"
        placeholder="SEO Title"
        value={seoTitle}
        onChange={(e) => setSeoTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="SEO Description"
        value={seoDescription}
        onChange={(e) => setSeoDescription(e.target.value)}
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}

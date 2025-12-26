// components/admin/Variant/VariantForm.tsx
import { addVariant } from "@/redux/features/variant.slice";
import type { RootState } from "@/redux/root-reducer";
import { createVariant } from "@/redux/thunk/variant.thunk";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function VariantForm({initialData}: any) {
  const dispatch = useDispatch<any>();
  const {isLoading: productLoading, products, error: productError } = useSelector((state:RootState)=>state.product)
  const {isLoading: sizeLoading, sizes, error: sizeError } = useSelector((state:RootState)=>state.size)
  const {isLoading:colorLoading, colors, error: colorError } = useSelector((state:RootState)=>state.color)


  const [product, setProduct] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product", product);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("sku", sku);
    formData.append("price", String(price));
    formData.append("stock", String(stock));

    if (discountPrice !== "")
      formData.append("discountPrice", String(discountPrice));

    if (image) formData.append("image", image);

    const result = await dispatch(createVariant(formData));

    if (createVariant.fulfilled.match(result)) {
       dispatch(addVariant(result.payload))
      toast.success("Variant created successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Add Variant</h2>

<select
  className="w-full border p-2 rounded"
  value={product}
  onChange={(e) => setProduct(e.target.value)}
  required
>
  <option value="">Select Product</option>
  {products.map((p: any) => (
    <option key={p._id} value={p._id}>
      {p.name}
    </option>
  ))}
</select>

<select
  className="w-full border p-2 rounded"
  value={color}
  onChange={(e) => setColor(e.target.value)}
  required
>
  <option value="">Select Color</option>
  {colors.map((c: any) => (
    <option key={c._id} value={c._id}>
      {c.name}
    </option>
  ))}
</select>
<select
  className="w-full border p-2 rounded"
  value={size}
  onChange={(e) => setSize(e.target.value)}
  required
>
  <option value="">Select Size</option>
  {sizes.map((s: any) => (
    <option key={s._id} value={s._id}>
      {s.name}
    </option>
  ))}
</select>


      <input className="input" placeholder="SKU" onChange={(e) => setSku(e.target.value)} required />

      <input type="number" className="input" placeholder="Price" onChange={(e) => setPrice(Number(e.target.value))} required />
      <input type="number" className="input" placeholder="Discount Price" onChange={(e) => setDiscountPrice(Number(e.target.value))} />

      <input type="number" className="input" placeholder="Stock" onChange={(e) => setStock(Number(e.target.value))} required />

      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Save Variant
      </button>
    </form>
  );
}

import { useDispatch, useSelector } from "react-redux";
import ProductReviewPage from "./Review";
import { TiShoppingCart } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { fetchProductDetailsWithSlug } from "@/redux/thunk/product.thunk";
import type { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/features/cart.slice";
import type { RootState } from "@/redux/root-reducer";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  const cart = useSelector((state:RootState)=>state.carts.carts)

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const result = await dispatch(fetchProductDetailsWithSlug(slug));
      if (fetchProductDetailsWithSlug.fulfilled.match(result)) {
        setProduct(result.payload?.data || result.payload);
      }
    })();
  }, [dispatch, slug]);

  // Extract unique colors & sizes from variants
  const colors = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(
      new Map(product.variants.map((v: any) => [v.color._id, v.color])).values()
    );
  }, [product]);

  const sizes = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(
      new Map(product.variants.map((v: any) => [v.size._id, v.size])).values()
    );
  }, [product]);

  // Find variant matching current selection
  const selectedVariant = useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return product?.variants.find(
      (v: any) => v.color._id === selectedColor._id && v.size._id === selectedSize._id
    );
  }, [product, selectedColor, selectedSize]);

  // Calculate dynamic price: basePrice + variant price
  const displayedPrice = useMemo(() => {
    if (!product) return 0;
    const variantPrice = selectedVariant?.discountPrice ?? selectedVariant?.price ?? 0;
    return product.basePrice + variantPrice;
  }, [product, selectedVariant]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a valid variant");
      return;
    }

    const cartItem = {
      product: product._id,
      variant: selectedVariant,
      quantity: 1,
      price: displayedPrice,
    };
    dispatch(addToCart(cartItem))
   
    const totalAmount = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    toast.success(`Added to cart! `);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <img
            src={selectedVariant?.image || product?.mainImages?.[0] || "/assets/product.jpg"}
            alt={product?.name}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>

          <p className="text-2xl font-semibold text-green-600 mb-4">
            Rs. {displayedPrice}
          </p>

          <p className="text-gray-700 mb-6">{product?.description}</p>

          {/* Colors */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Color</h4>
            <div className="flex gap-3">
              {colors.map((color: any) => {
                const available = product?.variants.some(
                  (v: any) => v.color._id === color._id && (!selectedSize || v.size._id === selectedSize._id)
                );
                return (
                  <button
                    key={color._id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor?._id === color._id ? "border-black" : "border-gray-300"
                    } ${!available ? "opacity-40 cursor-not-allowed" : ""}`}
                    style={{ backgroundColor: color.hexCode }}
                    disabled={!available}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2">Size</h4>
            <div className="flex gap-3">
              {sizes.map((size: any) => {
                const available = product?.variants.some(
                  (v: any) => v.size._id === size._id && (!selectedColor || v.color._id === selectedColor._id)
                );
                return (
                  <button
                    key={size._id}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 border rounded-full text-sm ${
                      selectedSize?._id === size._id ? "border-black bg-gray-100" : "border-gray-300"
                    } ${!available ? "opacity-40 cursor-not-allowed" : ""}`}
                    disabled={!available}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className="bg-blue-900 hover:bg-blue-700 disabled:bg-gray-400 rounded-sm text-white px-6 py-2 shadow transition duration-200 flex items-center gap-2"
          >
            <TiShoppingCart size={26} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <ProductReviewPage />
    </div>
  );
}

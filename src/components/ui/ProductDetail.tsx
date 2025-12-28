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
import { FaStar } from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const cart = useSelector((state: RootState) => state.carts.carts);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const result = await dispatch(fetchProductDetailsWithSlug(slug));
      if (fetchProductDetailsWithSlug.fulfilled.match(result)) {
        setProduct(result.payload?.data || result.payload);
      }
    })();
  }, [dispatch, slug]);

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

  const selectedVariant = useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return product?.variants.find(
      (v: any) =>
        v.color._id === selectedColor._id && v.size._id === selectedSize._id
    );
  }, [product, selectedColor, selectedSize]);

  const displayedPrice = useMemo(() => {
    if (!product) return 0;
    const variantPrice =
      selectedVariant?.discountPrice ?? selectedVariant?.price ?? 0;
    return product.basePrice + variantPrice;
  }, [product, selectedVariant]);

  const originalPrice = useMemo(() => {
    if (!product) return 0;
    return product.basePrice + (selectedVariant?.price || 0);
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
    dispatch(addToCart(cartItem));

    toast.success(
      <div className="flex items-center gap-3">
        <IoCheckmarkCircleSharp className="text-green-500 text-xl" />
        <div>
          <p className="font-semibold">Added to cart successfully!</p>
          <p className="text-sm text-gray-600">
            Continue shopping or proceed to checkout
          </p>
        </div>
      </div>
    );
  };

  const productImages = useMemo(() => {
    const images = product?.mainImages || [];
    if (selectedVariant?.image) {
      return [selectedVariant.image, ...images];
    }
    return images;
  }, [product, selectedVariant]);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="flex items-center space-x-2">
            <li>Home</li>
            <li className="text-gray-300">/</li>
            <li>Products</li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {product?.name}
            </li>
          </ol>
        </nav>

        {/* Hero Layout */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left Column: Product Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
              <img
                src={productImages[selectedImage] || "/assets/product-placeholder.jpg"}
                alt={product?.name}
                className="w-full h-[550px] object-contain transition-transform duration-500 hover:scale-105"
              />
              {product?.discount && (
                <span className="absolute top-6 left-6 bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold animate-pulse shadow-lg">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            <div className="flex gap-4 overflow-x-auto">
              {productImages.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 transition-transform duration-300 ${
                    selectedImage === idx ? "border-blue-600 scale-105 shadow-lg" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col justify-between space-y-6">

            {/* Title & Rating */}
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900">{product?.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="text-gray-700 font-medium">4.8</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">142 Reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-4xl font-extrabold text-gray-900">
                Rs. {displayedPrice.toLocaleString()}
              </span>
              {originalPrice > displayedPrice && (
                <>
                  <span className="text-gray-400 line-through text-xl">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-green-500 text-white px-5 py-1 rounded-full text-sm font-semibold">
                    Save Rs. {(originalPrice - displayedPrice).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-lg mt-4">{product?.description}</p>

            {/* Color Selector */}
            <div className="space-y-2 mt-6">
              <h4 className="font-semibold text-gray-900">Select Color</h4>
              <div className="flex gap-4 flex-wrap">
                {colors.map((color: any) => {
                  const available = product?.variants.some(
                    (v: any) =>
                      v.color._id === color._id &&
                      (!selectedSize || v.size._id === selectedSize._id)
                  );
                  return (
                    <button
                      key={color._id}
                      onClick={() => setSelectedColor(color)}
                      disabled={!available}
                      className={`w-14 h-14 rounded-full border-4 transition-all duration-300 relative ${
                        selectedColor?._id === color._id ? "border-blue-600 scale-110 shadow-lg" : "border-gray-200 hover:border-gray-400"
                      } ${!available ? "opacity-40 cursor-not-allowed" : ""}`}
                      style={{ backgroundColor: color.hexCode }}
                    >
                      {selectedColor?._id === color._id && (
                        <IoCheckmarkCircleSharp className="absolute -top-1 -right-1 text-blue-600 bg-white rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 mt-6">
              <h4 className="font-semibold text-gray-900">Select Size</h4>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size: any) => {
                  const available = product?.variants.some(
                    (v: any) =>
                      v.size._id === size._id &&
                      (!selectedColor || v.color._id === selectedColor._id)
                  );
                  return (
                    <button
                      key={size._id}
                      onClick={() => setSelectedSize(size)}
                      disabled={!available}
                      className={`py-3 px-6 rounded-xl transition-all duration-300 ${
                        selectedSize?._id === size._id
                          ? "bg-blue-50 border-2 border-blue-500 text-blue-700 font-bold shadow"
                          : "bg-white border-2 border-gray-200 hover:border-gray-300"
                      } ${!available ? "opacity-40 cursor-not-allowed bg-gray-100" : ""}`}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className={`w-full py-5 rounded-xl font-bold text-white transition-all duration-500 ${
                  !selectedVariant
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-black shadow-lg"
                }`}
              >
                {selectedVariant ? "ADD TO CART" : "SELECT OPTIONS"}
              </button>
              <button className="w-full py-4 bg-black text-white rounded-xl hover:shadow-lg font-medium">
                BUY NOW
              </button>
            </div>

            {/* Highlights */}
            <div className="mt-8 border-t border-gray-200 pt-6 space-y-2">
              <h4 className="font-bold text-gray-900 text-lg">Product Highlights</h4>
              <ul className="space-y-1">
                {["Premium quality materials", "Eco-friendly manufacturing", "100% satisfaction guarantee"].map((h, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <IoCheckmarkCircleSharp className="text-green-500" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20">
          <ProductReviewPage />
        </div>
      </div>
    </div>
  );
}

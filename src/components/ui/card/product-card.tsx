import { addToCart } from "@/redux/features/cart.slice";
import type { AppDispatch } from "@/redux/store";
import { addToWishList } from "@/redux/thunk/wishlist.thunk";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.priceRange?.min ?? product.basePrice,
        image: product.mainImages?.[0],
        quantity: 1,
        variantId: 1,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = async () => {
    await dispatch(addToWishList({ productId: product.id }));
    toast.success("Added to wishlist");
  };

  return (
    <div className="relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden group font-sans transition-all hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={product?.mainImages?.[0] || "/assets/product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Icon at Top Right */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-transform duration-300 z-20"
        >
          <Heart className="text-red-500" size={20} />
        </button>

        {/* Discount / Featured Ribbons */}
        {product?.discount && (
          <div className="absolute top-4 left-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-br-xl text-sm font-bold shadow-md z-10">
            -{product.discount}% OFF
          </div>
        )}
        {product?.isFeatured && (
          <div className="absolute top-12 left-0 bg-green-100 text-green-700 px-3 py-1 rounded-br-xl text-sm font-semibold shadow-md z-10">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-gray-900 font-semibold text-lg line-clamp-2">
          {product?.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{product?.description}</p>
        <p className="text-xl font-bold text-gray-900">
          Rs. {product?.priceRange?.min ?? product?.basePrice}
        </p>
      </div>

      {/* Actions Strip */}
      <div className="flex items-center justify-between bg-gray-50 px-5 py-3 border-t border-gray-200 transition-transform group-hover:translate-y-0 translate-y-2">
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-all font-medium"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
        <Link
          to={`/auth/productDetailPage/${product?.slug}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

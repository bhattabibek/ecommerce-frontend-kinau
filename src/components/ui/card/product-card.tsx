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
      variantId: 1
    })
  );
  };

  const handleAddToWishlist = async()=> {
    await dispatch(addToWishList({productId: product.id}))
    toast.success("added to wishlist")
  }

  return (
    <div className="relative border-2 hover:border-black transition cursor-pointer">
      <button onClick={handleAddToWishlist} className="absolute top-5 right-5">
        <Heart />
      </button>

      <img
        src={product?.mainImages?.[0] || "/assets/product.jpg"}
        className="object-cover w-full aspect-square"
      />

      <div className="m-2">
        <div className="flex items-center justify-between">
          {product?.isFeatured && (
            <span className="text-xs text-green-600 font-medium">
              Featured
            </span>
          )}

          <button onClick={handleAddToCart}>
            <ShoppingCart />
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-red-600 font-bold">
            Rs. {product?.priceRange?.min ?? product?.basePrice}
          </p>

          <p className="line-clamp-2">
            {product?.description}
          </p>
        </div>
        <Link to={`/auth/productDetailPage/${product?.slug}`}>View</Link>
      </div>
    </div>
  );
};

export default ProductCard;

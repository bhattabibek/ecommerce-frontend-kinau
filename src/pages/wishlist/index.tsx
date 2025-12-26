import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";
import { getWishList, removeFromWishlist } from "@/redux/thunk/wishlist.thunk";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlists, isLoading } = useSelector((state:RootState) => state.wishlist);
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlists.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Heart className="w-12 h-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-2">
          Save items you love for later
        </p>
        <Link
          to="/shop"
          className="mt-4 text-indigo-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleRemoveFromWishlist = async(productId: string)=>{
    const result = await dispatch(removeFromWishlist(productId))
    if(removeFromWishlist.fulfilled.match(result)){
     toast.success("removed from wishlist")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlists.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <Link to={`/product/${item.product._id}`}>
              <img
                src={item.product.mainImages[0]}
                alt={item.product.name}
                className="w-full h-48 object-cover rounded"
              />
            </Link>

            <div className="mt-4">
              <Link
                to={`/product/${item.product._id}`}
                className="font-semibold hover:underline"
              >
                {item.product.name}
              </Link>

              <p className="text-gray-600 mt-1">
                ${item.product.priceRange.min}
              </p>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/auth/productDetailPage/${item.product.slug}`}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  View Product
                </Link>

                <button
                  onClick={() =>
                    handleRemoveFromWishlist(item.product._id)
                  }
                  className="text-red-500 hover:text-red-600"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

import useDebounce from "@/hooks/useDebounce";
import { Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/features/thunks";
import { useHasToken } from "@/hooks/useCheckStates";
import type { RootState } from "@/redux/root-reducer";
import { getWishlistCount } from "@/redux/thunk/wishlist.thunk";
import { changeWishlistCount } from "@/redux/features/wishlist.slice";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const debouncedValue = useDebounce(search, 1000);
  const carts = useSelector((state: RootState) => state.carts.carts);
  const productCount = carts?.length ?? 0;
  const wishListCount = useSelector((state: RootState) => state.wishlist.count);
  const isLoggedIn = useHasToken();

  useEffect(() => {
    (async () => {
      const result = await dispatch(getWishlistCount());
      if (getWishlistCount.fulfilled.match(result)) {
        dispatch(changeWishlistCount(result.payload.count));
      }
    })();
  }, []);

  const logOut = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center text-xs tracking-widest py-2">
        Free Shipping on Orders Above NPR 5,000
      </div>

      {/* Main Navbar */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-20 items-center justify-between gap-6">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/kinaulogo.png"
                alt="Kinau"
                className="w-12 h-12 object-contain"
              />
            </Link>


          

            {/* Search */}
            <div className="relative hidden lg:block w-[320px]">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80 transition"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6 text-gray-700">

              {/* User */}
              <div className="relative group">
                <Link to="/login">
                  <FaRegUser className="w-5 h-5 hover:text-black transition" />
                </Link>

                {isLoggedIn && (
                  <div
                    className="absolute right-0 mt-4 w-44 rounded-xl bg-white border shadow-xl
                               opacity-0 invisible group-hover:opacity-100 group-hover:visible
                               transition-all duration-200"
                  >
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logOut}
                          className="w-full font-sans text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-5 h-5 hover:text-black transition" />
                {productCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
                               rounded-full bg-black text-white text-[10px]
                               flex items-center justify-center font-medium"
                  >
                    {productCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative">
                <IoBagHandleOutline className="w-5 h-5 hover:text-black transition" />
                {wishListCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
                               rounded-full bg-black text-white text-[10px]
                               flex items-center justify-center font-medium"
                  >
                    {wishListCount}
                  </span>
                )}
              </Link>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

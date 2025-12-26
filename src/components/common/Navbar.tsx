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
  console.log(search, debouncedValue);
  const carts = useSelector((state: RootState) => state.carts.carts);
  const productCount = carts?.length ?? 0;
  const wishListCount = useSelector((state:RootState)=>state.wishlist.count)

  const isLoggedIn = useHasToken()
  useEffect(()=>{
  (async()=>{
    const result = await dispatch(getWishlistCount())
    if(getWishlistCount.fulfilled.match(result)){
      dispatch(changeWishlistCount(result.payload.count))
    }
  })()

  },[])
  const logOut = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login", { replace: true });
    });
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/30 backdrop-blur-md shadow-md text-black p-4">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div>
          <img width={50} height={50} src="/assets/kinaulogo.png" />
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="hidden md:flex gap-10 uppercase font-semibold tracking-wide">
            <li className="cursor-pointer hover:text-gray-300">
              <Link to="/">Womens</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-300">
              <Link to="/about">Mens</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-300">
              <Link to="contact">Children</Link>
            </li>
          </ul>
        </nav>

        {/* Search Box */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search the store..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-400 text-black rounded p-2 pr-10"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            <Search />
          </div>
        </div>

        {/* User & Cart Icons */}
        <div className="flex items-center gap-6 text-2xl">
          <div className="relative group">
            <Link to="/login">
              <FaRegUser className="cursor-pointer hover:text-gray-300" />
            </Link>

            {
              isLoggedIn &&
            <div
              className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md 
                 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                 transition-all duration-200 z-50"
            >
              <ul className="py-2 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/profile">Profile</Link>
                </li>

                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button onClick={logOut} className="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            }

            
          </div>

          {/* CART ICON */}
          <Link to="/cart">
            <div className="relative">
              <ShoppingCart className="cursor-pointer hover:text-gray-300 w-6 h-6" />

              {productCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                         font-bold px-1.5 py-0.5 rounded-full"
                >
                  {productCount}
                </span>
              )}
            </div>
          </Link>

          {/* BAG ICON */}
          <Link to="/wishlist">
            <div className="relative">
              <IoBagHandleOutline className="cursor-pointer hover:text-gray-300 w-6 h-6" />

              {wishListCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                         font-bold px-1.5 py-0.5 rounded-full"
                >
                  {wishListCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

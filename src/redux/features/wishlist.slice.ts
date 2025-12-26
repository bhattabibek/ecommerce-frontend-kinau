import type { wishlistI } from "@/interfaces/wishlists.interface";
import { createSlice } from "@reduxjs/toolkit";
import { addToWishList, getWishList, getWishlistCount, removeFromWishlist } from "../thunk/wishlist.thunk";
import type { productI } from "@/interfaces/product.interface";

interface initialStateI {
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  wishlists: any[];
  count: number
}

const initialState: initialStateI = {
  isLoading: false,
  isFetching: false,
  error: null,
  wishlists: [],
  count: 0
};

// TODO: fetch wishlists function
//'wishlists/fetchwishlists' should be unique and this is just naming convention {sliceName}/{functionName}
// const fetchWishilists = createAsyncThunk(
//   "wishlists/fetchWishilists",
//   async (args, thunkApi) => {
//     try {
//       // API call res...
//       return "res"; // this goes to fulfilled action.payload.
//     } catch (error) {
//       return thunkApi.rejectWithValue(error); //this goes to rejected action.payload.
//     }
//   }
// );

const wishlistSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    removeWishlistFromStore: (state, action) => {
      state.wishlists = state.wishlists.filter(
        (wl) => wl.id !== action.payload
      );
    },
    changeWishlistCount : (state, action)=>{
      state.count = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addToWishList.fulfilled,(state, action)=>{
      state.isLoading = false;
      state.count = action.payload.items.length
    })
      .addCase(getWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlists = action.payload.items;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null;
      })
      .addCase(removeFromWishlist.fulfilled,(state, action)=>{
        state.isLoading = false;
        state.wishlists = action.payload.items;
        state.count = action.payload.items.length;
      })
      .addCase(getWishlistCount.fulfilled,(state, action)=>{
        state.isLoading = false;
        state.count = action.payload.count;
      })
  },
});

export default wishlistSlice.reducer;

export const { removeWishlistFromStore, changeWishlistCount } = wishlistSlice.actions;

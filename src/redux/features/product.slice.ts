import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../thunk/product.thunk";

interface initialStateI {
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  products: any[];
}

const initialState: initialStateI = {
    isLoading:false,
    isFetching: false,
    error: null,
    products:[]
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, action)=> {
            state.products = action.payload
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to load products";
      });
  },
})

export default productSlice.reducer;
export const {addProducts} = productSlice.actions
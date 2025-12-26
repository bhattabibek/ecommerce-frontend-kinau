import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, getAllProducts, getAllProductsWithPagination } from "../thunk/product.thunk";

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
            state.products.push(action.payload)
        },
        updateProductReducer: (state, action)=>{
            const index = state.products.findIndex((product)=>product._id===action.payload._id)
            if(index !== -1){
                state.products[index] = action.payload;
            }
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
      })
      .addCase(getAllProductsWithPagination.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(deleteProduct.fulfilled,(state, action)=>{
        state.isLoading = false;
        state.products = state.products.filter((p)=>p._id !== action.payload)
      })
  },
})

export default productSlice.reducer;
export const {addProducts, updateProductReducer} = productSlice.actions
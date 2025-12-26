import { createSlice } from "@reduxjs/toolkit";
import { createVariant, deleteVariant, getAllVariantByProduct } from "../thunk/variant.thunk";

interface VariantState {
  variants: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VariantState = {
  variants: [],
  isLoading: false,
  error: null,
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    addVariant: (state, action)=>{
        state.variants.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVariant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVariant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.variants.push(action.payload);
      })
      .addCase(createVariant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllVariantByProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVariantByProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.variants = action.payload;
      })
      .addCase(getAllVariantByProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteVariant.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.variants = state.variants.filter((v)=>v._id !== action.payload)
      })
  },
});

export default variantSlice.reducer;
export const {addVariant} = variantSlice.actions
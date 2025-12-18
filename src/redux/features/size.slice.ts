import type { SizeI } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";
import { deleteSize, getAllSizes } from "../thunk/size.thunk";

interface initialStateI {
    isLoading: boolean;
    isFeatching: boolean;
    error: unknown;
    sizes: SizeI[]
}

const initialState: initialStateI = {
    isLoading:false,
    isFeatching: false,
    error: null,
    sizes:[]
}

const sizeSlice = createSlice({
    name: "sizes",
    initialState,
    reducers: {
        addSize: (state, action)=>{
            state.sizes.push(action.payload)
        },
        updateSize: (state, action) => {
            const index = state.sizes.findIndex(
                (size) => size._id === action.payload._id
            );
            if (index !== -1) {
                state.sizes[index] = action.payload;
            }
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getAllSizes.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllSizes.fulfilled, (state, action)=>{
            state.isLoading = false
            state.sizes = action.payload
        })
        .addCase(getAllSizes.rejected, (state, action) => {
            state.isLoading = false;
            state.error = (action.payload as string) || "Failed to load size";
        })
        .addCase(deleteSize.fulfilled, (state, action)=>{
            state.isLoading = false
            state.sizes = state.sizes.filter((s)=>s._id !== action.payload)
        })
    }
})

export default sizeSlice.reducer;
export const {addSize, updateSize} = sizeSlice.actions
import type { ColorI } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";
import { deleteColor, getAllColor } from "../thunk/color.thunk";

interface initialStateI {
    isLoading: boolean;
    isFeatching: boolean;
    error: unknown;
    colors: ColorI[]
}

const initialState: initialStateI = {
    isLoading: false,
    isFeatching: false,
    error: null,
    colors: []
}

const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {
        addColor: (state, action) => {
            state.colors.push(action.payload)
        },
        updateColorReducer: (state, action)=>{
            const index = state.colors.findIndex((color)=>color._id===action.payload._id)
            if(index !== -1){
                state.colors[index] = action.payload;
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllColor.pending, (state)=> {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllColor.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.colors = action.payload;
        })
        .addCase(getAllColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = (action.payload as string) || "Failed to load colors";
        })
        .addCase(deleteColor.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.colors = state.colors.filter((c)=>c._id !== action.payload)
        })
    }
})
export default colorSlice.reducer
export const { addColor, updateColorReducer } = colorSlice.actions
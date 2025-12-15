import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory, getAllCategory } from "../thunk/category.thunk";
import type { CategoryI } from "@/interfaces/category.interface";
import { ActivityIcon } from "lucide-react";

interface initialStateI {
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  categories: CategoryI[];
}

const initialState: initialStateI = {
    isLoading:false,
    isFetching: false,
    error: null,
    categories:[]
}

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload; 
        },
        addCategories: (state, action)=> {
            state.categories.push(action.payload)
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to load products";
      })
      .addCase(deleteCategory.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.categories = state.categories.filter(cat=>cat.id !== action.payload)
      })
  },
})

export default categorySlice.reducer;
export const {addCategories, setCategories} = categorySlice.actions
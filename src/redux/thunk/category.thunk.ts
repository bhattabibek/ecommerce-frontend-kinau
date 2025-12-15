import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/axios"; // your axios instance
import type { CategoryI } from "@/interfaces/category.interface";

export const createCategory = createAsyncThunk<CategoryI,any>(
  "admin/createCategory",
  async (data, { rejectWithValue }) => { 
    try {
      const response = await api.post("/categories", data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllCategory = createAsyncThunk<CategoryI[],void>(
    "admin/getAllCategory",
     async (_, { rejectWithValue }) => { 
        try {
            const response = await api.get("/categories");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
            
        }
    }
)

export const deleteCategory = createAsyncThunk<string, string>("admin/deleteCategory",
    async (id,{rejectWithValue})=>{
        try {
      const response = await api.delete(`/categories/${id}`);
            return id
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

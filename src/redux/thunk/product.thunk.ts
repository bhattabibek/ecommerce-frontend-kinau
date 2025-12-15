import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/axios"; // your axios instance
import type { productI } from "@/interfaces/product.interface";

export const getAllProducts = createAsyncThunk<productI[],void, any>(
    "admin/getAllProducts",
     async (_, { rejectWithValue }) => { 
        try {
            const response = await api.get("/products");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
            
        }
    }
)

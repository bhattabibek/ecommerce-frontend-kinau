import { api } from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCartThunk = createAsyncThunk<any,any>(
    "add/cart",
    async(data, {rejectWithValue})=>{
        try {
            const response = await api.post("/carts/add",data);
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
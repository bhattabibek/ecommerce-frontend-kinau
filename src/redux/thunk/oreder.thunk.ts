import { api } from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk<any,any>(
    "create/order",
    async(data, {rejectWithValue})=>{
        try {
           const response = await api.post("/orders",data)
           return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const monthlySales = createAsyncThunk<any, any>(
    "admin/sales",
    async(data, {rejectWithValue})=>{
        try {
           const response = await api.post("/orders/sales",data) 
           return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
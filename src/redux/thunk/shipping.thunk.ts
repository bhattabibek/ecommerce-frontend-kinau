import { api } from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createShippingAddress = createAsyncThunk<any,any>(
    "create/shipping-address",
    async(data,{rejectWithValue})=>{
        try {
            const response = await api.post("/shipping-addresses",data)
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getDefaultShippingAddress = createAsyncThunk<any, void>(
    "default/shipping-address",
    async(_, {rejectWithValue})=>{
        try {
           const response = await api.get("/shipping-addresses/default")
           return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
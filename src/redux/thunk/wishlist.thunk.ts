import { api } from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishList = createAsyncThunk<any,any>(
    "add/wishlist",
    async(data, {rejectWithValue})=>{
        try {
           const response = await api.post("/wishlists", data) 
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getWishList = createAsyncThunk<any, void>(
    "get/wishlist",
    async(_,{rejectWithValue})=>{
        try {
            const response = await api.get("/wishlists")
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getWishlistCount = createAsyncThunk<any, void>(
    "get/wishlist/count",
    async(_,{rejectWithValue})=>{
        try {
          const response = await api.get("/wishlists/count")  
          return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const removeFromWishlist = createAsyncThunk<any, any>(
    "remove/wishlist",
    async(productId, {rejectWithValue})=>{
        try {
           const response = await api.delete(`/wishlists/remove/${productId}`) 
           return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
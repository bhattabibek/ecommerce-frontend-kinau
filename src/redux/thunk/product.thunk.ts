import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiMedia } from "@/api/axios"; // your axios instance
import type { productI } from "@/interfaces/product.interface";

export const getAllProducts = createAsyncThunk<productI[],any>(
    "admin/getAllProducts",
     async (query, { rejectWithValue }) => { 
        try {
            const response = await api.get("/products",{
                params: query,
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
            
        }
    }
)

export const getAllProductsWithPagination = createAsyncThunk<any,any>(
    "admin/getAllProductsWithPagination",
     async (query, { rejectWithValue }) => { 
        try {
            const response = await api.get("/products",{
                params: query,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
            
        }
    }
)

export const createProduct = createAsyncThunk<any, any>(
    "admin/createProduct",
    async(data,{rejectWithValue})=>{
        try {
            const response = await apiMedia.post("/products", data)
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const updateProduct = createAsyncThunk<any, any>(
    "admin/updateProduct",
    async(data:any, {rejectWithValue})=>{
        try {
            const response = await apiMedia.put(`/products/${data._id}`, data)
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteProduct = createAsyncThunk<any, any>(
    "admin/deleteProduct",
    async(id,{rejectWithValue})=>{
        try {
            const response = await api.delete(`/products/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchProductDetailsWithSlug = createAsyncThunk<any, any>(
    "products/slug",
    async(slug, {rejectWithValue})=>{
        try {
            const response = await api.get(`/products/slug/${slug}`)
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

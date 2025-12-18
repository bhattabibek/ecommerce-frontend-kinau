import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/axios";
import type { ColorI } from "@/interfaces/product.interface";

export const createColor = createAsyncThunk<ColorI, any>(
    'admin/createColor',
    async (data, {rejectWithValue})=>{
        try {
            const response = await api.post("/colors", data);
            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const updateColor = createAsyncThunk(
    "admin/updateColor",
    async(data: any, {rejectWithValue})=>{
        try {
            const res = await api.put(`/colors/${data._id}`,data)
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const getAllColor = createAsyncThunk<ColorI[],void>(
    "getAllColor",
    async (_,{rejectWithValue})=>{
        try {
            const response = await api.get("/colors");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


export const deleteColor = createAsyncThunk<any, any>(
    "admin/deleteColor",
    async(id,{rejectWithValue})=>{
        try {
            const response = await api.delete(`/colors/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
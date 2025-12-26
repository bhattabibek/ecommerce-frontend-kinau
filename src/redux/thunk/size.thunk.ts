import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/axios";
import type { SizeI } from "@/interfaces/product.interface";

export const createSize = createAsyncThunk< SizeI ,any>(
  "admin/createSize",
  async (data, { rejectWithValue }) => { 
    try {
      const response = await api.post("/sizes", data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSize = createAsyncThunk(
  "admin/update-size",
  async (
    data: { id: string; name: string; code: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/sizes/${data.id}`, data);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllSizes = createAsyncThunk<SizeI[], void>(
    "getAllSizes",
    async (_,{rejectWithValue})=>{
        try {
            const response = await api.get("/sizes");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteSize = createAsyncThunk<any, any>(
    "admin/deleteSize",
    async(id,{rejectWithValue})=>{
        try {
            const response = await api.delete(`/sizes/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
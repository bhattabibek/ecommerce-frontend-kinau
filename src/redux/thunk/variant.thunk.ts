import { api, apiMedia } from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createVariant = createAsyncThunk(
  "admin/createVariant",
  async (formData: any, { rejectWithValue }) => {
    try {
        console.log(formData, " formdata")
      const res = await apiMedia.post(`/product-variants/product/${formData.get("product")}`, formData);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Variant creation failed"
      );
    }
  }
);

export const getAllVariantByProduct = createAsyncThunk<any[],void>(
    "product/getAllVariants",
    async (productId,{rejectWithValue})=>{
        try {
            const response = await api.get(`/product-variants/product/${productId}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteVariant = createAsyncThunk<any, any>(
    "admin/deleteVariant",
    async(id,{rejectWithValue})=>{
        try {
            const response = await api.delete(`/product-variants/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
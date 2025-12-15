import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, profile, registerUser } from "./thunks";
import type { authI } from "@/interfaces/auth.interface";
import { Satellite } from "lucide-react";

interface initialStateI {
  isLoading: boolean;
  error: string | null;
  me: authI | null;
}

const initialState: initialStateI = {
  isLoading: false,
  error: null,
  me: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action)=>{
      state.me = action.payload;
    },
    clearAuth:()=>{
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.me = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.me = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(profile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        console.log(action.payload, " payload")
        state.isLoading = false;
        state.me = action.payload;
      })
      .addCase(profile.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.payload as string;
      }).addCase(logoutUser.fulfilled,()=>{
        return {...initialState }
      })
  },
});

export default authSlice.reducer;
export const {setAuth} = authSlice.actions

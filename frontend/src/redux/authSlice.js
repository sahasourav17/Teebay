import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../config/variables";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/auth/login`, credentials);
      return res;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/auth/register`, credentials);
      return res;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      sessionStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      sessionStorage.setItem("isAuthenticated", true);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

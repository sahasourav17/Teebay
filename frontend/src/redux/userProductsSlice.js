import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl } from "../config/variables";

export const fetchUserProducts = createAsyncThunk(
  "userProducts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/user/${userId}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const userProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userProductsSlice.reducer;

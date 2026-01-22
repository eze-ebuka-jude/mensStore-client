import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

//Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/v1/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async thunk to create admin product
export const createProduct = createAsyncThunk(
  "adminProducts/createAdminProducts",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${baseUrl}/v1/admin/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async thunk to update admin product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateAdminProducts",
  async ({ id, productData }) => {
    const res = await axios.put(
      `${baseUrl}/v1/admin/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    return res.data;
  }
);

//Async thunk to delete admin product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteAdminProducts",
  async (id) => {
    const res = await axios.delete(`${baseUrl}/v1/admin/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return res.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    adminProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Products";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProd = action.payload;
        const prodIndex = state.adminProducts.findIndex(
          (prod) => prod._id === updatedProd._id
        );
        if (prodIndex !== -1) state.adminProducts[prodIndex] = updatedProd;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = state.adminProducts.filter(
          (prod) => prod._id !== action.payload
        );
      });
  },
});

export default adminProductSlice.reducer;

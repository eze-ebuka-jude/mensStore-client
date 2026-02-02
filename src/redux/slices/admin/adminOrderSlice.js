import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

//Async thunk to get all admin orders
export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/fetchAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/v1/admin/orders`, {
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

//Async thunk to update admin orders status
export const updateAdminOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }) => {
    const res = await axios.put(
      `${baseUrl}/v1/admin/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    return res.data;
  }
);

//Async thunk to update admin orders status
export const deleteAdminOrder = createAsyncThunk(
  "adminOrders/deleteAdminOrder",
  async (id) => {
    await axios.delete(`${baseUrl}/v1/admin/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return id;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    adminOrders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload;
        state.totalOrders = action.payload.length;

        const totalSales = state.adminOrders.reduce((acc, order) => {
          return acc + (Number(order.totalPrice) || 0);
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const orderIndex = state.adminOrders.findIndex(
          (order) => order._id === updatedOrder._id
        );

        if (orderIndex !== -1) state.adminOrders[orderIndex] = updatedOrder;
      })
      .addCase(deleteAdminOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = state.adminOrders.filter(
          (order) => order._id !== action.payload
        );
      });
  },
});

export default adminOrderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

//Async thunk to fetch all user (admin only)
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/v1/admin/users`, {
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

//Async thunk to create user (admin only)
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/v1/admin/users`, {
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

//Async thunk to update user info (admin only)
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${baseUrl}/v1/admin/users/${id}`,
        { name, email, role },
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

//Async thunk to delete user (admin only)
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/v1/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminUserSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (userIndex !== -1) state.users[userIndex] = updatedUser;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default adminUserSlice.reducer;

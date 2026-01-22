import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

//Retrive user info and token from localStorage if available
let userFromStorage = null;

try {
  const storedUser = localStorage.getItem("userInfo");
  userFromStorage = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  console.warn("Invalid userInfo found. Clearing it.", err);
  localStorage.removeItem("userInfo");
  userFromStorage = null;
}

//Check for an existing guest ID in the localStorage or generate a new one
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

//Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/v1/users/login`, userData);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
      localStorage.setItem("userToken", res.data.token);

      return res.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/v1/users/register`, userData);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
      localStorage.setItem("userToken", res.data.token);

      return res.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`; //Reset guest ID on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },

    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;
      const newOrder = await axios.post(`http://localhost:5000/orders`, order, {
        headers: {
          authorization: `Bearer ${userSignin}`,
        },
      });
      return newOrder.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (id, { rejectWithValue }) => {
    try {
      const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;
      const order = await axios.get(`http://localhost:5000/orders/${id}`, {
        headers: {
          authorization: `Bearer ${userSignin}`,
        },
      });
      return order.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const payOrder = createAsyncThunk(
  "order/payOrder",
  async (order, paymentResult, { rejectWithValue }) => {
    try {
      const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;
      const { data } = await axios.put(
        `http://localhost:5000/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            authorization: `Bearer ${userSignin}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (id, { rejectWithValue }) => {
    try {
      const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;
      const orders = await axios.post(
        `http://localhost:5000/orders/list`,
        { id: id },
        {
          headers: {
            authorization: `Bearer ${userSignin}`,
          },
        }
      );
      return orders.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    fetchedOrder: {},
    paidOrder: {},
    userOrders: [],
    status: null,
    error: null,
  },

  reducers: {},

  extraReducers: {
    [createOrder.pending]: (state) => {
      state.status = "loading";
    },
    [createOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      localStorage.setItem("order", JSON.stringify(action.payload));
      state.status = "success";
    },
    [createOrder.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    [getOrder.pending]: (state) => {
      state.status = "loading";
    },
    [getOrder.fulfilled]: (state, action) => {
      state.fetchedOrder = action.payload;
      state.status = "success";
    },
    [getOrder.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    [payOrder.pending]: (state) => {
      state.status = "loading";
    },
    [payOrder.fulfilled]: (state, action) => {
      state.paidOrder = action.payload;
      state.status = "success";
    },
    [payOrder.rejected]: (state, action) => {
      console.log(action, "ERROR");
      state.error = action.payload;
      state.status = "failed";
    },
    [getOrders.pending]: (state) => {
      state.status = "loading";
    },
    [getOrders.fulfilled]: (state, action) => {
      state.userOrders = action.payload;
      state.status = "success";
    },
    [getOrders.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});
export const {} = orderSlice.actions;

export default orderSlice.reducer;

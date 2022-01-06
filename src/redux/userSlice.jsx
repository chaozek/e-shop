import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getUser = createAsyncThunk(
  "user/getUser",
  async (user, { rejectWithValue }) => {
    try {
      const fetchedUser = await axios.post(
        `http://localhost:5000/users/signin`,
        user
      );
      return fetchedUser.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (user, { rejectWithValue }) => {
    try {
      const fetchedUser = await axios.post(
        `http://localhost:5000/users/signup`,
        user
      );
      console.log("FETCH", fetchedUser);
      return fetchedUser.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user:
      localStorage.getItem("userInfo") !== null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {},
    status: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.status = "success";
    },
    [getUser.rejected]: (state, action) => {
      console.log(action.payload, "ERORR");
      state.error = action.payload;
      state.status = "failed";
    },
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.status = "success";
    },
    [signupUser.rejected]: (state, action) => {
      console.log(action.payload, "ERORR");
      state.error = action.payload;
      state.status = "failed";
    },
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;

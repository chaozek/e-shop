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
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id, "ID");
      const user = await axios.get(`http://localhost:5000/users/${id}`);
      return user.data;
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
      return fetchedUser.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const editUser = createAsyncThunk(
  "user/editUser",
  async (newData, { rejectWithValue }) => {
    console.log(newData, "NEW");
    const userSignin = JSON.parse(localStorage.getItem("userInfo")).token;

    try {
      const fetchedUser = await axios.put(
        `http://localhost:5000/users/edit`,
        newData,
        {
          headers: {
            authorization: `Bearer ${userSignin}`,
          },
        }
      );
      return fetchedUser.data.user;
    } catch (error) {
      console.log(error);
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
    userInfo: {},
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
    [fetchUserInfo.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.status = "success";
    },
    [fetchUserInfo.rejected]: (state, action) => {
      console.log(action.payload, "ERORR");
      state.error = action.payload;
      state.status = "failed";
    },
    [editUser.pending]: (state) => {
      state.status = "loading";
    },
    [editUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.status = "success";
    },
    [editUser.rejected]: (state, action) => {
      console.log(action.payload, "ERORR");
      state.error = action.payload;
      state.status = "failed";
    },
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;

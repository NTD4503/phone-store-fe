import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleLoginApi, getUserProfile } from "../../services/UserService";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await handleLoginApi(username, password);
      const token = res.accessToken;
      const user = res.user || res;

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi đăng nhập");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const response = await getUserProfile(token);
      return response;
    } catch (error) {
      return rejectWithValue("Không thể tải thông tin người dùng");
    }
  }
);

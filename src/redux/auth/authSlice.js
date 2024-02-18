import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const $authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});
const clearToken = () => {
  $authInstance.defaults.headers.common.Authorization = ``;
};
const setToken = token => {
  $authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiRegisterUser = createAsyncThunk(
  'auth/apiRegisterUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  'auth/apiLoginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogoutUser = createAsyncThunk(
  'auth/apiLogoutUser',
  async (_, thunkApi) => {
    try {
      await $authInstance.post('/users/logout');
      clearToken();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  'auth/apiRefreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    if (!token) return thunkApi.rejectWithValue('You don`t have a token');
    try {
      setToken(token);
      const { data } = await $authInstance.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  isLoggedIn: false,
  userData: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.isLoading = false;
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.isLoading = false;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(apiLogoutUser.fulfilled, (state, action) => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          apiRegisterUser.pending,
          apiLoginUser.pending,
          apiRefreshUser.pending,
          apiLogoutUser.pending
        ),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiRegisterUser.rejected,
          apiLoginUser.rejected,
          apiRefreshUser.fulfilled,
          apiLogoutUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const authReducer = authSlice.reducer;

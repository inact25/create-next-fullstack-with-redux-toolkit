import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from '../../services/api/authApi';
import { AuthState, User } from '../../types/authTypes';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await authApi.login(credentials);
    return response.data;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }) => {
    const response = await authApi.register(credentials);
    return response.data;
  },
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await authApi.fetchUser();
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'An error occurred';
        },
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

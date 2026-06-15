import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenResponse } from "@/services/auth/auth.type";
import { tokenStorage } from "@/lib/auth";
import { RootState } from "..";

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  reducers: {
    setTokens: (state, action: PayloadAction<ITokenResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      tokenStorage.setTokens(action.payload);
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      tokenStorage.clearTokens();
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  initialState,
});

export const selectIsLoading = (state: RootState) => {
  return state.auth.isLoading;
};

export const selectIsAuthenticated = (state: RootState) => {
  return state.auth.isAuthenticated;
};

export const selectAccessToken = (state: RootState) => {
  return state.auth.accessToken;
};

export const selectUser = (state: RootState) => {
  return state.auth.user;
};

export const { setTokens, logout, setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenResponse } from "@/services/auth/auth.type";
import { tokenStorage } from "@/lib/auth";
import { RootState } from "..";
import { ITeam } from "@/features/teams/types";

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  teams: ITeam[] | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  teams: null,
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

    setTeams: (state, action: PayloadAction<ITeam[] | null>) => {
      state.teams = action.payload;
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

export const selectTeams = (state: RootState) => {
  return state.auth.teams;
};

export const { setTokens, logout, setLoading, setUser, setTeams } =
  authSlice.actions;
export default authSlice.reducer;

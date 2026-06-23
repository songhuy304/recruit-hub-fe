import { API_URL } from "@/config/app.config";
import { tokenStorage } from "@/lib/auth";
import { logout, store } from "@/store";
import { ApiError } from "@/types/api.type";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AUTH_ENDPOINTS_WITHOUT_REDIRECT = ["/auth/login", "/auth/signup"];

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      const requestUrl = err.config?.url ?? "";
      const isAuthRequest = AUTH_ENDPOINTS_WITHOUT_REDIRECT.some((path) =>
        requestUrl.includes(path),
      );

      store.dispatch(logout());

      if (!isAuthRequest) {
        window.location.href = "/auth/sign-in";
      }
    }

    return Promise.reject<ApiError>(
      err.response?.data ?? {
        statusCode: 500,
        message: "error.internal-sever",
      },
    );
  },
);

import axios from "axios";
import { STORAGE_KEY } from "@/shared/constants/key";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * Public Backend API
 */
const publicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
});

/**
 * Private Backend API (uses JWT token over cookie)
 */
const privateAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// privateAPI 요청 인터셉터: Authorization 헤더에 accessToken 추가
privateAPI.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// privateAPI 응답 인터셉터: 401 Unauthorized 오류 처리
privateAPI.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // 토큰 만료/권한 문제 시 정리(원하면)
      useAuthStore.getState().actions.logout();
    }

    return Promise.reject(error);
  }
);

/**
 * Next.js API Route
 */
const internalAPI = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export { publicAPI, privateAPI, internalAPI };

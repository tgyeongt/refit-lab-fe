import axios from "axios";
import { STORAGE_KEY } from "@/shared/constants/key";

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
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      // Zustand persist에서 저장된 인증 상태 읽기
      const authStoreData = localStorage.getItem(STORAGE_KEY.authStore);
      if (authStoreData) {
        try {
          const parsed = JSON.parse(authStoreData);
          const accessToken = parsed?.state?.accessToken;
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch (error) {
          // 파싱 실패 시 무시
        }
      }
    }
    return config;
  },
  (error) => {
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

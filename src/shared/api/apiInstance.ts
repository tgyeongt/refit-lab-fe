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
          } else {
            console.warn("[API] accessToken이 없습니다.");
          }
        } catch (error) {
          console.error("[API] authStore 파싱 실패:", error);
        }
      } else {
        console.warn("[API] authStore 데이터가 없습니다.");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// privateAPI 응답 인터셉터: 에러 처리
privateAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 서버에서 응답을 받았지만 에러 상태 코드
      console.error("[API] 응답 에러:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error("[API] 요청 실패 (응답 없음):", {
        url: error.config?.url,
        message: error.message,
      });
    } else {
      // 요청 설정 중 에러
      console.error("[API] 요청 설정 에러:", error.message);
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

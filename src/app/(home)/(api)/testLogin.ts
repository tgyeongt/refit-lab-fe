import { privateAPI } from "@/shared/api/apiInstance";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const testLogin = async () => {
  // 서버가 응답 없이 멈춰있을 때 무한 대기하지 않도록 타임아웃 설정
  const { data } = await privateAPI.post(
    "/auths/test-login",
    undefined,
    { timeout: 5000 }
  );

  // 서버 응답 형태: { data: accessToken }
  const accessToken: string | null = data?.data ?? null;

  if (accessToken) {
    useAuthStore.getState().actions.setAccessToken(accessToken);
  }

  return data;
};

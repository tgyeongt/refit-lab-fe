import { privateAPI } from "@/shared/api/apiInstance";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const testLogin = async () => {
  const { data } = await privateAPI.post("/auths/test-login");

  // 서버 응답 형태: { data: accessToken }
  const accessToken: string | null = data?.data ?? null;

  if (accessToken) {
    useAuthStore.getState().actions.setAccessToken(accessToken);
  }

  return data;
};

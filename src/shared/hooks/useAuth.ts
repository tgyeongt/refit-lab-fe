import { useAuthInfo, useAuthActions } from "@/shared/stores/useAuthStore";

// 인증 정보 및 액션을 반환하는 훅
export const useAuth = () => {
  const authInfo = useAuthInfo();
  const authActions = useAuthActions();

  return {
    ...authInfo,
    ...authActions,
  };
};

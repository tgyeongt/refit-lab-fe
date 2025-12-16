import { useQuery } from "@tanstack/react-query";
import { getUserInfo, ResponseUserInfo } from "@/shared/user/api/user";
import { QUERY_KEY } from "@/shared/constants/key";
import { useAuthInfo } from "@/shared/stores/useAuthStore";

// 관리자 대시보드에서 사용할 현재 사용자 정보 조회 훅
export const useAdminUser = () => {
  const { hydrated, isLoggedIn } = useAuthInfo();

  return useQuery<ResponseUserInfo>({
    queryKey: [QUERY_KEY.users, "admin"],
    queryFn: getUserInfo,
    enabled: hydrated && isLoggedIn,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });
};



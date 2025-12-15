import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "../../(api)/get-my-page";
import { QUERY_KEY } from "@/shared/constants/key";
import { useAuthInfo } from "@/shared/stores/useAuthStore";

// 마이페이지 조회 훅
export const useMyPage = () => {
  const { hydrated, isLoggedIn } = useAuthInfo();

  return useQuery({
    queryKey: [QUERY_KEY.myPage],
    queryFn: () => getMyPage(),
    enabled: hydrated && isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });
};

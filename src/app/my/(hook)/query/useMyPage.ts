import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "../../(api)/get-my-page";
import { QUERY_KEY } from "@/shared/constants/key";
import { useAuth } from "@/shared/stores/useAuthStore";

// 마이페이지 조회 훅
export const useMyPage = () => {
  const { hydrated, isLoggedIn } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEY.myPage],
    queryFn: () => getMyPage(),
    enabled: hydrated && isLoggedIn,
    retry: 0,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getMyPage } from "../../(api)/get-my-page";
import { QUERY_KEY } from "@/shared/constants/key";

// 마이페이지 조회 훅
export const useMyPage = () => {
  return useQuery({
    queryKey: [QUERY_KEY.myPage],
    queryFn: () => getMyPage(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};



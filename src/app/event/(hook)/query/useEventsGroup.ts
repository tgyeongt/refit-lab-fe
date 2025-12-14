import { useQuery } from "@tanstack/react-query";
import { getEventsGroup } from "../../(api)/get-events-group";
import { QUERY_KEY } from "@/shared/constants/key";

// 행사 그룹 조회 훅
export const useEventsGroup = () => {
  return useQuery({
    queryKey: [QUERY_KEY.eventsGroup],
    queryFn: getEventsGroup,
    select: (data) => data.data,
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};

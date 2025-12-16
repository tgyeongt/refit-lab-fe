import { useQuery } from "@tanstack/react-query";
import { getUpcomingEvents } from "../../(api)/get-upcoming-events";
import { QUERY_KEY } from "@/shared/constants/key";

// 예정된 행사 리스트 조회 훅 /events/upcoming
export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEY.events, "upcoming"],
    queryFn: getUpcomingEvents,
    select: (response) => response.data ?? [],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });
};



import { useQuery } from "@tanstack/react-query";
import { getEndedEvents } from "../../(api)/get-ended-events";
import { QUERY_KEY } from "@/shared/constants/key";

// 종료된 행사 리스트 조회 훅 /events/ended
export const useEndedEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEY.events, "ended"],
    queryFn: getEndedEvents,
    select: (response) => response.data ?? [],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });
};



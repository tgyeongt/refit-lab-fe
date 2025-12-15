import { useQuery } from "@tanstack/react-query";
import { getEventDetail } from "../../(api)/get-event-detail";
import { QUERY_KEY } from "@/shared/constants/key";

// 행사 상세 조회 훅
export const useEventDetail = (eventId: number) => {
  const isValidId = eventId > 0 && !isNaN(eventId);

  return useQuery({
    queryKey: [QUERY_KEY.eventDetail, eventId],
    queryFn: () => getEventDetail(eventId),
    enabled: isValidId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};

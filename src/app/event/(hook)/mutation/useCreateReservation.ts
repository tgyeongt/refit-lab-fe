import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservation } from "../../(api)/create-reservation";
import { ReservationRequest } from "../../types/event";
import { QUERY_KEY } from "@/shared/constants/key";

interface CreateReservationParams {
  eventId: number;
  request: ReservationRequest;
  clothImageList?: File[];
}

// 행사 예약 생성 훅
export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventId,
      request,
      clothImageList,
    }: CreateReservationParams) =>
      createReservation(eventId, request, clothImageList),
    onSuccess: (data, variables) => {
      // 행사 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.eventDetail, variables.eventId],
      });
      // 행사 그룹 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.eventsGroup],
      });
    },
    onError: (error) => {
      console.error("예약 생성 실패:", error);
    },
    retry: 1,
    retryDelay: 1000,
  });
};

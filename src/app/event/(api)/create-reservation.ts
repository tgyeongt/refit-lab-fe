import { privateAPI } from "@/shared/api/apiInstance";
import { ResponseReservation, ReservationRequest } from "../types/event";

// 행사 예약 생성 (POST /api/events/{id}/rsv)
export const createReservation = async (
  eventId: number,
  request: ReservationRequest,
  clothImageList?: File[]
): Promise<ResponseReservation> => {
  try {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    );

    if (clothImageList && clothImageList.length > 0) {
      clothImageList.forEach((file) => {
        formData.append("clothImageList", file);
      });
    }

    const { data } = await privateAPI.post<ResponseReservation>(
      `/events/${eventId}/rsv`,
      formData
    );
    return data;
  } catch (error) {
    console.error("예약 생성 실패:", error);
    throw error;
  }
};

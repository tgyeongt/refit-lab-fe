import { publicAPI } from "@/shared/api/apiInstance";
import { ResponseEventDetail, EventDetail } from "../types/event";

// 행사 상세 조회 (id 기반)
export const getEventDetail = async (eventId: number): Promise<EventDetail> => {
  try {
    const { data } = await publicAPI.get<ResponseEventDetail>(
      `/events/${eventId}`
    );
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { privateAPI } from "@/shared/api/apiInstance";
import { BaseResponse } from "@/shared/api/BaseResponse";
import { UpcomingEvent } from "../types/event";

export type ResponseUpcomingEvents = BaseResponse<UpcomingEvent[]>;

// 예정된 행사 리스트 조회: GET /api/events/upcoming
export const getUpcomingEvents = async (): Promise<ResponseUpcomingEvents> => {
  try {
    const { data } =
      await privateAPI.get<ResponseUpcomingEvents>("/events/upcoming");
    return data;
  } catch (error) {
    console.error("예정된 행사 리스트 조회 실패:", error);
    throw error;
  }
};



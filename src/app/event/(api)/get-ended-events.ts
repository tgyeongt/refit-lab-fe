import { privateAPI } from "@/shared/api/apiInstance";
import { BaseResponse } from "@/shared/api/BaseResponse";
import { EndedEvent } from "../types/event";

export type ResponseEndedEvents = BaseResponse<EndedEvent[]>;

// 종료된 행사 리스트 조회 /events/ended
export const getEndedEvents = async (): Promise<ResponseEndedEvents> => {
  try {
    const { data } =
      await privateAPI.get<ResponseEndedEvents>("/events/ended");
    return data;
  } catch (error) {
    console.error("종료된 행사 리스트 조회 실패:", error);
    throw error;
  }
};



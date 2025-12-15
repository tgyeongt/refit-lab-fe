import { privateAPI } from "@/shared/api/apiInstance";
import type { BaseResponse } from "@/shared/api/BaseResponse";
import axios from "axios";

export interface EventImage {
  order: number;
  imageUrl: string;
}

export type ResponseEventImages = BaseResponse<EventImage[]>;

// 행사 더보기 이미지 조회
export const getEventImages = async (
  eventId: number
): Promise<EventImage[]> => {
  try {
    const { data } = await privateAPI.get<ResponseEventImages>(
      `/events/${eventId}/img`
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("[getEventImages] 행사 이미지 조회 실패:", {
        message: error.message,
        response: error.response.data,
        status: error.response.status,
        url: error.config?.url,
      });
    } else {
      console.error("[getEventImages] 행사 이미지 조회 실패:", error);
    }
    throw error;
  }
};

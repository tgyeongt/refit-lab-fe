import { privateAPI } from "@/shared/api/apiInstance";
import type { ResponseJoinedEvents } from "../(types)/joinedEvent";
import axios from "axios";

interface GetJoinedEventsParams {
  page: number;
  size: number;
}

// 참가한 행사 조회: GET /api/my/events/joined
export const getJoinedEvents = async ({
  page,
  size,
}: GetJoinedEventsParams): Promise<ResponseJoinedEvents> => {
  try {
    const { data } = await privateAPI.get<ResponseJoinedEvents>(
      "/my/events/joined",
      {
        params: { page, size },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("[getJoinedEvents] 참가한 행사 조회 실패:", {
        message: error.message,
        response: error.response.data,
        status: error.response.status,
        url: error.config?.url,
      });
    } else {
      console.error("[getJoinedEvents] 참가한 행사 조회 실패:", error);
    }
    throw error;
  }
};



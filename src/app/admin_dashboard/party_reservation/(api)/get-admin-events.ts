import { privateAPI } from "@/shared/api/apiInstance";
import { ResponseAdminEvents } from "../(types)/party";

export interface GetAdminEventsParams {
  page: number;
  size: number;
  status?: "UPCOMING" | "ONGOING" | "ENDED";
  q?: string;
}

// [관리자] 행사 리스트 조회 - GET /api/events/admin
export const getAdminEvents = async (
  params: GetAdminEventsParams
): Promise<ResponseAdminEvents> => {
  const response = await privateAPI.get<ResponseAdminEvents>("/events/admin", {
    params,
  });

  return response.data;
};



import { privateAPI } from "@/shared/api/apiInstance";
import { ResponseEventGroup } from "../types/event";

// 행사 그룹 조회 (다가오는/예정/종료 행사 1개씩)
export const getEventsGroup = async (): Promise<ResponseEventGroup> => {
  try {
    const { data } = await privateAPI.get<ResponseEventGroup>("/events/group");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

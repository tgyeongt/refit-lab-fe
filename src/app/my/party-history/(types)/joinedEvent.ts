import type { BaseResponse } from "@/shared/api/BaseResponse";
import type { Event } from "@/app/event/types/event";

export interface JoinedEventsPageData {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: Event[];
}

export type ResponseJoinedEvents = BaseResponse<JoinedEventsPageData>;



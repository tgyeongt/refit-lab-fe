import { BaseResponse } from "@/shared/api/BaseResponse";

// API 응답 타입
export interface Event {
  eventId: number;
  thumbnailUrl?: string;
  dday: number;
  name: string;
  description: string;
  date?: string;
  location: string;
}

// 다가오는 행사 응답 타입
export interface UpcomingEvent extends Event {
  dday: number;
}

// 예정된 행사 응답 타입
export interface ScheduledEvent extends Event {}

// 종료된 행사 응답 타입
export interface EndedEvent extends Event {}

// 행사 그룹 응답 타입
export type ResponseEventGroup = BaseResponse<{
  upcoming: UpcomingEvent;
  scheduled: ScheduledEvent;
  ended: EndedEvent;
}>;

// 컴포넌트에서 사용할 타입 (기존 호환)
export interface MockEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  dDay?: number;
  thumbnailUrl: string;
  isUpcoming?: boolean;
}

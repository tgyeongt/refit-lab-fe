import { BaseResponse } from "@/shared/api/BaseResponse";

// 기본 Event 타입 (공통 필드)
export interface Event {
  eventId: number;
  thumbnailUrl?: string;
  name: string;
  description: string;
  location: string;
  date?: string;
  startDate?: string;
}

// 다가오는 행사 응답 타입
export interface UpcomingEvent extends Event {
  dday: number;
}

// 예정된 행사 응답 타입
export interface ScheduledEvent extends Event {
  startDate: string;
}

// 종료된 행사 응답 타입
export interface EndedEvent extends Event {
  startDate: string;
}

// 행사 그룹 응답 타입
export type ResponseEventGroup = BaseResponse<{
  upcoming: UpcomingEvent | null;
  scheduled: ScheduledEvent | null;
  ended: EndedEvent | null;
}>;

// 행사 상세 응답 타입
export interface EventDetail {
  isReserved: boolean;
  eventId: number;
  totalReservedCount: number;
  thumbnailUrl: string;
  name: string;
  description: string;
  detailLink: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  recentImageUrlList: string[];
  clothCountExceptRecent4: number;
}

export type ResponseEventDetail = BaseResponse<EventDetail>;

// 예약 데이터 타입
export interface ReservationData {
  eventId: number;
  reserved: boolean;
  totalReservedCount: number;
}

export type ResponseReservation = BaseResponse<ReservationData>;

// 예약 요청 타입
export interface ReservationRequest {
  name: string;
  phone: string;
  email: string;
  clothCount: number;
  marketingConsent: boolean;
}

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

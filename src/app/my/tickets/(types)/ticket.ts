import { BaseResponse } from "@/shared/api/BaseResponse";

// API 티켓 타입
export type TicketApiType = "EVENT" | "CLOTH";
export type TicketApiStatus = "UNUSED" | "USED" | "EXPIRED";

export interface TicketApi {
  ticketId: number;
  type: TicketApiType;
  status: TicketApiStatus;
  ticketName: string;
  location: string;
  description: string;
  url: string;
  issuedAt: string;
  usedAt: string | null;
  expiresAt: string;
}

export interface MyTicketsPageData {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: TicketApi[];
}

export type ResponseMyTickets = BaseResponse<MyTicketsPageData>;

// UI에서 사용하는 티켓 타입
export type TicketStatus = "upcoming" | "used" | "expired";

export interface Ticket {
  id: string;
  eventName: string;
  eventDate: string; // ISO string (will be formatted by formatDate)
  eventTime?: string;
  location: string;
  seat?: string;
  qrCode: string;
  status: TicketStatus;
  thumbnailUrl?: string;
}

// API 응답을 UI용 Ticket으로 매핑
export const mapTicketFromApi = (api: TicketApi): Ticket => {
  const statusMap: Record<TicketApiStatus, TicketStatus> = {
    UNUSED: "upcoming",
    USED: "used",
    EXPIRED: "expired",
  };

  return {
    id: String(api.ticketId),
    eventName: api.ticketName,
    eventDate: api.expiresAt || api.issuedAt,
    eventTime: "", // 현재 UI에서 사용하지 않음
    location: api.location,
    seat: undefined,
    qrCode: api.url,
    status: statusMap[api.status],
    thumbnailUrl: undefined,
  };
};


// 티켓 타입
export interface Ticket {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  seat?: string;
  qrCode: string;
  status: "upcoming" | "used" | "expired";
  thumbnailUrl?: string;
}


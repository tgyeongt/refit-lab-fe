// 행사 상태 타입
export type PartyStatus = "scheduled" | "ongoing" | "completed";

// 행사 데이터 타입
export interface Party {
  id: string;
  name: string;
  date: string;
  location: string;
  currentReservations: number;
  maxReservations: number;
  status: PartyStatus;
}

// 상태별 한글 라벨
export const PARTY_STATUS_LABEL: Record<PartyStatus, string> = {
  scheduled: "예정",
  ongoing: "진행중",
  completed: "완료",
};

// 상태별 스타일 (배경색, 텍스트색)
export const PARTY_STATUS_STYLES: Record<
  PartyStatus,
  { bg: string; text: string }
> = {
  scheduled: { bg: "#DBEAFE", text: "#4181DB" },
  ongoing: { bg: "#E2FEFF", text: "#08B0B7" },
  completed: { bg: "#EEEEEE", text: "#424242" },
};


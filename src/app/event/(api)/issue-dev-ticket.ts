import { privateAPI } from "@/shared/api/apiInstance";
import type { BaseResponse } from "@/shared/api/BaseResponse";

export type DevTicketType = "EVENT" | "CLOTH";

export interface IssueDevTicketRequest {
  type: DevTicketType;
  targetId: number;
  userId: number;
  expiresAt: string;
}

export interface IssueDevTicketResponseData {
  ticketId: number;
  type: DevTicketType;
  targetId: number;
  token: string;
  qrPayload: string;
  issuedAt: string;
  usedAt: string | null;
  expiresAt: string;
}

export type IssueDevTicketResponse = BaseResponse<IssueDevTicketResponseData>;

// [개발자] 티켓 발급 - POST /api/tickets/dev/issue
export const issueDevTicket = async (
  body: IssueDevTicketRequest
): Promise<IssueDevTicketResponseData> => {
  const { data } = await privateAPI.post<IssueDevTicketResponse>(
    "/tickets/dev/issue",
    body
  );
  return data.data;
};



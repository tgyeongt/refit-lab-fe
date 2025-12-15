import { privateAPI } from "@/shared/api/apiInstance";
import { ResponseMyTickets } from "../(types)/ticket";

interface GetMyTicketsParams {
  page: number;
  size: number;
}

// /api/my/tickets - 내 티켓 리스트 조회
export const getMyTickets = async ({
  page,
  size,
}: GetMyTicketsParams): Promise<ResponseMyTickets> => {
  const response = await privateAPI.get<ResponseMyTickets>("/my/tickets", {
    params: { page, size },
  });

  return response.data;
};



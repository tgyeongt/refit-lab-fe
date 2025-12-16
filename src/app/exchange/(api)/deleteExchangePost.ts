import { privateAPI } from "@/shared/api/apiInstance"; // JWT 포함 axios instance

export const deleteExchangePost = async (exchangePostId: number) => {
  const response = await privateAPI.delete(`/exchanges/${exchangePostId}`);
  return response.data;
};

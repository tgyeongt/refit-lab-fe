import { privateAPI } from "@/shared/api/apiInstance";

export interface ExchangeDetailData {
  exchangePostId: number;
  nickname: string;
  imageUrlList: string[];
  category: string;
  title: string;
  size: string;
  status: "GOOD" | "FAIR" | "BAD";
  preferCategoryList: string[];
  exchangeSpot: string;
  spotLatitude: number;
  spotLongitude: number;
  isAuthor: boolean;
  createdAt: string;
}

export async function getExchangeDetail(
  exchangePostId: number
): Promise<ExchangeDetailData> {
  const { data } = await privateAPI.get(`/exchanges/${exchangePostId}`);
  return data.data;
}

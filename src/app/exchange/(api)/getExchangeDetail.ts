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

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export async function getExchangeDetail(
  exchangePostId: number
): Promise<ExchangeDetailData> {
  if (!exchangePostId || Number.isNaN(exchangePostId)) {
    throw new Error("유효하지 않은 exchangePostId입니다.");
  }

  const response = await privateAPI.get<ApiResponse<ExchangeDetailData>>(
    `/exchanges/${exchangePostId}`
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

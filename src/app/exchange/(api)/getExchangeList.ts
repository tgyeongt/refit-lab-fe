import { privateAPI } from "@/shared/api/apiInstance";

/** 카테고리 enum */
export type ExchangeCategory =
  | "OUTER"
  | "SHIRTS"
  | "PANTS"
  | "SHOES"
  | "ACCESSORY";

/** 단일 게시글 카드 */
export interface ExchangePost {
  exchangePostId: number;
  thumbnailImageUrl: string;
  category: ExchangeCategory;
  title: string;
  exchangeSpot: string;
}

/** 페이지 응답 */
export interface ExchangeListResponse {
  content: ExchangePost[];
  totalElements: number;
  totalPages: number;
  pageNum: number;
  pageSize: number;
  last: boolean;
}

/** 조회 파라미터 */
export interface GetExchangeListParams {
  pageNum: number;
  pageSize: number;
  exchangeCategory?: ExchangeCategory;
  latitude?: number;
  longitude?: number;
}

/**
 * 교환 게시글 목록 조회 (공용)
 * GET /api/exchanges
 */
export const getExchangeList = async (
  params: GetExchangeListParams
): Promise<ExchangeListResponse> => {
  try {
    const { data } = await privateAPI.get("/exchanges", {
      params,
    });

    return data.data;
  } catch (error) {
    throw error;
  }
};

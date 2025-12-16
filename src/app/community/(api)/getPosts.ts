"use client";
import { privateAPI } from "@/shared/api/apiInstance";

/** 카테고리 타입 */
export type CommunityCategory = "FREE" | "REPAIR" | "INFO";

/** 게시글 인터페이스 */
export interface CommunityPost {
  postId: number;
  category: CommunityCategory;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  nickname: string;
  isAuthor: boolean;
  isLiked: boolean;
  imageUrlList?: string[];
  commentIdList?: number[];
}

/** API 응답 타입 */
export interface GetPostsResponse {
  content: CommunityPost[];
  lastCursor: number;
  hasNext: boolean;
  size: number;
}

/** 조회 파라미터 */
export interface GetPostsParams {
  category?: CommunityCategory[]; // 여러 카테고리 가능, 전체 조회 시 생략
  lastPostId?: number; // 첫 조회 시 생략 가능
  size?: number;
}

/** 커뮤니티 게시글 조회 */
export const getPosts = async (
  params: GetPostsParams
): Promise<GetPostsResponse> => {
  try {
    const queryParams: Record<string, string | number> = {
      size: params.size ?? 20,
    };

    if (params.category && params.category.length > 0) {
      queryParams["category"] = params.category.join(",");
    }

    if (params.lastPostId) queryParams["lastPostId"] = params.lastPostId;

    const { data } = await privateAPI.get("/posts", {
      params: queryParams,
    });

    if (!data.success) throw new Error(data.message || "API 요청 실패");

    return data.data;
  } catch (err: any) {
    console.error("getPosts 에러:", err.response ?? err);
    throw err;
  }
};

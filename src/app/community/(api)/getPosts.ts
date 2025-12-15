"use client";
import axios from "axios";

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
  params: GetPostsParams,
  token: string
): Promise<GetPostsResponse> => {
  try {
    const queryParams: Record<string, string | number> = {
      size: params.size ?? 20,
    };

    // 전체 조회일 때 category 생략
    if (params.category && params.category.length > 0) {
      queryParams["category"] = params.category.join(",");
    }

    if (params.lastPostId) queryParams["lastPostId"] = params.lastPostId;

    console.log(
      "API 호출 URL:",
      "https://api.refitlab.site/api/posts",
      queryParams
    );

    const { data } = await axios.get("https://api.refitlab.site/api/posts", {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      validateStatus: () => true,
    });

    console.log("API 응답:", data);

    if (!data.success) throw new Error(data.message || "API 요청 실패");

    return data.data;
  } catch (err: any) {
    console.error("getPosts 에러:", err.response ?? err);
    throw err;
  }
};

"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { privateAPI } from "@/shared/api/apiInstance";

export type CommunityCategory = "FREE" | "REPAIR" | "INFO";

export interface CommunityPost {
  profileImageUrl: string | StaticImport;
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
  imageUrlList: string[] | null;
  commentIdList: number[];
}

export interface GetPostByIdResponse {
  content: CommunityPost;
}

/** 단일 게시글 조회 */
export const getPostById = async (id: number): Promise<CommunityPost> => {
  try {
    const { data } = await privateAPI.get(`/posts/${id}`);

    if (!data.success) throw new Error(data.message || "API 요청 실패");

    return data.data;
  } catch (error: any) {
    console.error("getPostById 에러:", error.response ?? error);
    throw error;
  }
};

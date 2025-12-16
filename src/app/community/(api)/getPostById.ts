"use client";

import axios from "axios";

export type CommunityCategory = "FREE" | "REPAIR" | "INFO";

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
  imageUrlList: string[] | null;
  commentIdList: number[];
}

export interface GetPostByIdResponse {
  content: CommunityPost;
}

export const getPostById = async (
  id: number,
  token: string
): Promise<CommunityPost> => {
  try {
    const { data } = await axios.get(
      `https://api.refitlab.site/api/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        validateStatus: () => true,
      }
    );

    if (!data.success) throw new Error(data.message || "API 요청 실패");

    return data.data;
  } catch (error: any) {
    console.error("getPostById 에러:", error.response ?? error);
    throw error;
  }
};

import { privateAPI } from "@/shared/api/apiInstance";
import type { ResponseMyPosts } from "../(types)/myPosts";
import axios from "axios";

interface GetMyPostsParams {
  page: number;
  size: number;
}

// 내가 작성한 글 조회: GET /api/my/posts
export const getMyPosts = async ({
  page,
  size,
}: GetMyPostsParams): Promise<ResponseMyPosts> => {
  try {
    const { data } = await privateAPI.get<ResponseMyPosts>("/my/posts", {
      params: { page, size },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("[getMyPosts] 내 글 목록 조회 실패:", {
        message: error.message,
        response: error.response.data,
        status: error.response.status,
        url: error.config?.url,
      });
    } else {
      console.error("[getMyPosts] 내 글 목록 조회 실패:", error);
    }
    throw error;
  }
};



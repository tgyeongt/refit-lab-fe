import { privateAPI } from "@/shared/api/apiInstance"; // JWT 인증 axios 인스턴스

export const deletePost = async (postId: number) => {
  const response = await privateAPI.delete(`/posts/${postId}`);
  return response.data;
};

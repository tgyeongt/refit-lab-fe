import { privateAPI } from "@/shared/api/apiInstance";

export const toggleCommentLike = async (
  commentId: number
): Promise<{ isLiked: boolean; likes: number }> => {
  try {
    const { data } = await privateAPI.post(`/comments/${commentId}/like`, {});

    if (!data.success) throw new Error(data.message || "댓글 요청 실패");
    return data.data;
  } catch (error: any) {
    console.error("toggleCommentLike 에러:", error.response ?? error);
    throw error;
  }
};

import axios from "axios";

export const toggleCommentLike = async (
  commentId: number,
  token: string
): Promise<{ isLiked: boolean; likes: number }> => {
  const { data } = await axios.post(
    `https://api.refitlab.site/api/comments/${commentId}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!data.success) throw new Error(data.message || "댓글 좋아요 요청 실패");

  // 서버에서 isLiked, likes 반환
  return {
    isLiked: data.data.isLiked,
    likes: data.data.likes,
  };
};

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

  if (!data.success) throw new Error(data.message || "댓글 요청 실패");
  return data.data; // true / false
};

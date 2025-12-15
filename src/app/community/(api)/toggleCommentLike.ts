"use client";

import axios from "axios";

export const toggleCommentLike = async (
  id: number,
  token: string
): Promise<boolean> => {
  const { data } = await axios.post(
    `https://api.refitlab.site/api/comments/${id}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!data.success) throw new Error(data.message || "댓글 좋아요 요청 실패");
  return data.data;
};

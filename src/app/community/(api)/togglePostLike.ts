"use client";

import axios from "axios";

export const togglePostLike = async (
  postId: number,
  token: string
): Promise<boolean> => {
  const { data } = await axios.post(
    `https://api.refitlab.site/api/posts/${postId}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!data.success) throw new Error(data.message || "좋아요 요청 실패");
  return data.data; // true / false
};

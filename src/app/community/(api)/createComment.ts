"use client";

import axios from "axios";

// 댓글 작성
export const createComment = async (
  postId: number,
  content: string,
  token: string,
  parentCommentId?: number
) => {
  const { data } = await axios.post(
    `https://api.refitlab.site/api/comments/new`,
    {
      content,
      parentCommentId: parentCommentId?.toString(),
    },
    {
      params: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!data.success) throw new Error(data.message || "댓글 작성 실패");
  return data.data;
};

"use client";

import axios from "axios";
import UserProfile from "@/assets/image/user-profile.png";

export interface CommentUI {
  commentId: number;
  isLiked: boolean;
  userName?: string;
  userProfile: string;
  content: string;
  time: string;
  likeCount: number;
  replies?: CommentUI[];
}

/**
 * 특정 게시글의 댓글/대댓글 불러오기
 */
export const getCommentsByPostId = async (
  postId: number,
  token: string
): Promise<CommentUI[]> => {
  const { data } = await axios.get(`https://api.refitlab.site/api/comments`, {
    params: { postId },
    headers: { Authorization: `Bearer ${token}` },
  });

  // 댓글과 대댓글 구조 변환
  const mapComment = (c: any): CommentUI => ({
    commentId: c.commentId,
    userName: c.nickname,
    userProfile: c.profileImageUrl || UserProfile,
    content: c.content,
    time: c.createdAt,
    likeCount: c.likeCount ?? 0,
    isLiked: c.isLiked ?? false,
    replies: c.replies?.map(mapComment) ?? [],
  });

  return data.data.map(mapComment);
};

/**
 * 새로운 댓글 작성
 * parentCommentId가 있으면 대댓글, 없으면 일반 댓글
 */
export const postNewComment = async (
  postId: number,
  content: string,
  parentCommentId?: number,
  token?: string
) => {
  if (!token) throw new Error("로그인이 필요합니다.");

  const payload: any = { content };
  if (parentCommentId) payload.parentCommentId = parentCommentId;

  const { data } = await axios.post(
    `https://api.refitlab.site/api/comments/new?postId=${postId}`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
};

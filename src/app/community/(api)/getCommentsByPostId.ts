import axios from "axios";
import UserProfile from "@/assets/image/user-profile.png";

export interface CommentUI {
  likeCount: number;
  id: number;
  userName?: string;
  userProfile: string;
  content: string;
  time: string;
  replies?: CommentUI[];
}

export const getCommentsByPostId = async (
  postId: number,
  token: string
): Promise<CommentUI[]> => {
  const { data } = await axios.get(`https://api.refitlab.site/api/comments`, {
    params: { postId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data.map((c: any) => ({
    id: c.id,
    userName: c.nickname,
    userProfile: c.userProfile || { UserProfile },
    content: c.content,
    time: c.createdAt,
    replies: c.replies?.map((r: any) => ({
      id: r.id,
      userName: r.nickname,
      userProfile: r.userProfile || { UserProfile },
      content: r.content,
      time: r.createdAt,
    })),
  }));
};

// 새로운 댓글 작성
export const postNewComment = async (
  postId: number,
  content: string,
  parentCommentId?: number,
  token?: string
) => {
  if (!token) throw new Error("로그인이 필요합니다.");
  const { data } = await axios.post(
    `https://api.refitlab.site/api/comments/new?postId=${postId}`,
    { content, parentCommentId: parentCommentId?.toString() },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/stores/useAuthStore";
import CommentItem from "./CommentItem";
import CommentInputBar from "./CommentInputBar";
import {
  getCommentsByPostId,
  CommentUI,
  postNewComment,
} from "../../(api)/getCommentsByPostId";

interface AnswerSectionProps {
  postId: number;
}

export default function AnswerSection({ postId }: AnswerSectionProps) {
  const { accessToken, isLoggedIn, hydrated } = useAuth();
  const queryClient = useQueryClient();
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<CommentUI[]>({
    queryKey: ["comments", postId, accessToken],
    queryFn: async () => {
      if (!isLoggedIn || !accessToken) throw new Error("로그인이 필요합니다.");
      return getCommentsByPostId(postId, accessToken);
    },
    enabled: hydrated && isLoggedIn,
  });

  const handleOpenReplyInput = (id: number) => setReplyTargetId(id);

  const handleSubmitReply = async (text: string) => {
    if (!accessToken) return;
    try {
      await postNewComment(
        postId,
        text,
        replyTargetId ?? undefined,
        accessToken
      );
      setReplyTargetId(null);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "comments" && query.queryKey[1] === postId,
      });
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    }
  };

  if (!hydrated) return <p>댓글 준비중...</p>;
  if (isLoading) return <p>댓글 로딩중...</p>;
  if (isError) return <p>댓글을 불러오지 못했습니다.</p>;
  if (!comments || comments.length === 0) return <p>댓글이 없습니다.</p>;

  return (
    <section className="mt-3">
      <h3 className="text-[16px] mb-4">댓글 {comments.length}</h3>

      <div className="space-y-5 pb-[80px]">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReplyClick={handleOpenReplyInput}
          />
        ))}
      </div>

      {replyTargetId !== null && (
        <CommentInputBar
          onSubmit={handleSubmitReply}
          onClose={() => setReplyTargetId(null)}
        />
      )}
    </section>
  );
}

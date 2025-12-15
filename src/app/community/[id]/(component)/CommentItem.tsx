"use client";

import { useState } from "react";
import { toggleCommentLike } from "../../(api)/toggleCommentLike";
import CommentBlock from "./CommentBlock";
import { CommentUI } from "../../(api)/getCommentsByPostId";
import { useAuth } from "@/shared/stores/useAuthStore";

interface CommentItemProps {
  comment: CommentUI;
  onReplyClick: (id: number) => void;
}

export default function CommentItem({
  comment,
  onReplyClick,
}: CommentItemProps) {
  const { accessToken } = useAuth();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({
    [comment.id]: comment.likeCount ?? 0, // 초기 좋아요 개수
  });

  const handleToggleMenu = (id: number) =>
    setOpenMenuId((prev) => (prev === id ? null : id));

  const handleReport = (id: number) => {
    alert(`${id}번 댓글을 신고했습니다.`);
    setOpenMenuId(null);
  };

  const handleLike = async (id: number) => {
    if (!accessToken) return;
    try {
      await toggleCommentLike(id, accessToken);
      setLikeCounts((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 0) + 1,
      }));
    } catch (err) {
      console.error("좋아요 실패:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <CommentBlock
        id={comment.id}
        userProfile={comment.userProfile}
        userName={comment.userName}
        time={comment.time}
        content={comment.content}
        likeCount={likeCounts[comment.id] ?? 0}
        onLike={handleLike}
        onReplyClick={onReplyClick}
        openMenuId={openMenuId}
        handleToggleMenu={handleToggleMenu}
        handleReport={handleReport}
      />

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 mt-3 space-y-3 bg-[#F5F5F7] p-[8px] rounded-[4px]">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReplyClick={onReplyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

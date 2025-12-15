"use client";

import { useState } from "react";
import CommentBlock from "./CommentBlock";
import { CommentUI } from "../../(api)/getCommentsByPostId";

interface CommentItemProps {
  comment: CommentUI;
  onReplyClick: (commentId: number) => void;
  level?: number;
}

export default function CommentItem({
  comment,
  onReplyClick,
  level = 0,
}: CommentItemProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const handleToggleMenu = (id: number) =>
    setOpenMenuId((prev) => (prev === id ? null : id));

  const handleReport = (id: number) => {
    alert(`${id}번 댓글을 신고했습니다.`);
    setOpenMenuId(null);
  };

  return (
    <div style={{ marginLeft: level * 20 }} className="flex flex-col gap-2">
      <CommentBlock
        commentId={comment.commentId}
        userProfile={comment.userProfile}
        userName={comment.userName}
        time={comment.time}
        content={comment.content}
        likeCount={comment.likeCount ?? 0}
        isLiked={comment.isLiked ?? false}
        onReplyClick={onReplyClick}
        openMenuId={openMenuId}
        handleToggleMenu={handleToggleMenu}
        handleReport={handleReport}
      />

      {/* 대댓글 재귀 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-1 space-y-1">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.commentId}
              comment={reply}
              onReplyClick={onReplyClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

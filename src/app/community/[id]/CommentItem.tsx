"use client";

import { useState } from "react";
import { Comment } from "../dummyData";
import CommentBlock from "./CommentBlock";

interface CommentItemProps {
  comment: Comment;
  onReplyClick: (id: number) => void;
}

export default function CommentItem({
  comment,
  onReplyClick,
}: CommentItemProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  const handleToggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleReport = (id: number) => {
    alert(`${id}번 댓글을 신고했습니다.`);
    setOpenMenuId(null);
  };

  const handleLike = (id: number) => {
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  };

  return (
    <div>
      {/* 원댓글 */}
      <CommentBlock
        id={comment.id}
        userProfile={comment.userProfile}
        userName={comment.userName}
        time={comment.time}
        content={comment.content}
        isReply={false}
        likeCount={likeCounts[comment.id] ?? 0}
        onLike={handleLike}
        onReplyClick={onReplyClick}
        openMenuId={openMenuId}
        handleToggleMenu={handleToggleMenu}
        handleReport={handleReport}
      />

      {/* 대댓글 (있을 때만 렌더) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 mt-3 space-y-3 bg-[#F5F5F7] p-[8px] rounded-[4px]">
          {comment.replies.map((reply) => (
            <CommentBlock
              key={reply.id}
              id={reply.id}
              userProfile={reply.userProfile}
              userName={reply.userName}
              time={reply.time}
              content={reply.content}
              isReply={true}
              likeCount={likeCounts[reply.id] ?? 0}
              onLike={handleLike}
              onReplyClick={onReplyClick}
              openMenuId={openMenuId}
              handleToggleMenu={handleToggleMenu}
              handleReport={handleReport}
            />
          ))}
        </div>
      )}
    </div>
  );
}

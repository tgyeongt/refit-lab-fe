"use client";

import { useState } from "react";
import { Comment } from "../dummyData";
import CommentBlock from "./CommentBlock";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleToggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleReport = (id: number) => {
    alert(`${id}번 댓글을 신고했습니다.`);
    setOpenMenuId(null);
  };

  return (
    <div>
      {/* 원 댓글 */}
      <CommentBlock
        id={comment.id}
        userProfile={comment.userProfile}
        userName={comment.userName}
        time={comment.time}
        content={comment.content}
        openMenuId={openMenuId}
        handleToggleMenu={handleToggleMenu}
        handleReport={handleReport}
      />

      {/* 대댓글 */}
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
              isReply
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

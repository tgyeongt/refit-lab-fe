"use client";

import { useState } from "react";
import { Comment } from "../dummyData";
import CommentItem from "./CommentItem";
import ReplyInputBar from "./ReplyInputBar";

interface AnswerSectionProps {
  comments: Comment[];
}

export default function AnswerSection({ comments }: AnswerSectionProps) {
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);

  const handleOpenReplyInput = (id: number) => {
    setReplyTargetId(id);
  };

  const handleSubmitReply = (text: string) => {
    console.log(`답글 대상: ${replyTargetId}, 내용: ${text}`);
    setReplyTargetId(null); // 입력창 닫기
  };

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

      {/* 하단 고정 답글 입력창 (모바일용) */}
      {replyTargetId !== null && (
        <ReplyInputBar
          onSubmit={(text) => handleSubmitReply(text)}
          onClose={() => setReplyTargetId(null)}
        />
      )}
    </section>
  );
}

"use client";

import { Comment } from "../dummyData";
import CommentItem from "./CommentItem";

interface AnswerSectionProps {
  comments: Comment[];
}

export default function AnswerSection({ comments }: AnswerSectionProps) {
  return (
    <section className="mt-3">
      <h3 className="font-[16px] mb-4">댓글 {comments.length}</h3>
      <div className="space-y-5">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}

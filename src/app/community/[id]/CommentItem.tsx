"use client";

import Image from "next/image";
import { Comment } from "../dummyData";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div>
      {/* 댓글 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Image
            src={comment.userProfile}
            alt={comment.userName}
            width={35}
            height={35}
            className="rounded-full object-cover aspect-square"
          />
          <p className="text-[14px] font-medium">{comment.userName}</p>
          <p className="text-[12px] text-[#757575]">{comment.time}</p>
        </div>
        <p className="text-[16px] ml-[48px] mb-[15px]">{comment.content}</p>
      </div>

      {/* 대댓글 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 mt-3 space-y-3 bg-[#F5F5F7] p-[8px] rounded-[4px]">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Image
                  src={reply.userProfile}
                  alt={reply.userName}
                  width={35}
                  height={35}
                  className="rounded-full object-cover aspect-square"
                />
                <p className="text-[14px] font-medium">{reply.userName}</p>
                <p className="text-[12px] text-[#757575]">{reply.time}</p>
              </div>
              <p className="text-[16px] ml-[48px] mb-[15px]">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

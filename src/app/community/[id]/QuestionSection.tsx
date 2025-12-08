"use client";

import Image from "next/image";
import { useState } from "react";
import { CommunityPost } from "../dummyData";
import LikeIcon from "@/assets/icon/like.svg";
import CommentIcon from "@/assets/icon/comment.svg";
import CommentInputBar from "./CommentInputBar";

interface QuestionSectionProps {
  post: CommunityPost;
}

export default function QuestionSection({ post }: QuestionSectionProps) {
  const [likes, setLikes] = useState(post.likes);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleCommentClick = () => {
    setIsReplyOpen(true);
  };

  const handleSubmitReply = (text: string) => {
    console.log("작성된 댓글:", text);
    setIsReplyOpen(false);
  };

  return (
    <section className="border-b-6 border-[#EEEEEE] pb-4 relative">
      {/* 사용자 정보 */}
      <div className="flex items-center mb-3 mt-[10px]">
        <Image
          src={post.userProfile}
          alt={post.userName}
          width={35}
          height={35}
          className="rounded-full object-cover aspect-square"
        />
        <p className="text-[16px] font-medium ml-[8px] mr-[10px]">
          {post.userName}
        </p>
        <p className="text-[14px] text-[#757575]">{post.time}</p>
      </div>

      {/* 본문 */}
      <div className="mb-3 px-[5px] pb-[20px]">
        <h2 className="text-[20px] font-semibold mb-1">{post.title}</h2>
        <p className="text-[16px] text-sm">{post.description}</p>
      </div>

      {/* 좋아요 & 댓글 수 */}
      <div className="flex justify-center gap-[100px] text-sm text-[#9E9E9E]">
        <button
          onClick={handleLike}
          className="flex items-center gap-[3px] active:opacity-60"
        >
          <LikeIcon width={20} height={20} /> 좋아요 {likes}
        </button>

        <button
          onClick={handleCommentClick}
          className="flex items-center gap-[4px] active:opacity-60"
        >
          <CommentIcon width={20} height={20} /> 댓글 {post.comments}
        </button>
      </div>

      {isReplyOpen && (
        <CommentInputBar
          onSubmit={handleSubmitReply}
          onClose={() => setIsReplyOpen(false)}
        />
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import { CommunityPost } from "../dummyData";
import LikeIcon from "@/assets/icon/Like.svg";
import CommentIcon from "@/assets/icon/Comment.svg";

interface QuestionSectionProps {
  post: CommunityPost;
}

export default function QuestionSection({ post }: QuestionSectionProps) {
  return (
    <section className="border-b-6 border-[#EEEEEE] pb-4">
      {/* 사용자 정보 */}
      <div className="flex items-center mb-3 mt-[10px]">
        <Image
          src={post.userProfile}
          alt={post.userName}
          width={35}
          height={35}
          className="rounded-full object-cover aspect-square"
        />
        <p className="text-[16px] ml-[5px] mr-[10px]">{post.userName}</p>
        <p className="text-[14px] text-[#757575]">{post.time}</p>
      </div>

      {/* 본문 */}
      <div className="mb-3 px-[5px] pb-[20px]">
        <h2 className="text-[20px] font-semibold mb-1">{post.title}</h2>
        <p className="text-[16px] text-sm">{post.description}</p>
      </div>

      {/* 좋아요 & 댓글 수 */}
      <div className="flex justify-center gap-[100px] text-sm text-[#9E9E9E]">
        <span className="flex items-center gap-[3px]">
          <LikeIcon /> 좋아요 {post.likes}
        </span>
        <span className="flex items-center gap-[4px]">
          <CommentIcon /> 댓글 {post.comments}
        </span>
      </div>
    </section>
  );
}

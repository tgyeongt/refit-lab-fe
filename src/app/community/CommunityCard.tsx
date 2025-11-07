"use client";
import { useRouter } from "next/navigation";

import { CommunityPost } from "./dummyData";
import LikeIcon from "@/assets/icon/Like.svg";
import CommentIcon from "@/assets/icon/Comment.svg";

interface CommunityCardProps {
  post: CommunityPost;
}

export default function CommunityCard({ post }: CommunityCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/community/${post.id}`);
  };
  return (
    <div
      className="p-[20px] border-t border-[#EEEEEE]"
      onClick={handleCardClick}
    >
      <div className="inline-block bg-[#F5F5F5] text-[#642C8D] text-[12px] font-medium px-[10px] py-[4px] rounded-[5px] mb-[8px]">
        {post.tag}
      </div>

      <p className="text-[18px] font-medium">{post.title}</p>

      <p className="text-[15px] font-medium mt-[6px] text-[#757575]">
        {post.description}
      </p>

      <div className="flex justify-between items-center text-[13px] mt-[10px]">
        <span className="text-[#757575]">{post.time}</span>
        <div className="flex gap-[10px] text-[#9E9E9E]">
          <span className="flex gap-[3px]">
            <LikeIcon /> {post.likes}
          </span>
          <span className="flex gap-[4px]">
            <CommentIcon />
            {post.comments}
          </span>
        </div>
      </div>
    </div>
  );
}

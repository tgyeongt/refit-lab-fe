"use client";

import { useRouter } from "next/navigation";
import LikeIcon from "@/assets/icon/like.svg";
import CommentIcon from "@/assets/icon/comment.svg";
import { useTimeAgo } from "@/shared/hooks/useTimeAgo";

interface CommunityPost {
  postId: number;
  category: "FREE" | "REPAIR" | "INFO";
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  nickname: string;
  imageUrlList?: string[];
}

interface CommunityCardProps {
  post: CommunityPost;
}

export default function CommunityCard({ post }: CommunityCardProps) {
  const router = useRouter();
  const timeAgoText = useTimeAgo(post.createdAt);

  const CATEGORY_LABEL_MAP: Record<CommunityPost["category"], string> = {
    FREE: "자유 질문",
    REPAIR: "수선 꿀팁",
    INFO: "정보 공유",
  };

  const handleCardClick = () => {
    router.push(`/community/${post.postId}`);
  };

  return (
    <div
      className="p-[20px] border-b border-[#EEEEEE]"
      onClick={handleCardClick}
    >
      <div className="inline-block bg-[#F5F5F5] text-[#642C8D] text-[12px] font-medium px-[10px] py-[4px] rounded-[5px] mb-[8px]">
        {CATEGORY_LABEL_MAP[post.category]}
      </div>

      <p className="text-[18px] font-medium">{post.title}</p>

      <p className="text-[15px] font-medium mt-[6px] text-[#757575]">
        {post.content}
      </p>

      <div className="flex justify-between items-center text-[13px] mt-[10px]">
        <span className="text-[#757575]">{timeAgoText}</span>
        <div className="flex gap-[10px] text-[#9E9E9E]">
          <span className="flex gap-[3px]">
            <LikeIcon width={20} height={20} /> {post.likes}
          </span>
          <span className="flex gap-[4px]">
            <CommentIcon width={20} height={20} /> {post.comments}
          </span>
        </div>
      </div>
    </div>
  );
}

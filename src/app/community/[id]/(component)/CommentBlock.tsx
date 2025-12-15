"use client";

import Image from "next/image";
import MoreIcon from "@/assets/icon/more.svg";
import LikeIcon from "@/assets/icon/like.svg";
import CommentIcon from "@/assets/icon/comment.svg";
import { useTimeAgo } from "@/shared/hooks/useTimeAgo";

interface CommentBlockProps {
  id: number;
  userProfile: string;
  userName?: string;
  time: string;
  content: string;
  likeCount: number;
  onLike: (id: number) => void;
  onReplyClick: (id: number) => void;
  openMenuId: number | null;
  handleToggleMenu: (id: number) => void;
  handleReport: (id: number) => void;
}

export default function CommentBlock({
  id,
  userProfile,
  userName,
  time,
  content,
  likeCount,
  onLike,
  onReplyClick,
  openMenuId,
  handleToggleMenu,
  handleReport,
}: CommentBlockProps) {
  const timeAgoText = useTimeAgo(time);

  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={userProfile}
            alt={userName || "익명"}
            width={35}
            height={35}
            className="rounded-full object-cover aspect-square"
          />
          <p className="text-[14px] font-medium">{userName || "익명"}</p>
          <p className="text-[12px] text-[#757575]">{timeAgoText}</p>
        </div>

        <button type="button" onClick={() => handleToggleMenu(id)}>
          <MoreIcon width={20} height={20} />
        </button>

        {openMenuId === id && (
          <div className="absolute right-0 mt-13 w-[80px] bg-white shadow-md rounded-md p-2 text-sm z-10">
            <button
              type="button"
              onClick={() => handleReport(id)}
              className="w-full text-left px-2 py-1 rounded"
            >
              신고
            </button>
          </div>
        )}
      </div>

      <p className="text-[16px] ml-[48px]">{content}</p>

      <div className="flex gap-4 text-[14px] text-[#9E9E9E] mb-[8px] ml-[48px]">
        <button
          type="button"
          className="flex gap-[3px] items-center"
          onClick={() => onLike(id)}
        >
          <LikeIcon width={16} height={16} />
          <span>{likeCount === 0 ? "좋아요" : likeCount}</span>
        </button>

        <button
          type="button"
          className="flex gap-[4px] items-center"
          onClick={() => onReplyClick(id)}
        >
          <CommentIcon width={16} height={16} />
          <span>답글쓰기</span>
        </button>
      </div>
    </div>
  );
}

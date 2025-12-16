"use client";

import Image from "next/image";
import { useState } from "react";
import MoreIcon from "@/assets/icon/more.svg";
import LikeIcon from "@/assets/icon/like.svg";
import CommentIcon from "@/assets/icon/comment.svg";
import { useTimeAgo } from "@/shared/hooks/useTimeAgo";
import { useAuth } from "@/shared/stores/useAuthStore";
import { toggleCommentLike } from "../../(api)/toggleCommentLike";

interface CommentBlockProps {
  commentId: number;
  userProfile: string;
  userName?: string;
  time: string;
  content: string;
  likeCount: number;
  isLiked?: boolean;
  onReplyClick: (id: number) => void;
  openMenuId: number | null;
  handleToggleMenu: (id: number) => void;
  handleReport: (id: number) => void;
}

export default function CommentBlock({
  commentId,
  userProfile,
  userName,
  time,
  content,
  likeCount,
  isLiked: initialLiked = false,
  onReplyClick,
  openMenuId,
  handleToggleMenu,
  handleReport,
}: CommentBlockProps) {
  const timeAgoText = useTimeAgo(time);
  const { accessToken } = useAuth();

  const [likes, setLikes] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLike = async () => {
    if (!accessToken) return alert("로그인이 필요합니다.");

    try {
      await toggleCommentLike(commentId, accessToken);

      setIsLiked((prev) => !prev);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error(err);
      alert("좋아요 요청 중 오류가 발생했습니다.");
    }
  };

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

        <button type="button" onClick={() => handleToggleMenu(commentId)}>
          <MoreIcon width={20} height={20} />
        </button>

        {openMenuId === commentId && (
          <div className="absolute right-0 mt-13 w-[80px] bg-white shadow-md rounded-md p-2 text-sm z-10">
            <button
              type="button"
              onClick={() => handleReport(commentId)}
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
          onClick={handleLike}
        >
          <LikeIcon width={16} height={16} />
          <span>{likes === 0 ? "좋아요" : likes}</span>
        </button>

        <button
          type="button"
          className="flex gap-[4px] items-center"
          onClick={() => onReplyClick(commentId)}
        >
          <CommentIcon width={16} height={16} />
          <span>답글쓰기</span>
        </button>
      </div>
    </div>
  );
}

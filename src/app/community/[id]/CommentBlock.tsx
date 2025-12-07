"use client";

import Image from "next/image";
import MoreIcon from "@/assets/icon/more.svg";
import LikeIcon from "@/assets/icon/like.svg";
import CommentIcon from "@/assets/icon/comment.svg";

interface CommentBlockProps {
  id: number;
  userProfile: string;
  userName: string;
  time: string;
  content: string;
  isReply?: boolean;
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
  isReply = false,
  openMenuId,
  handleToggleMenu,
  handleReport,
}: CommentBlockProps) {
  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={userProfile}
            alt={userName}
            width={35}
            height={35}
            className="rounded-full object-cover aspect-square"
          />
          <p className="text-[14px] font-medium">{userName}</p>
          <p className="text-[12px] text-[#757575]">{time}</p>
        </div>

        <button onClick={() => handleToggleMenu(id)}>
          <MoreIcon width={20} height={20} />
        </button>

        {/* 신고 메뉴 */}
        {openMenuId === id && (
          <div className="absolute right-0 mt-13 w-[80px] bg-white shadow-md rounded-md p-2 text-sm z-10">
            <button
              onClick={() => handleReport(id)}
              className="w-full text-left px-2 py-1 rounded"
            >
              신고
            </button>
          </div>
        )}
      </div>

      {/* 내용 */}
      <p className={`text-[16px] ${isReply ? "ml-[48px]" : "ml-[48px]"}`}>
        {content}
      </p>

      {/* 좋아요 / 답글쓰기 */}
      <div
        className={`flex gap-4 text-[14px] text-[#9E9E9E] mb-[8px] ${
          isReply ? "ml-[48px]" : "ml-[48px]"
        }`}
      >
        <button className="flex gap-[3px] items-center">
          <LikeIcon width={16} height={16} />
          <span>좋아요</span>
        </button>
        <button className="flex gap-[5px] items-center">
          <CommentIcon width={16} height={16} />
          <span>답글쓰기</span>
        </button>
      </div>
    </div>
  );
}

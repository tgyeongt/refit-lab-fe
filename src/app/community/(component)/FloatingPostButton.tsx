"use client";

import PostIcon from "@/assets/icon/pencil-2.svg";

interface FloatingPostButtonProps {
  onClick?: () => void;
}

export default function FloatingPostButton({
  onClick,
}: FloatingPostButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-[20px] right-[20px] 
        bg-[#642C8D] text-white 
        rounded-[30px] shadow-lg
        flex items-center justify-center 
        z-50 px-[20px] py-[10px] gap-[8px]
      "
    >
      <PostIcon width={24} height={24} />
      <span className="font-semibold">글쓰기</span>
    </button>
  );
}

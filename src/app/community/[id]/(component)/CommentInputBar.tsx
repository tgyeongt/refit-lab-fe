"use client";

import { useState, useEffect, useRef } from "react";
import SendIcon from "@/assets/icon/send.svg";

interface CommentInputBarProps {
  onSubmit: (text: string) => void;
  onClose: () => void;
}

export default function CommentInputBar({
  onSubmit,
  onClose,
}: CommentInputBarProps) {
  const [value, setValue] = useState("");
  const barRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    if (value.trim() === "") return;
    onSubmit(value);
    setValue("");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const isActive = value.trim().length > 0;

  return (
    <div
      ref={barRef}
      className="
        fixed bottom-0 left-0 w-full
        bg-white
        rounded-t-[16px]
        p-3 flex items-center gap-3
        z-50
      "
    >
      <input
        className="
          flex-1 p-3 text-sm bg-[#F5F5F7] rounded-[25px]
          border-none outline-none
          focus:outline-none focus:ring-0
        "
        placeholder="댓글을 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      <button
        className="text-blue-500 font-semibold px-[5px]"
        onClick={handleSubmit}
      >
        <SendIcon
          className="text-current [&_*]:fill-current"
          style={{
            color: isActive ? "#642C8D" : "#E0E0E0",
          }}
        />
      </button>
    </div>
  );
}

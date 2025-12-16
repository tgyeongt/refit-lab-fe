"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import SendIcon from "@/assets/icon/send.svg";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false); // 클라이언트 마운트 여부
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true); // 클라이언트에서만 동적 색상 적용
  }, []);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const isActive = message.trim().length > 0;
  const iconColor = mounted && isActive ? "#642C8D" : "#E0E0E0";

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 w-full bg-white rounded-t-[16px] p-3 flex items-center gap-3 z-50"
      style={{ boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.08)" }}
    >
      <input
        className="flex-1 p-3 text-sm bg-[#F5F5F7] rounded-[25px] border-none outline-none focus:outline-none focus:ring-0"
        placeholder="메세지를 입력해주세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      <button className="font-semibold px-[5px]" onClick={handleSubmit}>
        <SendIcon
          className="text-current [&_*]:fill-current"
          style={{ color: iconColor }}
        />
      </button>
    </div>
  );
}

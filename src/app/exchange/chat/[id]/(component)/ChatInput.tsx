"use client";

import { useState, FormEvent } from "react";
import SendIcon from "@/assets/icon/send.svg";

interface ChatInputProps {
  onSend: (message: string) => void;
  canSend: boolean;
}

export default function ChatInput({ onSend, canSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || !canSend) return;
    onSend(message);
    setMessage("");
  };

  const isActive = message.trim().length > 0 && canSend;

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full
        bg-white
        rounded-t-[16px]
        p-3 flex items-center gap-3
        z-50
      "
      style={{
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.08)",
      }}
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

      <button
        className="text-blue-500 font-semibold px-[5px]"
        onClick={handleSubmit}
        disabled={!isActive}
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

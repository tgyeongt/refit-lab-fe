"use client";

import { useState, FormEvent } from "react";
import SendIcon from "@/assets/icon/send.svg";
import EventIcon from "@/assets/icon/event.svg";

interface ChatInputProps {
  onSend: (message: string) => void;
  canSend: boolean;
}

export default function ChatInput({ onSend, canSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showActions, setShowActions] = useState(false);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleReserveExchange = () => {
    onSend("📦 교환 예약을 했어요. 이후 일정은 채팅으로 조율해요!");
    setShowActions(false);
  };

  const isActive = message.trim().length > 0 && canSend;

  return (
    <>
      {showActions && (
        <div className="fixed bottom-[80px] left-0 w-full px-4 z-40">
          <button
            onClick={handleReserveExchange}
            className="w-full py-4 rounded-xl bg-[#642C8D] text-white font-medium shadow-md"
          >
            교환 예약
          </button>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-white p-3 flex items-center gap-3 z-50">
        <button
          onClick={() => setShowActions((prev) => !prev)}
          style={{ color: showActions ? "#642C8D" : "#9E9E9E" }}
        >
          <EventIcon className="w-6 h-6 [&_*]:stroke-current" />
        </button>

        <input
          className="flex-1 p-3 text-sm bg-[#F5F5F7] rounded-full outline-none"
          placeholder="메세지를 입력해주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <button onClick={handleSubmit}>
          <SendIcon
            className="text-current [&_*]:fill-current"
            style={{ color: isActive ? "#642C8D" : "#E0E0E0" }}
          />
        </button>
      </div>
    </>
  );
}

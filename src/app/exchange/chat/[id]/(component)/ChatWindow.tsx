"use client";

import { useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  content: string;
  isMine: boolean;
}

interface ChatWindowProps {
  messages: ChatMessage[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#FAFAFA]"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`px-4 py-2 rounded-[16px] max-w-[70%] text-sm ${
              msg.isMine
                ? "bg-[#642C8D] text-white"
                : "bg-[#EEEEEE] text-[#424242]"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useRef, useEffect } from "react";

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMine?: boolean;
}

interface ChatWindowProps {
  messages: ChatMessage[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`px-[15px] py-[10px] rounded-[15px] max-w-[70%] text-sm ${
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

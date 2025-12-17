"use client";

import { useState } from "react";
import ChatHeader from "./(component)/ChatHeader";
import ChatWindow from "./(component)/ChatWindow";
import ChatInput from "./(component)/ChatInput";
import Profile from "@/assets/image/user-profile.png";

export interface ChatMessage {
  id: string;
  content: string;
  isMine: boolean;
}

export default function ExchangeChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "안녕하세요! 교환 문의 드려요 🙂",
      isMine: true,
    },
    {
      id: "2",
      content: "네 안녕하세요!",
      isMine: false,
    },
  ]);

  const handleSend = (message: string) => {
    console.log("[UI] 메시지 전송:", message);

    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        content: message,
        isMine: true,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader
        username="홍길동"
        profileUrl={Profile.src}
        onBack={() => history.back()}
      />

      <ChatWindow messages={messages} />

      <ChatInput onSend={handleSend} canSend={true} />
    </div>
  );
}

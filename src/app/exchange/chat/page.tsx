"use client";

import useHeader from "@/shared/hooks/useHeader";
import { useState } from "react";
import ChatWindow, { ChatMessage } from "./(component)/ChatWindow";
import ChatInput from "./(component)/ChatInput";
import { v4 as uuidv4 } from "uuid";
import ChatHeader from "./(component)/ChatHeader";
import { useRouter } from "next/navigation";

export default function ExchangeChatPage() {
  useHeader({
    showBack: true,
    showMenu: true,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const router = useRouter();
  const handleSend = (content: string) => {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      sender: "me",
      content,
      timestamp: new Date().toISOString(),
      isMine: true,
    };
    setMessages((prev) => [...prev, newMessage]);

    // TODO: 서버로 전송 (웹소켓)
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        username="홍길동"
        profileUrl="/path/to/profile.jpg"
        onBack={() => router.back()}
      />
      <ChatWindow messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

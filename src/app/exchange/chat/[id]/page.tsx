"use client";

import { useParams } from "next/navigation";
import ChatHeader from "./(component)/ChatHeader";
import ChatWindow from "./(component)/ChatWindow";
import ChatInput from "./(component)/ChatInput";
import Profile from "@/assets/image/user-profile.png";
import { useExchangeChat } from "./(hook)/useExchangeChat";

export default function ExchangeChatPage() {
  const params = useParams<{ id: string }>();
  const postId = params.id ? Number(params.id) : null;

  const { receiverNickname, receiverProfileUrl, messages, sendMessage, connected } =
    useExchangeChat(postId);

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader
        username={receiverNickname || "대화 상대"}
        profileUrl={receiverProfileUrl || Profile.src}
        onBack={() => history.back()}
      />

      <ChatWindow messages={messages} />

      <ChatInput onSend={sendMessage} canSend={connected} />
    </div>
  );
}

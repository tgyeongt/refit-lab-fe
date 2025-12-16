"use client";

import { useParams } from "next/navigation";
import ChatHeader from "./(component)/ChatHeader";
import ChatWindow from "./(component)/ChatWindow";
import ChatInput from "./(component)/ChatInput";
import { useExchangeChat } from "./(hook)/useExchangeChat";

export default function ExchangeChatPage() {
  const params = useParams();
  const postId = params.id ? Number(params.id) : null;

  const {
    senderNickname,
    senderProfileUrl,
    messages,
    sendMessage,
    loading,
    connected,
  } = useExchangeChat(postId);

  console.log(
    "[Page] senderNickname:",
    senderNickname,
    "connected:",
    connected
  );

  if (loading)
    return <p className="text-center mt-10 text-gray-500">채팅방 생성 중...</p>;

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        username={senderNickname || "로딩 중..."}
        profileUrl={senderProfileUrl || "/path/to/profile.jpg"}
        onBack={() => history.back()}
      />
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} canSend={connected} />
    </div>
  );
}

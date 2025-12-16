"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import { createExchangeChatRoom, getChatMessages } from "../(api)/chat";

export interface ChatMessage {
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
  isMine: boolean;
}

interface UseExchangeChatReturn {
  roomId: number | null;
  senderNickname: string;
  senderProfileUrl: string;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  loading: boolean;
}

export function useExchangeChat(postId: number | null): UseExchangeChatReturn {
  const [roomId, setRoomId] = useState<number | null>(null);
  const [senderNickname, setSenderNickname] = useState<string>(""); // 상대 이름
  const [senderProfileUrl, setSenderProfileUrl] = useState<string>(""); // 상대 프로필
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    if (!postId) return;

    const init = async () => {
      try {
        setLoading(true);

        // 1️⃣ 채팅방 생성
        const roomData = await createExchangeChatRoom(postId);
        console.log("roomData:", roomData); // 🔍 여기서 roomId, lastMessage 등 확인
        setRoomId(roomData.roomId);

        // 2️⃣ 상대방 정보 가져오기 (메시지 API)
        const chatData = await getChatMessages(roomData.roomId, undefined, 1);
        console.log("chatData:", chatData); // 🔍 messages 배열 확인
        if (chatData.content.length > 0) {
          const firstMsg = chatData.content[0];
          console.log("firstMsg senderNickname:", firstMsg.senderNickname);
          console.log(
            "firstMsg senderProfileImageUrl:",
            firstMsg.senderProfileImageUrl
          );
          setSenderNickname(firstMsg.senderNickname);
          setSenderProfileUrl(firstMsg.senderProfileImageUrl ?? "");
        }

        // 3️⃣ 기존 마지막 메시지 표시
        if (roomData.lastMessage) {
          setMessages([
            {
              id: uuidv4(),
              sender: "other",
              content: roomData.lastMessage,
              timestamp: roomData.lastMessageAt ?? new Date().toISOString(),
              isMine: false,
            },
          ]);
        }

        // 4️⃣ 웹소켓 연결
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);
        const client = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log("[STOMP]", str),
        });

        client.onConnect = () => {
          console.log("✅ STOMP 연결됨");

          client.subscribe(
            `/sub/chats/rooms/${roomData.roomId}`,
            (msg: IMessage) => {
              const body = JSON.parse(msg.body);
              console.log("받은 메시지:", body); // 🔍 메시지 수신 확인
              setMessages((prev) => [
                ...prev,
                {
                  id: uuidv4(),
                  sender:
                    body.senderNickname === senderNickname ? "other" : "me",
                  content: body.content,
                  timestamp: body.createdAt,
                  isMine: body.senderNickname !== senderNickname,
                },
              ]);
            }
          );

          // 입장 후 읽음 처리
          client.publish({
            destination: `/pub/chats/rooms/${roomData.roomId}/read`,
            body: JSON.stringify({}),
          });
        };

        client.activate();
        stompClient.current = client;
      } catch (error) {
        console.error("채팅방 초기화 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [postId]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!roomId || !stompClient.current) return;

      const msg = { content, roomId };
      stompClient.current.publish({
        destination: `/pub/chats/rooms/${roomId}/message`,
        body: JSON.stringify(msg),
      });

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sender: "me",
          content,
          timestamp: new Date().toISOString(),
          isMine: true,
        },
      ]);
    },
    [roomId]
  );

  return {
    roomId,
    senderNickname,
    senderProfileUrl,
    messages,
    sendMessage,
    loading,
  };
}

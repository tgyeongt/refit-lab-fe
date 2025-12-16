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
  connected: boolean;
}

export function useExchangeChat(postId: number | null): UseExchangeChatReturn {
  const [roomId, setRoomId] = useState<number | null>(null);
  const [senderNickname, setSenderNickname] = useState<string>("");
  const [senderProfileUrl, setSenderProfileUrl] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    if (!postId) return;

    const init = async () => {
      try {
        setLoading(true);

        // 1️⃣ 채팅방 생성
        const roomData = await createExchangeChatRoom(postId);
        setRoomId(roomData.roomId);

        // 2️⃣ 최근 메시지 가져오기
        const chatData = await getChatMessages(roomData.roomId, undefined, 1);
        if (chatData.content.length > 0) {
          const firstMsg = chatData.content[0];
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

        // 4️⃣ STOMP 웹소켓 연결
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);
        const client = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log("[STOMP]", str),
        });

        client.onConnect = () => {
          console.log("✅ STOMP 연결됨");
          setConnected(true);

          client.subscribe(
            `/sub/chats/rooms/${roomData.roomId}`,
            (msg: IMessage) => {
              const body = JSON.parse(msg.body);
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

        client.onStompError = (frame) => {
          console.error("STOMP 에러:", frame.headers, frame.body);
        };

        client.onWebSocketClose = () => {
          console.log("STOMP 연결 종료");
          setConnected(false);
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
        setConnected(false);
      }
    };
  }, [postId, senderNickname]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!roomId || !stompClient.current || !stompClient.current.connected) {
        console.warn("STOMP 연결이 완료되지 않아 메시지를 보낼 수 없습니다.");
        return;
      }

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
    connected,
  };
}

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
        console.log("[Chat] 채팅 초기화 시작...");
        setLoading(true);

        // 1️⃣ 채팅방 생성
        const roomData = await createExchangeChatRoom(postId);
        console.log("[Chat] 채팅방 생성 완료:", roomData);
        setRoomId(roomData.roomId);

        // 2️⃣ 최근 메시지 가져오기
        const chatData = await getChatMessages(roomData.roomId, undefined, 1);
        console.log("[Chat] 최근 메시지 가져오기:", chatData);

        if (chatData.content.length > 0) {
          const firstMsg = chatData.content[0];
          setSenderNickname(firstMsg.senderNickname);
          setSenderProfileUrl(firstMsg.senderProfileImageUrl ?? "");
          console.log(
            "[Chat] 상대 정보 설정:",
            firstMsg.senderNickname,
            firstMsg.senderProfileImageUrl
          );
        }

        // 3️⃣ 기존 마지막 메시지 표시
        if (roomData.lastMessage) {
          const lastMsg: ChatMessage = {
            id: uuidv4(),
            sender: "other",
            content: roomData.lastMessage,
            timestamp: roomData.lastMessageAt ?? new Date().toISOString(),
            isMine: false,
          };
          setMessages([lastMsg]);
          console.log("[Chat] 기존 마지막 메시지 표시:", lastMsg);
        }

        // 4️⃣ STOMP 웹소켓 연결
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);
        const client = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log("[STOMP DEBUG]", str),
        });

        client.onConnect = () => {
          console.log("[STOMP] 연결됨");
          setConnected(true);

          // 구독
          client.subscribe(
            `/sub/chats/rooms/${roomData.roomId}`,
            (msg: IMessage) => {
              const body = JSON.parse(msg.body);
              console.log("[STOMP] 수신 메시지:", body);

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
          console.log("[STOMP] 읽음 처리 완료");
        };

        client.onStompError = (frame) => {
          console.error("[STOMP ERROR]", frame.headers, frame.body);
        };

        client.onWebSocketClose = () => {
          console.log("[STOMP] 연결 종료");
          setConnected(false);
        };

        client.activate();
        stompClient.current = client;
      } catch (error) {
        console.error("[Chat] 채팅방 초기화 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      if (stompClient.current) {
        console.log("[Chat] 컴포넌트 언마운트, 연결 종료");
        stompClient.current.deactivate();
        setConnected(false);
      }
    };
  }, [postId, senderNickname]);

  const sendMessage = useCallback(
    (content: string) => {
      console.log(
        "[Chat] sendMessage 호출:",
        content,
        "roomId:",
        roomId,
        "connected:",
        connected
      );

      if (!roomId || !stompClient.current || !stompClient.current.connected) {
        console.warn("[Chat] STOMP 연결 안됨, 메시지 전송 실패");
        return;
      }

      const msg = { content, roomId };
      stompClient.current.publish({
        destination: `/pub/chats/rooms/${roomId}/message`,
        body: JSON.stringify(msg),
      });
      console.log("[STOMP] 메시지 발송:", msg);

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
    [roomId, connected]
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

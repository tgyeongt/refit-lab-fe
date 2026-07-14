"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";
import { createExchangeChatRoom, getChatMessages } from "../(api)/chat";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export interface ChatMessage {
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
  isMine: boolean;
}

interface UseExchangeChatReturn {
  roomId: number | null;
  receiverNickname: string;
  receiverProfileUrl: string;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  loading: boolean;
  connected: boolean;
}

export function useExchangeChat(postId: number | null): UseExchangeChatReturn {
  const [roomId, setRoomId] = useState<number | null>(null);
  const [receiverNickname, setReceiverNickname] = useState("");
  const [receiverProfileUrl, setReceiverProfileUrl] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const stompClient = useRef<Client | null>(null);
  const roomIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!postId) return;

    let cancelled = false;
    const myNickname = useAuthStore.getState().user?.nickname ?? "";

    const init = async () => {
      try {
        setLoading(true);

        const roomData = await createExchangeChatRoom(postId);
        if (cancelled) return;
        roomIdRef.current = roomData.roomId;
        setRoomId(roomData.roomId);
        setReceiverNickname(roomData.receiverNickname);
        setReceiverProfileUrl(roomData.receiverProfileUrl);

        const chatData = await getChatMessages(roomData.roomId, undefined, 20);
        if (cancelled) return;

        const history: ChatMessage[] = chatData.content
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((m) => ({
            id: String(m.messageId),
            sender: m.senderNickname === myNickname ? "me" : "other",
            content: m.content,
            timestamp: m.createdAt,
            isMine: m.senderNickname === myNickname,
          }));
        setMessages(history);

        const accessToken = useAuthStore.getState().accessToken;
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);
        const client = new Client({
          webSocketFactory: () => socket,
          connectHeaders: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        });

        client.onConnect = () => {
          setConnected(true);

          client.subscribe(
            `/sub/chats/rooms/${roomData.roomId}`,
            (msg: IMessage) => {
              const body = JSON.parse(msg.body);

              // 내가 보낸 메시지는 전송 시점에 이미 낙관적으로 추가했으므로 중복 추가하지 않음
              if (body.senderNickname === myNickname) return;

              setMessages((prev) => [
                ...prev,
                {
                  id: String(body.messageId ?? uuidv4()),
                  sender: "other",
                  content: body.content,
                  timestamp: body.createdAt,
                  isMine: false,
                },
              ]);
            }
          );

          client.publish({
            destination: `/pub/chats/rooms/${roomData.roomId}/read`,
            body: JSON.stringify({}),
          });
        };

        client.onStompError = (frame) => {
          console.error("[Chat] STOMP 에러:", frame.headers, frame.body);
        };

        client.onWebSocketClose = () => {
          setConnected(false);
        };

        client.activate();
        stompClient.current = client;
      } catch (error) {
        console.error("[Chat] 채팅방 초기화 실패:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
      stompClient.current?.deactivate();
      stompClient.current = null;
      setConnected(false);
    };
  }, [postId]);

  const sendMessage = useCallback((content: string) => {
    const roomId = roomIdRef.current;
    if (!roomId || !stompClient.current?.connected) {
      console.warn("[Chat] STOMP 연결 안됨, 메시지 전송 실패");
      return;
    }

    stompClient.current.publish({
      destination: `/pub/chats/rooms/${roomId}/message`,
      body: JSON.stringify({ content, roomId }),
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
  }, []);

  return {
    roomId,
    receiverNickname,
    receiverProfileUrl,
    messages,
    sendMessage,
    loading,
    connected,
  };
}

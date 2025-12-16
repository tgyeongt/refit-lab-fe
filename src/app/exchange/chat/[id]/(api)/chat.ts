import { privateAPI } from "@/shared/api/apiInstance";
export interface CreateChatResponse {
  roomId: number;
  exchangePostId: number;
  receiverNickname: string;
  receiverProfileUrl: string;
  lastMessage?: string;
  lastMessageAt?: string;
}

export interface ChatRoom {
  roomId: number;
  exchangePostId: number;
  receiverNickname: string;
  receiverProfileUrl: string;
  lastMessage?: string;
  lastMessageAt?: string;
}

export interface ChatMessage {
  senderProfileImageUrl: string;
  messageId: number;
  roomId: number;
  senderNickname: string;
  receiverProfileUrl: string;
  content: string;
  createdAt: string;
}

export const createExchangeChatRoom = async (
  postId: number
): Promise<CreateChatResponse> => {
  const res = await privateAPI.post(`/chats/exchange/${postId}`);
  return res.data.data;
};

export const markChatRoomAsRead = async (roomId: number) => {
  const res = await privateAPI.put(`/chats/rooms/${roomId}/read`);
  return res.data;
};

export const getChatRooms = async (
  lastChatRoomId?: number,
  size: number = 5
): Promise<{ content: ChatRoom[]; lastCursor: number; hasNext: boolean }> => {
  const res = await privateAPI.get("/chats/rooms", {
    params: { lastChatRoomId, size },
  });
  return res.data.data;
};

export const getChatMessages = async (
  roomId: number,
  lastChatId?: number,
  size: number = 10
): Promise<{
  content: ChatMessage[];
  lastCursor: number;
  hasNext: boolean;
}> => {
  const res = await privateAPI.get(`/chats/rooms/${roomId}/messages`, {
    params: { lastChatId, size },
  });
  return res.data.data;
};

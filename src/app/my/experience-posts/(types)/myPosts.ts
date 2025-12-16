import type { BaseResponse } from "@/shared/api/BaseResponse";

export type MyPostCategory = "FREE" | "REPAIR" | "INFO";

// /api/my/posts 단일 게시글 응답 타입
export interface MyPostApi {
  category: MyPostCategory;
  postId: number;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  nickname: string;
  isAuthor: boolean;
  isLiked: boolean;
  imageUrlList: string[] | null;
  commentIdList: number[];
}

export interface MyPostsPageData {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  items: MyPostApi[];
}

export type ResponseMyPosts = BaseResponse<MyPostsPageData>;

// UI에서 사용하는 카드 데이터 타입 (MyPostCard 전용)
export interface MyExperiencePostCard {
  id: number;
  tag: string;
  title: string;
  description: string;
  time: string;
  likes: number;
  comments: number;
  userName: string;
  userProfile: string;
  thumbnailUrl?: string;
}

const CATEGORY_LABEL_MAP: Record<MyPostCategory, string> = {
  FREE: "자유 질문",
  REPAIR: "수선 꿀팁",
  INFO: "정보 공유",
};

// API 응답을 MyExperiencePostCard로 매핑
export const mapMyPostFromApi = (api: MyPostApi): MyExperiencePostCard => {
  const createdDate = api.createdAt?.split("T")[0] ?? "";

  return {
    id: api.postId,
    tag: CATEGORY_LABEL_MAP[api.category] ?? api.category,
    title: api.title,
    description: api.content,
    time: createdDate,
    likes: api.likes,
    comments: api.comments,
    userName: api.nickname,
    // 현재 API에는 프로필 이미지가 없으므로 기본 이미지 사용 (필요 시 교체)
    userProfile: "/images/default-profile.jpg",
    thumbnailUrl: api.imageUrlList && api.imageUrlList.length > 0
      ? api.imageUrlList[0]
      : undefined,
  };
};



"use client";

import { useQuery } from "@tanstack/react-query";
import CommunityCard from "./CommunityCard";
import {
  getPosts,
  CommunityPost,
  CommunityCategory,
  GetPostsResponse,
} from "../(api)/getPosts";
import { useAuth } from "@/shared/stores/useAuthStore";

const CATEGORY_MAP: Record<string, CommunityCategory[]> = {
  전체: ["FREE", "REPAIR", "INFO"], // 내부 로직에서는 전체일 때 생략
  "자유 질문": ["FREE"],
  "수선 꿀팁": ["REPAIR"],
  "정보 공유": ["INFO"],
};

interface ContentProps {
  activeTab: string;
}

export default function Content({ activeTab }: ContentProps) {
  const { accessToken, isLoggedIn, hydrated } = useAuth();

  const { data, isLoading, isError } = useQuery<GetPostsResponse>({
    queryKey: ["communityPosts", activeTab, accessToken],
    queryFn: () => {
      if (!isLoggedIn || !accessToken) throw new Error("로그인이 필요합니다.");

      const categoriesToSend =
        activeTab === "전체" ? [] : CATEGORY_MAP[activeTab] || [];

      return getPosts({ category: categoriesToSend, size: 20 });
    },
    enabled: hydrated && isLoggedIn,
  });

  if (!hydrated) return <p className="text-center mt-10">데이터 준비 중...</p>;
  if (!isLoggedIn)
    return <p className="text-center mt-10">로그인이 필요합니다.</p>;
  if (isLoading) return <p className="text-center mt-10">로딩중...</p>;
  if (isError)
    return <p className="text-center mt-10">데이터를 불러오지 못했습니다.</p>;
  if (!data?.content.length)
    return (
      <p className="text-center mt-10 text-gray-500">게시글이 없습니다.</p>
    );

  return (
    <div className="mb-[60px]">
      {data.content.map((post: CommunityPost) => (
        <CommunityCard
          key={post.postId}
          post={{
            ...post,
            category: post.category,
          }}
        />
      ))}
    </div>
  );
}

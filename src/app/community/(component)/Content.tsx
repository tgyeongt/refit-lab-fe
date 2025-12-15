"use client";

import { useQuery } from "@tanstack/react-query";
import CommunityCard from "./CommunityCard";
import {
  getPosts,
  CommunityPost,
  CommunityCategory,
  GetPostsResponse,
} from "../(api)/getPosts";

const CATEGORY_MAP: Record<string, CommunityCategory[]> = {
  전체: ["FREE", "REPAIR", "INFO"],
  "자유 질문": ["FREE"],
  "수선 꿀팁": ["REPAIR"],
  "정보 공유": ["INFO"],
};

interface ContentProps {
  activeTab: string;
}

export default function Content({ activeTab }: ContentProps) {
  const categories = CATEGORY_MAP[activeTab] || [];

  const { data, isLoading, isError } = useQuery<GetPostsResponse>({
    queryKey: ["communityPosts", categories],
    queryFn: async () => {
      try {
        const res = await getPosts({ category: categories, size: 20 });
        console.log("API 성공 응답:", res);
        return res;
      } catch (err) {
        console.error("API 호출 실패:", err);
        return { content: [], lastCursor: 0, hasNext: false, size: 0 }; // fallback
      }
    },
  });

  console.log("useQuery data:", data);

  if (isLoading) return <p className="text-center mt-10">로딩중...</p>;
  if (isError)
    return <p className="text-center mt-10">데이터를 불러오지 못했습니다.</p>;
  if (!data?.content.length)
    return (
      <p className="text-center mt-10 text-gray-500">게시글이 없습니다.</p>
    );

  return (
    <div>
      {data.content.map((post: CommunityPost) => (
        <CommunityCard key={post.postId} post={post} />
      ))}
    </div>
  );
}

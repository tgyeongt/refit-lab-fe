"use client";

import { useQuery } from "@tanstack/react-query";
import CommunityCard from "@/app/community/(component)/CommunityCard";
import {
  getPosts,
  CommunityPost,
  CommunityCategory,
  GetPostsResponse,
} from "@/app/community/(api)/getPosts";
import { useAuth } from "@/shared/stores/useAuthStore";

export default function CommunityTopPosts() {
  const { accessToken, isLoggedIn, hydrated } = useAuth();

  const { data, isLoading, isError } = useQuery<GetPostsResponse>({
    queryKey: ["allCommunityPosts", accessToken],
    queryFn: () => {
      if (!isLoggedIn || !accessToken) throw new Error("로그인이 필요합니다.");
      return getPosts({ category: [], size: 100 }, accessToken);
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

  const topPosts: CommunityPost[] = [...data.content]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="px-[15px]">
      {topPosts.map((post) => (
        <CommunityCard key={post.postId} post={post} />
      ))}

      {topPosts.length === 0 && (
        <div className="text-center text-gray-500 text-sm mt-10">
          불러올 커뮤니티 글이 없습니다.
        </div>
      )}
    </div>
  );
}

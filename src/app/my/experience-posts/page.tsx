"use client";

import { useState } from "react";
import useHeader from "@/shared/hooks/useHeader";
import { MyPostCard } from "./(component)/MyPostCard";
import { Pagination } from "@/shared/components/Pagination";
import { MY_POST_DATA } from "./(dummy)/myPostData";
import { CommunityPost } from "@/app/community/dummyData";

const ITEMS_PER_PAGE = 4;

// 내 경험 공유글 페이지
export default function ExperiencePostsPage() {
  useHeader({ title: "내 경험 공유글", showBack: true, showMenu: true });
  const [currentPage, setCurrentPage] = useState(1);

  // 최신순 정렬 (id 기준)
  const sortedPosts: (CommunityPost & { thumbnailUrl?: string })[] = [
    ...MY_POST_DATA,
  ].sort((a, b) => b.id - a.id);

  // 페이지네이션
  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-gray-1">
      {/* 글 목록 */}
      <div className="px-[20px] space-y-[15px] pb-6 pt-10">
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">작성한 글이 없습니다.</p>
            <p className="text-gray-6 text-sm mt-2">
              커뮤니티에서 경험을 공유해보세요!
            </p>
          </div>
        ) : (
          paginatedPosts.map((post) => <MyPostCard key={post.id} post={post} />)
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

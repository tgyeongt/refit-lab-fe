"use client";

import { useState } from "react";
import useHeader from "@/shared/hooks/useHeader";
import { MyPostCard } from "./(component)/MyPostCard";
import { Pagination } from "@/shared/components/Pagination";
import { useMyPosts } from "./(hook)/query/useMyPosts";

const ITEMS_PER_PAGE = 4;

// 내 경험 공유글 페이지
export default function ExperiencePostsPage() {
  useHeader({ title: "내 경험 공유글", showBack: true, showMenu: false });
  const [currentPage, setCurrentPage] = useState(1);

  const { posts, pagination, isLoading, error } = useMyPosts(
    currentPage - 1,
    ITEMS_PER_PAGE
  );

  const totalPages = pagination?.totalPages ?? 1;

  return (
    <main className="min-h-screen bg-gray-1">
      {/* 글 목록 */}
      <div className="px-[20px] space-y-[15px] pb-6 pt-10">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">
              공유한 글을 불러오는 중입니다...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">
              공유한 글을 불러오는데 실패했습니다.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">공유한 글이 없습니다.</p>
            <p className="text-gray-6 text-sm mt-2">
              커뮤니티에서 경험을 공유해보세요!
            </p>
          </div>
        ) : (
          posts.map((post) => <MyPostCard key={post.id} post={post} />)
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

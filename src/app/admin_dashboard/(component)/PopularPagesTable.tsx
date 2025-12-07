"use client";

import type { PopularPage } from "@/shared/types/admin";

// 인기 페이지 테이블 Props
interface PopularPagesTableProps {
  pages: PopularPage[];
}

// 인기 페이지 테이블 컴포넌트
export const PopularPagesTable = ({ pages }: PopularPagesTableProps) => {
  return (
    <div className="rounded-lg pb-5.5">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-1 border-b border-[#A772CD] w-full">
        <span className="text-[13px] text-purple2 font-normal">
          사용 중인 인기 페이지
        </span>
        <span className="text-[13px] text-purple2 font-normal">
          활성 사용자
        </span>
      </div>

      {/* 테이블 행 */}
      <div className="space-y-0">
        {pages.map((page, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-[10px] border-b border-[#A772CD] last:border-b-0"
          >
            <span className="text-[13px] text-white font-normal">
              {page.path}
            </span>
            <span className="text-[13px] text-white font-normal">
              {page.activeUsers}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

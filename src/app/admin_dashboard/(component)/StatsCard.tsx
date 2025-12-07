"use client";

import { PopularPage } from "@/shared/types/admin";
import { PopularPagesTable } from "./PopularPagesTable";

// 통계 카드 Props
interface StatsCardProps {
  currentActiveUsers: number;
  popularPages: PopularPage[];
}

// 통계 카드 컴포넌트 (보라색 배경)
export const StatsCard = ({
  currentActiveUsers,
  popularPages,
}: StatsCardProps) => {
  return (
    <div className="bg-purple rounded-lg p-11 shadow-md">
      {/* 타이틀 & 메인 숫자 */}
      <div className="mb-9">
        <h3 className="text-xl font-medium text-white mb-4">
          현재 활성 이용자
        </h3>
        <p className="text-[64px] font-medium text-white leading-none">
          {currentActiveUsers}
        </p>
      </div>
      {/* 인기 페이지 테이블 */}
      <PopularPagesTable pages={popularPages} />
    </div>
  );
};

"use client";

import { useAdminDashboardQuery } from "./(hook)/useAdminDashboardQuery";
import { StatsCard } from "./(component)/StatsCard";
import { UserActivityChart } from "./(component)/UserActivityChart";
import { QuickAccessCards } from "./(component)/QuickAccessCards";

// 관리자 대시보드 홈 페이지
export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useAdminDashboardQuery();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-6 text-lg">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">데이터 로드 실패</p>
          <p className="text-gray-6">통계 데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 다시입다연구소 라벨 */}
      <p className="text-2xl font-medium text-gray-6 mb-4.5">다시입다연구소</p>
      <div className="space-y-12">
        {/* 통계 카드 & 차트 영역 */}
        <div className="grid grid-cols-[680px_1fr] gap-7">
          {/* 차트 & 인기 페이지 테이블 */}
          <div className="space-y-7">
            {/* 라인 차트 */}
            <UserActivityChart
              data={data.chartData}
              totalUsers={data.totalUsers}
              totalExchanges={data.totalExchanges}
              exchangesChange={data.exchangesChange}
              usersChange={data.usersChange}
            />
          </div>
          {/* 통계 카드 */}
          <StatsCard
            currentActiveUsers={data.currentActiveUsers}
            popularPages={data.popularPages}
          />
        </div>

        {/* 빠른 접근 카드 */}
        <QuickAccessCards cards={data.quickAccessCards} />
      </div>
    </>
  );
}

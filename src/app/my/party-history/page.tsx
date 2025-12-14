"use client";

import { useState, useEffect } from "react";
import useHeader from "@/shared/hooks/useHeader";
import { PartyHistoryCard } from "./(component)/PartyHistoryCard";
import { Pagination } from "@/shared/components/Pagination";
import { usePartyHistoryInfo } from "@/shared/stores/usePartyHistoryStore";
import { MOCK_PARTY_HISTORY } from "./(dummy)/partyHistoryData";

const ITEMS_PER_PAGE = 4;

// 참가한 21% 파티 페이지
export default function PartyHistoryPage() {
  useHeader({ title: "참가한 행사", showBack: true, showMenu: true });
  const [currentPage, setCurrentPage] = useState(1);
  const { reservedEvents } = usePartyHistoryInfo();

  // 실제 환경에서는 reservedEvents 사용, 개발 중에는 Mock 데이터 사용
  const events = reservedEvents.length > 0 ? reservedEvents : MOCK_PARTY_HISTORY;

  // 최신순 정렬 (날짜 기준)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date || "").getTime();
    const dateB = new Date(b.date || "").getTime();
    return dateB - dateA;
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 페이지 변경 시 스크롤 최상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-gray-1">
      {/* 행사 목록 */}
      <div className="px-[15px] space-y-[15px] pb-6 pt-10">
        {paginatedEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">
              참가한 행사가 없습니다.
            </p>
            <p className="text-gray-6 text-sm mt-2">
              행사 예약 후 이곳에서 확인하세요.
            </p>
          </div>
        ) : (
          paginatedEvents.map((event) => (
            <PartyHistoryCard key={event.eventId} event={event} />
          ))
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


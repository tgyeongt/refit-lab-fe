"use client";

import { useState, useEffect } from "react";
import useHeader from "@/shared/hooks/useHeader";
import { PartyHistoryCard } from "./(component)/PartyHistoryCard";
import { Pagination } from "@/shared/components/Pagination";
import { useJoinedEvents } from "./(hook)/query/useJoinedEvents";

const ITEMS_PER_PAGE = 4;

// 참가한 21% 파티 페이지
export default function PartyHistoryPage() {
  useHeader({ title: "참가한 행사", showBack: true, showMenu: true });
  const [currentPage, setCurrentPage] = useState(1);

  const { events, pagination, isLoading, error } = useJoinedEvents(
    currentPage - 1,
    ITEMS_PER_PAGE
  );

  const totalPages = pagination?.totalPages ?? 1;

  // 페이지 변경 시 스크롤 최상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-gray-1">
      <div className="px-[15px] space-y-[15px] pb-6 pt-10">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">
              참가한 파티를 불러오는 중입니다...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">
              참가한 파티 정보를 불러오는데 실패했습니다.
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-5A text-base">참가한 파티가 없습니다.</p>
            <p className="text-gray-6 text-sm mt-2">
              행사 예약 후 이곳에서 확인하세요.
            </p>
          </div>
        ) : (
          events.map((event) => (
            <PartyHistoryCard key={event.eventId} event={event} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}



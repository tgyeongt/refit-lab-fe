"use client";

import { useState } from "react";
import useHeader from "@/shared/hooks/useHeader";
import { TicketCard } from "./(component)/TicketCard";
import { TicketDetailModal } from "./(component)/TicketDetailModal";
import { MOCK_TICKETS } from "./(dummy)/ticketData";
import { clsx } from "clsx";

const ITEMS_PER_PAGE = 4;

// 보유 티켓 페이지
export default function MyTicketsPage() {
  useHeader({ title: "나의 티켓", showBack: true, showMenu: true });
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 티켓 (정렬: 사용 가능 우선)
  const sortedTickets = [...MOCK_TICKETS].sort((a, b) => {
    const priority = { upcoming: 1, used: 2, expired: 3 };
    return priority[a.status] - priority[b.status];
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedTickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = sortedTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <main className="min-h-screen bg-gray-1">
        {/* 티켓 목록 */}
        <div className="px-[17px] space-y-[15px] pb-6 pt-10">
          {paginatedTickets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-5A text-base">보유한 티켓이 없습니다.</p>
            </div>
          ) : (
            paginatedTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          )}
        </div>

        {/* 페이지네이션 (숫자) */}
        <div className="flex items-center justify-center gap-3 py-5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={clsx("text-sm transition-colors tracking-[-0.5px]", {
                "text-gray-5A font-semibold": currentPage === page,
                "text-gray-6 font-medium": currentPage !== page,
              })}
            >
              {page}
            </button>
          ))}
        </div>
      </main>

      {/* 티켓 상세 모달 */}
      <TicketDetailModal />
    </>
  );
}

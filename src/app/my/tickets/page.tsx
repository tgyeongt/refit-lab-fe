"use client";

import { useState } from "react";
import useHeader from "@/shared/hooks/useHeader";
import { TicketCard } from "./(component)/TicketCard";
import { TicketDetailModal } from "./(component)/TicketDetailModal";
import { Pagination } from "@/shared/components/Pagination";
import { useMyTickets } from "./(hook)/query/useMyTickets";

const ITEMS_PER_PAGE = 4;

// 보유 티켓 페이지
export default function MyTicketsPage() {
  useHeader({ title: "나의 티켓", showBack: true, showMenu: true });
  const [currentPage, setCurrentPage] = useState(1);

  // 서버에서 티켓 목록 조회 (페이지 번호는 0부터 시작)
  const { tickets, pagination, isLoading, error } = useMyTickets(
    currentPage - 1,
    ITEMS_PER_PAGE
  );

  // 전체 페이지 수 (백엔드 페이징 사용)
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <>
      <main className="min-h-screen bg-gray-1">
        {/* 티켓 목록 */}
        <div className="px-[17px] space-y-[15px] pb-6 pt-10">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-gray-5A text-base">
                티켓을 불러오는 중입니다...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-gray-5A text-base">
                티켓 정보를 불러오는데 실패했습니다.
              </p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-5A text-base">보유한 티켓이 없습니다.</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
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

      {/* 티켓 상세 모달 */}
      <TicketDetailModal />
    </>
  );
}

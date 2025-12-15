"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchSection } from "./(component)/SearchSection";
import { NewPartyButton } from "./(component)/NewPartyButton";
import { PartyRegistrationTable } from "./(component)/PartyRegistrationTable";
import { PartyStatus } from "./(types)/party";
import { useAdminEvents } from "./(hook)/useAdminEvents";
import { useDeleteAdminEvent } from "./(hook)/mutation/useDeleteAdminEvent";

// 행사 등록 페이지
export default function PartyReservationPage() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<"all" | PartyStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // API status 매핑
  const statusToApiStatus = (
    status: "all" | PartyStatus
  ): "UPCOMING" | "ONGOING" | "ENDED" | undefined => {
    switch (status) {
      case "scheduled":
        return "UPCOMING";
      case "ongoing":
        return "ONGOING";
      case "completed":
        return "ENDED";
      default:
        return undefined; // 전체
    }
  };

  const { parties, pagination, isLoading, error } = useAdminEvents({
    page: currentPage - 1, // API는 0-based
    size: itemsPerPage,
    status: statusToApiStatus(activeStatus),
    q: searchTerm || undefined,
  });

  const totalPages = pagination?.totalPages ?? 1;

  // 상태별 카운트 (단일 API로는 전체 집계가 어려워 우선 동일 값 사용)
  const total = pagination?.totalElements ?? 0;
  const { mutate: deleteEvent } = useDeleteAdminEvent();

  const counts = {
    all: total,
    scheduled: total,
    ongoing: total,
    completed: total,
  };

  // 핸들러
  const handleNewParty = () => {
    router.push("/admin_dashboard/party_reservation/new_post");
  };

  const handleEdit = (id: string) => {
    console.log("수정:", id);
    // TODO: 행사 수정 모달/페이지 열기
  };

  const handleDelete = (id: string) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("해당 행사를 삭제하시겠습니까?");
      if (!confirmed) return;
    }
    deleteEvent(id);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: "all" | PartyStatus) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* 페이지 제목 */}
      <h1 className="text-2xl font-medium text-purple mb-2.5">행사등록</h1>

      {/* 검색 섹션 */}
      <SearchSection
        onSearch={handleSearch}
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
        counts={counts}
      />

      {/* 버튼 섹션 */}
      <div className="flex items-end justify-between mt-14 mb-4">
        <div className="flex gap-4.5 text-base font-medium text-gray-5A">
          전체{" "}
          <span className="text-purple">
            {pagination?.totalElements ?? 0}건
          </span>
        </div>
        <NewPartyButton onClick={handleNewParty} />
      </div>

      {/* 테이블 */}
      <PartyRegistrationTable
        parties={parties}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

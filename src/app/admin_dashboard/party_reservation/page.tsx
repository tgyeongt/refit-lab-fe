"use client";

import { useState, useMemo } from "react";
import { SearchSection } from "./(component)/SearchSection";
import { StatusFilter } from "./(component)/StatusFilter";
import { NewPartyButton } from "./(component)/NewPartyButton";
import { PartyRegistrationTable } from "./(component)/PartyRegistrationTable";
import { Pagination } from "./(component)/Pagination";
import { PARTY_MOCK_DATA } from "./(dummy)/partyData";
import { PartyStatus } from "./(types)/party";

// 행사 등록 페이지
export default function PartyReservationPage() {
  const [activeStatus, setActiveStatus] = useState<"all" | PartyStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 필터링된 데이터
  const filteredParties = useMemo(() => {
    let filtered = PARTY_MOCK_DATA;

    // 상태 필터
    if (activeStatus !== "all") {
      filtered = filtered.filter((party) => party.status === activeStatus);
    }

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(
        (party) =>
          party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          party.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeStatus, searchTerm]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredParties.length / itemsPerPage);
  const paginatedParties = filteredParties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 상태별 카운트
  const counts = useMemo(() => {
    return {
      all: PARTY_MOCK_DATA.length,
      scheduled: PARTY_MOCK_DATA.filter((p) => p.status === "scheduled").length,
      ongoing: PARTY_MOCK_DATA.filter((p) => p.status === "ongoing").length,
      completed: PARTY_MOCK_DATA.filter((p) => p.status === "completed").length,
    };
  }, []);

  // 핸들러
  const handleNewParty = () => {
    console.log("신규 행사 등록");
    // TODO: 신규 행사 등록 모달/페이지 열기
  };

  const handleEdit = (id: string) => {
    console.log("수정:", id);
    // TODO: 행사 수정 모달/페이지 열기
  };

  const handleDelete = (id: string) => {
    console.log("삭제:", id);
    // TODO: 삭제 확인 모달 열기
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
      <h1 className="text-2xl font-medium text-purple mb-8">행사등록</h1>

      {/* 검색 섹션 */}
      <SearchSection onSearch={handleSearch} />

      {/* 구분선 */}
      <div className="border-t border-gray-6 mb-4" />

      {/* 필터 & 버튼 섹션 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-base font-medium text-black">
            전체 <span className="text-purple">{counts.all}건</span>
          </div>
          <StatusFilter
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
            counts={counts}
          />
        </div>
        <NewPartyButton onClick={handleNewParty} />
      </div>

      {/* 테이블 */}
      <PartyRegistrationTable
        parties={paginatedParties}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}


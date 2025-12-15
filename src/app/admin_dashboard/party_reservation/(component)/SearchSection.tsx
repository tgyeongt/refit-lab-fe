"use client";

import { useState } from "react";
import { StatusFilter } from "./StatusFilter";
import { PartyStatus } from "../(types)/party";

interface SearchSectionProps {
  onSearch?: (searchTerm: string) => void;
  activeStatus: "all" | PartyStatus;
  onStatusChange: (status: "all" | PartyStatus) => void;
  counts: {
    all: number;
    scheduled: number;
    ongoing: number;
    completed: number;
  };
}

// 검색 섹션 컴포넌트
export const SearchSection = ({
  onSearch,
  activeStatus,
  onStatusChange,
  counts,
}: SearchSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <div className="bg-white rounded shadow-md px-7 py-3 mb-4">
      <form onSubmit={handleSearch}>
        <div className="flex gap-14.5 items-center">
          <label className="font-semibold">검색 옵션</label>
          {/* TODO: 실제 검색 옵션 드롭다운 추가 가능 */}
          <StatusFilter
            activeStatus={activeStatus}
            onStatusChange={onStatusChange}
            counts={counts}
          />
        </div>
        {/* 구분선 */}
        <div className="border-t border-gray-6 mt-3" />

        <div className="flex items-center gap-6 pt-3">
          <label className="block text-base font-semibold w-20">검색명</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력해주세요"
            className="w-full px-2 rounded focus:outline-purple"
          />
        </div>
      </form>
    </div>
  );
};

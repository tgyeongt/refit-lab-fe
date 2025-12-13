"use client";

import { useState } from "react";

interface SearchSectionProps {
  onSearch?: (searchTerm: string) => void;
}

// 검색 섹션 컴포넌트
export const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <div className="bg-white rounded shadow-md p-6 mb-4">
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label className="block text-base font-semibold mb-2">
            검색 옵션
          </label>
          {/* TODO: 실제 검색 옵션 드롭다운 추가 가능 */}
        </div>

        <div>
          <label className="block text-base font-semibold mb-2">검색명</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력해주세요"
            className="w-full px-4 py-2 border border-gray-5 rounded focus:outline-none focus:border-purple"
          />
        </div>
      </form>
    </div>
  );
};


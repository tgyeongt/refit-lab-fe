"use client";

import { Party } from "../(types)/party";
import { PartyTableRow } from "./PartyTableRow";
import { Pagination } from "./Pagination";

interface PartyRegistrationTableProps {
  parties: Party[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 행사 등록 테이블 컴포넌트
export const PartyRegistrationTable = ({
  parties,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}: PartyRegistrationTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden px-6 py-4">
      {/* 테이블 헤더 */}
      <div className="mb-7">
        <h2 className="text-base font-medium text-[#0A0A0A]">행사 관리</h2>
        <p className="text-base text-[#717182] mt-0.5">
          행사 목록을 확인하고 새로운 행사를 등록하세요
        </p>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-5">
            <tr className="h-10">
              <th className="px-2 text-left text-sm font-medium text-black">
                행사명
              </th>
              <th className="px-2 text-left text-sm font-medium text-black">
                날짜
              </th>
              <th className="px-2 text-left text-sm font-medium text-black">
                장소
              </th>
              <th className="px-2 text-left text-sm font-medium text-black">
                예약 현황
              </th>
              <th className="px-2 text-left text-sm font-medium text-black">
                상태
              </th>
              <th className="px-2"></th>
            </tr>
          </thead>
          <tbody>
            {parties.map((party) => (
              <PartyTableRow
                key={party.id}
                party={party}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

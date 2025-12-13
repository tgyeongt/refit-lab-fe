"use client";

import {
  Party,
  PARTY_STATUS_LABEL,
  PARTY_STATUS_STYLES,
} from "../(types)/party";

interface PartyTableRowProps {
  party: Party;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// 행사 테이블 행 컴포넌트
export const PartyTableRow = ({
  party,
  onEdit,
  onDelete,
}: PartyTableRowProps) => {
  const statusStyle = PARTY_STATUS_STYLES[party.status];

  return (
    <tr className="border-b border-gray-6 h-[49px]">
      {/* 행사명 */}
      <td className="px-2">
        <div className="flex items-center gap-2">
          {/* TODO: 캘린더 아이콘 SVG 추가 */}
          <div className="w-4 h-4 text-gray-5A">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.67 2.63h11.33v12.75H2.67z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-sm">{party.name}</span>
        </div>
      </td>

      {/* 날짜 */}
      <td className="px-2">
        <span className="text-sm">{party.date}</span>
      </td>

      {/* 장소 */}
      <td className="px-2">
        <div className="flex items-center gap-2">
          {/* TODO: 위치 아이콘 SVG 추가 */}
          <div className="w-4 h-4 text-gray-5A">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8"
                cy="6"
                r="2"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M2.67 6.33c0-2.95 2.39-5.33 5.33-5.33s5.33 2.39 5.33 5.33c0 4-5.33 8.67-5.33 8.67S2.67 10.33 2.67 6.33z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-sm">{party.location}</span>
        </div>
      </td>

      {/* 예약 현황 */}
      <td className="px-2">
        <div className="flex items-center gap-2">
          {/* TODO: 차트 아이콘 SVG 추가 */}
          <div className="w-4 h-4 text-gray-5A">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33 10h9.33M10.67 2.08v5.16M12.67 10.09v3.91M3.33 2v5.33"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-sm">
            {party.currentReservations} / {party.maxReservations}
          </span>
        </div>
      </td>

      {/* 상태 */}
      <td className="px-2">
        <div
          className="inline-flex items-center justify-center px-2.5 py-2.5 rounded h-[22px]"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          <span className="text-xs font-medium">
            {PARTY_STATUS_LABEL[party.status]}
          </span>
        </div>
      </td>

      {/* 액션 */}
      <td className="px-2">
        <div className="flex items-center justify-end gap-2">
          {/* 수정 버튼 */}
          <button
            onClick={() => onEdit?.(party.id)}
            className="w-9 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
            aria-label="수정"
          >
            {/* TODO: 수정 아이콘 SVG 추가 */}
            <div className="w-4 h-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 2L14 5L5 14H2V11L11 2Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </button>

          {/* 삭제 버튼 */}
          <button
            onClick={() => onDelete?.(party.id)}
            className="w-9 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
            aria-label="삭제"
          >
            {/* TODO: 삭제 아이콘 SVG 추가 */}
            <div className="w-4 h-4 text-red">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.67 7.33v4M9.33 7.33v4M3.33 4v10.67h9.33V4M2 4h12M5.33 1.33h5.33V4H5.33z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

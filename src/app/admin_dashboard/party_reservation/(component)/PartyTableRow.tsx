"use client";

import Icon from "@/shared/components/Icon";
import {
  Party,
  PARTY_STATUS_LABEL,
  PARTY_STATUS_STYLES,
} from "../(types)/party";
import PinIcon from "@/assets/icon/pin.svg";
import PeopleIcon from "@/assets/icon/people.svg";
import CalendarIcon from "@/assets/icon/calendar.svg";
import EditIcon from "@/assets/icon/write.svg";
import TrashIcon from "@/assets/icon/trash.svg";
import { formatDate } from "@/shared/util/formatDate";

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
          <div className="w-4 h-4 text-gray-5A">
            <Icon icon={CalendarIcon} width={16} height={16} color="#9E9E9E" />
          </div>
          <span className="text-sm truncate max-w-[300px]">{party.name}</span>
        </div>
      </td>

      {/* 날짜 */}
      <td className="px-2">
        <span className="text-sm">{formatDate(party.date)}</span>
      </td>

      {/* 장소 */}
      <td className="px-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-gray-5A">
            <Icon icon={PinIcon} width={16} height={16} color="#9E9E9E" />
          </div>
          <span className="text-sm truncate max-w-[150px]">
            {party.location}
          </span>
        </div>
      </td>

      {/* 예약 현황 */}
      <td className="px-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-gray-5A">
            <Icon icon={PeopleIcon} color="#9E9E9E" />
          </div>
          <span className="text-sm">
            {party.currentReservations} /{" "}
            {party.maxReservations != null ? party.maxReservations : "미정"}
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
            <div className="w-4 h-4">
              <Icon icon={EditIcon} width={16} height={16} color="#9E9E9E" />
            </div>
          </button>

          {/* 삭제 버튼 */}
          <button
            onClick={() => onDelete?.(party.id)}
            className="w-9 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
            aria-label="삭제"
          >
            <div className="w-4 h-4 text-red">
              <Icon icon={TrashIcon} width={16} height={16} color="#E42938" />
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

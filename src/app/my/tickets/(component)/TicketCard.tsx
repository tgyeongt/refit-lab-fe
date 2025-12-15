"use client";

import { Ticket } from "../(types)/ticket";
import Icon from "@/shared/components/Icon";
import QRIcon from "@/assets/icon/QR.svg";
import CalendarIcon from "@/assets/icon/calendar.svg";
import { useModalActions } from "@/shared/stores/useModalStore";
import { formatDate } from "@/shared/util/formatDate";

interface TicketCardProps {
  ticket: Ticket;
}

// 티켓 상태 라벨
const STATUS_LABELS = {
  upcoming: "사용 가능",
  used: "사용 완료",
  expired: "기간 만료",
};

// 티켓 상태 배경색
const STATUS_BG_COLORS = {
  upcoming: "#A772CD",
  used: "#9E9E9E",
  expired: "#9E9E9E",
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const { openModal } = useModalActions();

  const handleClick = () => {
    openModal("ticket-detail", { ticket });
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-white rounded-lg overflow-hidden cursor-pointer"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex h-[150px]">
        {/* 왼쪽: 티켓 정보 */}
        <div className="flex-1 p-[21px] flex flex-col justify-between ">
          {/* 제목 */}
          <div>
            <h3 className="text-[20px] font-semibold text-purple leading-[20px] mb-[5px] line-clamp-2">
              {ticket.eventName}
            </h3>
            <p className="text-base font-light text-gray-5A leading-[20px] mb-2 line-clamp-1">
              {ticket.location}
            </p>
          </div>

          {/* 하단: 유효기간 */}
          <div className="flex items-center gap-[5px]">
            <Icon icon={CalendarIcon} width={16} height={16} color="#9E9E9E" />
            <span className="text-sm font-medium text-gray-6 leading-[20px]">
              유효기간: {formatDate(ticket.eventDate)}
            </span>
          </div>

          {/* 부가 설명 */}
          <p className="text-[13px] font-normal text-gray-6 leading-[20px]">
            {"교환 예정"}
          </p>
        </div>

        {/* 오른쪽: QR & 상태 */}
        <div
          className="w-[100px] flex flex-col items-center justify-center gap-[3px]"
          style={{ backgroundColor: STATUS_BG_COLORS[ticket.status] }}
        >
          <Icon icon={QRIcon} width={24} height={24} color="#FFFFFF" />
          <span className="text-[13px] font-normal text-white leading-[20px] text-center">
            {STATUS_LABELS[ticket.status]}
          </span>
        </div>
      </div>
    </div>
  );
};

"use client";

import Icon from "@/shared/components/Icon";
import TicketIcon from "@/assets/icon/ticket.svg";
import { mypageStyles } from "../(util)/mypage-styles";

interface TicketBadgeProps {
  count?: number;
  onClick?: () => void;
}

export const TicketBadge = ({ count, onClick }: TicketBadgeProps) => {
  return (
    <div
      className={`${mypageStyles.badges.ticket} ${
        onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
      }`}
      onClick={onClick}
    >
      <Icon
        icon={TicketIcon}
        color="#642C8D"
        width={20}
        height={20}
        strokeWidth={1.5}
        className="translate-y-[px]"
      />
      <span className={mypageStyles.badges.ticketText}>보유 티켓</span>
    </div>
  );
};

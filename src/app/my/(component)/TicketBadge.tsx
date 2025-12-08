"use client";

import Icon from "@/shared/components/Icon";
import TicketIcon from "@/assets/icon/ticket.svg";
import { mypageStyles } from "../(util)/mypage-styles";

interface TicketBadgeProps {
  count?: number;
}

export const TicketBadge = ({ count }: TicketBadgeProps) => {
  return (
    <div className={mypageStyles.badges.ticket}>
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

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
        width={24}
        height={24}
        className="translate-y-[2px]"
      />
      <span className={mypageStyles.badges.ticketText}>보유 티켓</span>
    </div>
  );
};

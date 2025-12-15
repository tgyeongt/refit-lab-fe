"use client";

import Link from "next/link";
import type { QuickAccessCard } from "@/shared/types/admin";
import TagIcon from "@/assets/icon/ticket.svg";
import PartyReservIcon from "@/assets/icon/party-reserv.svg";
import QRCodeIcon from "@/assets/icon/QR.svg";
import CommunityIcon from "@/assets/icon/community.svg";
import Icon from "@/shared/components/Icon";

type QuickAccessIconName = "party" | "tag" | "qr" | "community";

const QUICK_ACCESS_ICON_COMPONENTS: Record<
  QuickAccessIconName,
  typeof PartyReservIcon
> = {
  tag: TagIcon,
  party: PartyReservIcon,
  qr: QRCodeIcon,
  community: CommunityIcon,
};

interface QuickAccessCardProps {
  icon: QuickAccessIconName;
}

// 아이콘 컴포넌트
const CardIcon = ({ icon }: QuickAccessCardProps) => {
  const CardIconComponent = QUICK_ACCESS_ICON_COMPONENTS[icon];

  if (!CardIconComponent) return null;

  return (
    <Icon
      icon={CardIconComponent}
      width={22}
      height={22}
      strokeWidth={2}
      color="#757575"
    />
  );
};

// 빠른 접근 카드 컴포넌트
export const QuickAccessCards = ({ cards }: { cards: QuickAccessCard[] }) => {
  return (
    <div className="grid grid-cols-4 gap-7 shrink-0">
      {cards.map((card) => {
        const href =
          card.title === "행사 등록 및 예약 관리"
            ? "/admin_dashboard/party_reservation"
            : card.link;

        return (
        <Link
          key={card.id}
            href={href}
            className="block bg-white rounded-[18px] py-9 px-6 shadow-md hover:shadow-lg transition-shadow duration-150 min-w-[225px] min-h-[245px]"
        >
          <div className="flex justify-between items-start mb-5">
            {/* 타이틀 */}
            <h3 className="text-lg font-semibold text-black whitespace-pre-line leading-snug">
              {card.title}
            </h3>

            {/* 아이콘 */}
            <div className="mb-4 mr-4">
              <CardIcon icon={card.icon as QuickAccessIconName} />
            </div>
          </div>

          {/* 설명 */}
          <p className="text-base text-gray-7 mb-7 whitespace-pre-line leading-relaxed">
            {card.description}
          </p>

          {/* 상태 */}
          <p className="text-sm text-gray-6">{card.status}</p>
        </Link>
        );
      })}
    </div>
  );
};

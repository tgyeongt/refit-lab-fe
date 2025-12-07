"use client";

import Link from "next/link";
import type { QuickAccessCard } from "@/shared/types/admin";
import TagIcon from "@/assets/icon/circle-exchange.svg";

/**
 * 아이콘 컴포넌트
 */
const CardIcon = ({ icon }: { icon: string }) => {
  // Tag 아이콘
  if (icon === "tag") {
    return <TagIcon className="w-6 h-6" />;
  }

  // Event 아이콘 (캘린더)
  if (icon === "event") {
    return (
      <svg className="w-[18px] h-5" viewBox="0 0 18 20" fill="none">
        <path
          d="M5 0V4M13 0V4"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="0"
          y="2"
          width="18"
          height="18"
          rx="2"
          stroke="#424242"
          strokeWidth="2"
          fill="none"
        />
        <path d="M0 8H18" stroke="#424242" strokeWidth="2" />
      </svg>
    );
  }

  // QR 아이콘
  if (icon === "qr") {
    return (
      <svg className="w-[21px] h-[21px]" viewBox="0 0 21 21" fill="none">
        <rect x="2.63" y="2.63" width="4.37" height="4.37" fill="#424242" />
        <rect x="14" y="2.63" width="4.37" height="4.37" fill="#424242" />
        <rect x="2.63" y="14" width="4.37" height="4.37" fill="#424242" />
        <rect x="14" y="14" width="4.37" height="4.37" fill="#424242" />
        <rect x="6.13" y="6.13" width="4.37" height="4.37" fill="#424242" />
      </svg>
    );
  }

  // Community 아이콘
  if (icon === "community") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path
          d="M1.67 12.5L10 2.5L18.33 12.5"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.17 2.5H6.67V6.67"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <div className="w-5 h-5 bg-gray-5 rounded" />;
};

/**
 * 빠른 접근 카드 컴포넌트
 */
export const QuickAccessCards = ({ cards }: { cards: QuickAccessCard[] }) => {
  return (
    <div className="grid grid-cols-4 gap-7">
      {cards.map((card) => (
        <Link
          key={card.id}
          href={card.link}
          className="block bg-white rounded-[18px] p-7 shadow-md hover:shadow-lg transition-shadow"
        >
          {/* 아이콘 */}
          <div className="flex justify-end mb-4">
            <CardIcon icon={card.icon} />
          </div>

          {/* 타이틀 */}
          <h3 className="text-lg font-semibold text-black mb-3 whitespace-pre-line leading-snug">
            {card.title}
          </h3>

          {/* 설명 */}
          <p className="text-base text-gray-7 mb-7 whitespace-pre-line leading-relaxed">
            {card.description}
          </p>

          {/* 상태 */}
          <p className="text-sm text-gray-6">{card.status}</p>
        </Link>
      ))}
    </div>
  );
};


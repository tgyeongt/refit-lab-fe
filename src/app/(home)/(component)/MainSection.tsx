"use client";

import { useEffect, useState } from "react";
import MainCard from "./MainCard";
import DummyImg from "@/assets/image/Profile.png";
import { useUpcomingEvents } from "@/app/event/(hook)/query/useUpcomingEvents";
import type { MainCardProps } from "./MainCard";

export default function MainSection() {
  const [index, setIndex] = useState(0);
  const { data: upcomingEvents = [], isLoading } = useUpcomingEvents();

  // API 데이터 → 메인 카드용 데이터로 매핑
  const apiCards: MainCardProps[] = upcomingEvents.map((event) => ({
    dday: String(event.dday),
    title: event.name,
    location: event.location,
    image: event.thumbnailUrl || DummyImg,
  }));

  // API 데이터가 있으면 그것을 사용, 없으면 기존 mockCards 사용
  const cards: MainCardProps[] = apiCards.length > 0 ? apiCards : mockCards;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [cards.length]);

  return (
    <div className="relative w-full overflow-hidden mt-5">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {cards.map((card, i) => (
          <div key={i} className="min-w-full px-4">
            <MainCard
              dday={card.dday}
              title={card.title}
              location={card.location}
              image={card.image}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-8 px-3 py-1 bg-black/50 text-white text-xs rounded-full">
        {index + 1}/{cards.length}
      </div>
    </div>
  );
}

// 기존 UI 유지를 위한 기본 mock 카드 데이터
const mockCards: MainCardProps[] = [
  {
    dday: "5",
    title: "겨울 의류 나눔 행사",
    location: "서울 성동구",
    image: DummyImg,
  },
  {
    dday: "10",
    title: "지구를 위한 21% 파티",
    location: "서울 성수동",
    image: DummyImg,
  },
  {
    dday: "15",
    title: "수선 워크숍",
    location: "서울 종로구",
    image: DummyImg,
  },
];

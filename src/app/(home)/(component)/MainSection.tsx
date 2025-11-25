"use client";

import { useEffect, useState } from "react";
import MainCard from "./MainCard";

const mockCards = [
  {
    dday: "D-3",
    title: "청바지 리폼 클래스",
    location: "서울 성동구",
    image: "/images/banner1.png",
  },
  {
    dday: "D-10",
    title: "업사이클링 워크숍",
    location: "서울 마포구",
    image: "/images/banner2.png",
  },
  {
    dday: "D-1",
    title: "헌옷 기부 캠페인",
    location: "부산 해운대",
    image: "/images/banner3.png",
  },
];

export default function MainSection() {
  const [index, setIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mockCards.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-5">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {mockCards.map((card, i) => (
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

      {/* 우측 하단 1/5 표시 */}
      <div className="absolute bottom-4 right-6 px-3 py-1 bg-black/50 text-white text-xs rounded-full">
        {index + 1}/{mockCards.length}
      </div>
    </div>
  );
}

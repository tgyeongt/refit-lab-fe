"use client";

import { useEffect, useState } from "react";
import MainCard from "./MainCard";
import DummyImg from "@/assets/image/Profile.png";

const mockCards = [
  {
    dday: "3",
    title: "2025 파타고니아 퀄리티랩",
    location: "서울 성동구",
    image: DummyImg,
  },
  {
    dday: "10",
    title: "업사이클링 워크숍",
    location: "서울 마포구",
    image: DummyImg,
  },
  {
    dday: "1",
    title: "헌옷 기부 캠페인",
    location: "부산 해운대",
    image: DummyImg,
  },
];

export default function MainSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mockCards.length);
    }, 3000);

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

      <div className="absolute bottom-4 right-8 px-3 py-1 bg-black/50 text-white text-xs rounded-full">
        {index + 1}/{mockCards.length}
      </div>
    </div>
  );
}

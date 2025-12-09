"use client";

import { useState } from "react";

import FilterBar from "./FilterBar";
import RecommendCard from "./RecommendCard";
import { recommendData } from "../(dummy)/recommendData";

export default function RecommendSection() {
  const [activeTab, setActiveTab] = useState("아우터");
  const items = recommendData[activeTab] || [];

  return (
    <div className="my-[30px]">
      <p className="font-semibold text-[20px] px-[20px]">
        김재생 님에게 꼭 맞는 맞춤 추천
      </p>

      <FilterBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="overflow-x-auto bg-[#642C8D] px-[20px]">
        <div className="flex gap-[15px] py-[20px] min-w-max">
          {items.map((item) => (
            <RecommendCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

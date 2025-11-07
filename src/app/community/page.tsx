"use client";

import { useState } from "react";
import Content from "./Content";
import FilterBar from "./FilterBar";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<string>("전체");

  return (
    <div className="px-[20px]">
      <FilterBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content activeTab={activeTab} />
    </div>
  );
}

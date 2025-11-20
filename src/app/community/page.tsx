"use client";

import { useState } from "react";
import Content from "./(component)/Content";
import FilterBar from "./(component)/FilterBar";
import useHeader from "@/shared/hooks/useHeader";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<string>("전체");

  useHeader({
    showBack: false,
    showMenu: true,
  });

  return (
    <div className="px-[20px]">
      <FilterBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content activeTab={activeTab} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Content from "./(component)/Content";
import FilterBar from "./(component)/FilterBar";
import FloatingPostButton from "./(component)/FloatingPostButton";
import useHeader from "@/shared/hooks/useHeader";

export default function CommunityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("전체");

  useHeader({
    showBack: false,
    showMenu: true,
  });

  const handlePostClick = () => {
    router.push("/community/post");
  };

  return (
    <div className="px-[20px]">
      <FilterBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content activeTab={activeTab} />
      <FloatingPostButton onClick={handlePostClick} />
    </div>
  );
}

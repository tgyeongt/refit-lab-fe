"use client";

import useHeader from "@/shared/hooks/useHeader";
import ExchangeSection from "./(component)/ExchangeSection";
import RecommendSection from "./(component)/RecommendSection";
import RecentSection from "./(component)/RecentSection";

export default function CommunityPage() {
  useHeader({
    showBack: false,
    showMenu: true,
  });

  return (
    <div>
      <ExchangeSection />
      <RecommendSection />
      <RecentSection />
    </div>
  );
}

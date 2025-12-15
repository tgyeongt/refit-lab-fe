"use client";

import useHeader from "@/shared/hooks/useHeader";
import ExchangeSection from "./(component)/ExchangeSection";
import RecommendSection from "./(component)/RecommendSection";
import LocalSection from "./(component)/LocalSection";

export default function ExchangePage() {
  useHeader({
    showBack: false,
    showMenu: true,
  });

  return (
    <div>
      <ExchangeSection />
      <RecommendSection />
      <LocalSection />
    </div>
  );
}

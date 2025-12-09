"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import ExchangeSection from "./(component)/ExchangeSection";

export default function CommunityPage() {
  const router = useRouter();

  useHeader({
    showBack: false,
    showMenu: true,
  });

  return (
    <div className="px-[20px]">
      <ExchangeSection />
    </div>
  );
}

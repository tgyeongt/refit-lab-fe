"use client";

import useHeader from "@/shared/hooks/useHeader";

export default function ExchangeLocalPage() {
  useHeader({
    showBack: true,
    showMenu: true,
  });

  return <div>내 주변 옷 보러가기 페이지</div>;
}

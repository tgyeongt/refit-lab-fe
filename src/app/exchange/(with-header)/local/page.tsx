"use client";

import useHeader from "@/shared/hooks/useHeader";
import NotFound from "@/shared/components/NotFound";

export default function ExchangeLocalPage() {
  useHeader({
    showBack: true,
    showMenu: true,
  });

  return (
    <div>
      <NotFound />
    </div>
  );
}

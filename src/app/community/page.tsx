"use client";

import useHeader from "@/shared/hooks/useHeader";

export default function CommunityPage() {
  // useHeader({ title: "제목1" });
  useHeader({ showBack: true });
  return (
    <>
      <p>Community</p>
    </>
  );
}

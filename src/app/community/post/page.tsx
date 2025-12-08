"use client";

import useHeader from "@/shared/hooks/useHeader";

export default function PostPage() {
  useHeader({ showBack: true, showMenu: true });

  return (
    <div className="px-[20px]">
      <p>글쓰기 페이지</p>
    </div>
  );
}

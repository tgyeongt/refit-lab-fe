"use client";

import { useEffect } from "react";
import { useHeaderStore } from "@/shared/stores/headerStore";

export default function PostPage() {
  const { setHeader, setRightElement } = useHeaderStore();

  useEffect(() => {
    // 헤더 기본값
    setHeader({
      title: "글쓰기",
      showBack: true,
      showMenu: false,
    });

    // 오른쪽에 등록 버튼 추가
    setRightElement(
      <button
        onClick={() => console.log("게시물 등록")}
        className="text-blue-500 font-semibold text-[16px]"
      >
        등록
      </button>
    );

    // 페이지를 떠날 때 오른쪽 버튼 초기화
    return () => setRightElement(null);
  }, [setHeader, setRightElement]);

  return <div>여기가 글쓰기 페이지</div>;
}

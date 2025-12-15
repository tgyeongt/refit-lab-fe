"use client";

import { useMemo } from "react";

export const useTimeAgo = (isoString: string) => {
  return useMemo(() => {
    const now = new Date();
    const time = new Date(isoString);
    const diff = now.getTime() - time.getTime(); // 밀리초 차이

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  }, [isoString]);
};

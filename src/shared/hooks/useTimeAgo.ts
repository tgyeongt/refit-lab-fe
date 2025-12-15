"use client";
import { useMemo } from "react";

/**
 * 서버에서 오는 ISO 문자열이 UTC 기준일 때
 * 한국 시간(KST) 기준으로 얼마나 지났는지 계산
 */
export const useTimeAgo = (isoString: string) => {
  return useMemo(() => {
    // ISO 문자열 끝에 Z를 붙여서 UTC로 해석
    const timeUTC = new Date(
      isoString.endsWith("Z") ? isoString : isoString + "Z"
    );

    const now = new Date();

    const diff = now.getTime() - timeUTC.getTime(); // 밀리초 차이
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

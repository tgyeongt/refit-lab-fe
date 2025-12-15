"use client";

import Icon404 from "@/assets/icon/icon-404.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center pt-[30vh]">
      <Icon404 />
      <p className="mt-[30px] text-2xl font-semibold text-gray-800">
        준비중입니다
      </p>
    </div>
  );
}

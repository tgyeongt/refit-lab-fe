"use client";

import { PartyStatus } from "../(types)/party";
import { clsx } from "clsx";

interface StatusFilterProps {
  activeStatus: "all" | PartyStatus;
  onStatusChange: (status: "all" | PartyStatus) => void;
  counts: {
    all: number;
    scheduled: number;
    ongoing: number;
    completed: number;
  };
}

// 상태별 필터 컴포넌트
export const StatusFilter = ({
  activeStatus,
  onStatusChange,
  counts,
}: StatusFilterProps) => {
  const filters: {
    key: "all" | PartyStatus;
    label: string;
    count: number;
  }[] = [
    { key: "all", label: "전체", count: counts.all },
    { key: "scheduled", label: "예정", count: counts.scheduled },
    { key: "ongoing", label: "진행중", count: counts.ongoing },
    { key: "completed", label: "완료", count: counts.completed },
  ];

  return (
    <div className="flex items-center gap-14">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onStatusChange(filter.key)}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div
            className={clsx(
              "w-[14px] h-[14px] rounded-sm",
              activeStatus === filter.key ? "bg-purple" : "bg-[#D9D9D9]"
            )}
          />
          <span
            className={clsx(
              "text-base",
              activeStatus === filter.key ? "text-black" : "text-black"
            )}
          >
            {filter.label}
          </span>
        </button>
      ))}
    </div>
  );
};

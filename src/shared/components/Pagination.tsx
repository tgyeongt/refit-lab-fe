"use client";

import { clsx } from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 페이지네이션 공통 컴포넌트
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex fixed bottom-4 left-0 right-0 items-center justify-center gap-3 py-5">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={clsx("text-sm transition-colors tracking-[-0.5px]", {
            "text-gray-5A font-semibold": currentPage === page,
            "text-gray-6 font-medium": currentPage !== page,
          })}
        >
          {page}
        </button>
      ))}
    </div>
  );
};


"use client";

import { clsx } from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 페이지네이션 컴포넌트
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-[5px] mt-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={clsx(
            "text-sm h-[22px] px-2 cursor-pointer",
            currentPage === page
              ? "text-gray-5A font-semibold"
              : "text-gray-6 font-medium"
          )}
        >
          {page}
        </button>
      ))}
    </div>
  );
};


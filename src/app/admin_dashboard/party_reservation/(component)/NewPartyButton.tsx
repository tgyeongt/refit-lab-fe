"use client";

interface NewPartyButtonProps {
  onClick?: () => void;
}

// 신규 행사 등록 버튼
export const NewPartyButton = ({ onClick }: NewPartyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 px-2.5 py-2.5 bg-purple text-white rounded cursor-pointer hover:bg-purple/90 transition-colors"
    >
      {/* SVG 아이콘 영역 - 실제로는 Icon 컴포넌트 사용 */}
      <div className="w-4 h-4">
        {/* TODO: 플러스 아이콘 SVG 추가 */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3.33334V12.6667M3.33334 8H12.6667"
            stroke="currentColor"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-base">신규 행사 등록</span>
    </button>
  );
};


"use client";

/**
 * 통계 카드 Props
 */
interface StatsCardProps {
  currentActiveUsers: number;
  totalUsers: number;
  totalExchanges: number;
  usersChange: number;
  exchangesChange: number;
}

/**
 * 화살표 아이콘 컴포넌트
 */
const ArrowIcon = ({ direction }: { direction: "up" | "down" }) => {
  if (direction === "up") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.33 10.67L8 6L12.67 10.67"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.33 5.33L8 10L12.67 5.33"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * 통계 카드 컴포넌트 (보라색 배경)
 */
export const StatsCard = ({
  currentActiveUsers,
  totalUsers,
  totalExchanges,
  usersChange,
  exchangesChange,
}: StatsCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}천`;
    }
    return num.toString();
  };

  return (
    <div className="bg-purple rounded-lg p-11 shadow-md">
      {/* 타이틀 & 메인 숫자 */}
      <div className="mb-9">
        <h3 className="text-xl font-medium text-white mb-4">
          현재 활성 이용자
        </h3>
        <p className="text-[64px] font-medium text-white leading-none">
          {currentActiveUsers}
        </p>
      </div>

      {/* 다시입다연구소 라벨 */}
      <div className="mb-7">
        <p className="text-2xl font-medium text-gray-6">다시입다연구소</p>
      </div>

      {/* 통계 정보 */}
      <div className="flex items-start gap-[75px]">
        {/* 이용자 */}
        <div>
          <p className="text-base text-black mb-2">이용자</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium text-black">
              {formatNumber(totalUsers)}
            </span>
            <span className="text-2xl font-normal text-gray-7">
              {formatNumber(totalUsers)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-6 mt-1">
            <ArrowIcon direction="up" />
            <span className="text-[13px]">{usersChange}%</span>
          </div>
        </div>

        {/* 교환 수 */}
        <div>
          <p className="text-base text-black mb-2">교환 수</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium text-black">
              {formatNumber(totalExchanges)}
            </span>
            <span className="text-2xl font-normal text-gray-7">
              {formatNumber(totalExchanges)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-6 mt-1">
            <ArrowIcon direction="down" />
            <span className="text-[13px]">{exchangesChange}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};


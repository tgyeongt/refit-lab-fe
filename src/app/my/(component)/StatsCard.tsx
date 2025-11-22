"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { mypageStyles } from "../(util)/mypage-styles";
import styles from "./StatsCard.module.css";

interface StatsCardProps {
  exchangeCount: number;
  carbonReduction: number;
}

// 샘플 데이터
const generateChartData = () => {
  return [
    { month: "1월", value: 0 },
    { month: "2월", value: 150 },
    { month: "3월", value: 150 },
    { month: "4월", value: 200 },
    { month: "5월", value: 300 },
    { month: "6월", value: 350 },
    { month: "7월", value: 400 },
    { month: "8월", value: 500 },
    { month: "9월", value: 600 },
    { month: "10월", value: 600 },
    { month: "11월", value: 640 },
    { month: "12월", value: 700 },
  ];
};

export const StatsCard = ({
  exchangeCount,
  carbonReduction,
}: StatsCardProps) => {
  const chartData = generateChartData();

  return (
    <div className={`${mypageStyles.stats.card} ${styles.statsCardContainer}`}>
      {/* 탄소량 그래프 */}
      <div className={mypageStyles.stats.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#642C8D" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="linear"
              dataKey="value"
              stroke="#642C8D"
              strokeWidth={2}
              fill="url(#colorCarbon)"
            />
            <XAxis hide />
            <YAxis hide />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 텍스트 컨텐츠 */}
      <div>
        {/* 타이틀 */}
        <h3 className={mypageStyles.stats.title}>
          지금까지
          <br />
          <span className="flex items-center gap-1 leading-[1.1em] tracking-[-0.02em]">
            내가 줄인
            <span className="bg-[#E7F1F1] text-[#642C8D] px-1 py-0.5 rounded-sm">
              탄소량
            </span>
          </span>
        </h3>

        {/* 탄소량 숫자 */}
        <div className={mypageStyles.stats.carbonValue}>{carbonReduction}g</div>

        {/* 교환 횟수 */}
        <div className={mypageStyles.stats.exchangeCount}>
          <span className={mypageStyles.stats.exchangeCountLabel}>
            나의 교환 횟수:
          </span>
          <span className={mypageStyles.stats.exchangeCountValue}>
            {exchangeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

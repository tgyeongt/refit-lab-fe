"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { mypageStyles, cn } from "../(util)/mypage-styles";
import styles from "./StatsCard.module.css";
import { CarbonChange } from "../(types)/my";
import { formatDateForChart } from "@/shared/util/formatDate";

interface StatsCardProps {
  exchangeCount: number;
  carbonReduction: number;
  carbonChangeList: CarbonChange[];
}

// carbonChangeList를 그래프 데이터로 변환
const generateChartData = (carbonChangeList: CarbonChange[]) => {
  // 데이터가 없으면 초기값 0만 반환
  if (!carbonChangeList || carbonChangeList.length === 0) {
    return [{ date: "", value: 0 }];
  }

  // changedAt 기준으로 정렬 (과거 → 최신순, API에서 이미 정렬되어 올 수도 있지만 안전하게)
  const sortedList = [...carbonChangeList].sort((a, b) => {
    return new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime();
  });

  // 날짜 형식 변환 및 그래프 데이터 생성
  return sortedList.map((item) => {
    return {
      date: formatDateForChart(item.changedAt),
      value: item.totalAfterG,
    };
  });
};

export const StatsCard = ({
  exchangeCount,
  carbonReduction,
  carbonChangeList,
}: StatsCardProps) => {
  // carbonChangeList를 기반으로 그래프 데이터 생성
  const chartData = useMemo(
    () => generateChartData(carbonChangeList),
    [carbonChangeList]
  );

  return (
    <div className={cn(mypageStyles.stats.card, styles.statsCardContainer)}>
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
          <span
            className={cn(
              "flex",
              "items-center",
              "gap-1",
              "leading-[1.1em]",
              "tracking-[-0.02em]"
            )}
          >
            내가 줄인
            <span
              className={cn(
                "bg-[#E7F1F1]",
                "text-purple",
                "px-1",
                "py-0.5",
                "rounded-sm"
              )}
            >
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

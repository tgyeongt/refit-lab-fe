"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { ChartDataPoint } from "@/shared/types/admin";

/**
 * 사용자 활동 차트 Props
 */
interface UserActivityChartProps {
  data: ChartDataPoint[];
}

/**
 * 사용자 활동 라인 차트 컴포넌트 (Recharts)
 */
export const UserActivityChart = ({ data }: UserActivityChartProps) => {
  return (
    <div className="bg-white rounded-lg p-11 shadow-md">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-9">
        <div>
          <h3 className="text-base text-gray-6 mb-2">이용자</h3>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium text-black">2천</span>
            <span className="text-2xl font-normal text-gray-7">2천</span>
          </div>
        </div>

        {/* 기간 선택 드롭다운 */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-gray-6">지난 7일</span>
          <svg className="w-3 h-2" viewBox="0 0 12 9" fill="none">
            <path
              d="M1 1L6 8L11 1"
              stroke="#9E9E9E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 그래프 영역 */}
      <div className="h-[264px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            {/* Y축 그리드 라인 */}
            <defs>
              <pattern id="grid" width="1" height="70" patternUnits="userSpaceOnUse">
                <line
                  x1="0"
                  y1="0"
                  x2="578"
                  y2="0"
                  stroke="#BDBDBD"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* X축 */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#757575", fontSize: 13 }}
              dy={10}
            />

            {/* Y축 */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#757575", fontSize: 13 }}
              dx={-10}
              ticks={[0, 1000, 2000, 3000]}
              tickFormatter={(value) => {
                if (value >= 1000) return `${value / 1000}천`;
                return value.toString();
              }}
              domain={[0, 3000]}
            />

            {/* 라인 */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#642C8D"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 하단 월 표시 */}
      <div className="mt-4">
        <span className="text-[13px] text-gray-6">12월</span>
      </div>
    </div>
  );
};


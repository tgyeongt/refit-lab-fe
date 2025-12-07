"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ChartDataPoint } from "@/shared/types/admin";
import Icon from "@/shared/components/Icon";
import ArrowChartIcon from "@/assets/icon/arrow-chart.svg";
import PolygonIcon from "@/assets/icon/polygon.svg";

// 사용자 활동 차트 Props
interface UserActivityChartProps {
  data: ChartDataPoint[];
  totalUsers: number;
  totalExchanges: number;
  exchangesChange: number;
  usersChange: number;
}

// 사용자 활동 라인 차트 컴포넌트 (Recharts)
export const UserActivityChart = ({
  data,
  totalUsers,
  totalExchanges,
  exchangesChange,
  usersChange,
}: UserActivityChartProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}천`;
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b-2 border-gray-1 pt-11 pb-4 px-11">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-9">
          {/* 통계 정보 */}
          <div className="flex items-start gap-14">
            {/* 이용자 */}
            <div>
              <p className="text-base text-black mb-2">이용자</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-medium text-black">
                  {formatNumber(totalUsers)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-6 mt-1">
                <Icon
                  icon={ArrowChartIcon}
                  width={16}
                  height={16}
                  color="#E42938"
                />
                <span className="text-[13px]">{usersChange}%</span>
              </div>
            </div>

            {/* 교환 수 */}
            <div>
              <p className="text-base text-gray-7 mb-2">교환 수</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-normal text-gray-7">
                  {formatNumber(totalExchanges)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-6 mt-1">
                <Icon
                  icon={ArrowChartIcon}
                  width={16}
                  height={16}
                  className="rotate-180"
                  color="#4181DB"
                />
                <span className="text-[13px]">{exchangesChange}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 그래프 영역 */}
        <div className="h-[264px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: -20, left: 0, bottom: 5 }}
            >
              {/* Y축 그리드 라인 */}
              <defs>
                <pattern
                  id="grid"
                  width="1"
                  height="70"
                  patternUnits="userSpaceOnUse"
                >
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

              <CartesianGrid
                stroke="#BDBDBD"
                strokeDasharray="0"
                vertical={false}
              />

              {/* X축 */}
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9E9E9E", fontSize: 13 }}
                padding={{ left: 10, right: 10 }}
                dy={10}
              />

              {/* Y축 오른쪽 */}
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                ticks={[0, 1000, 2000, 3000]}
                tick={{ fill: "#9E9E9E", fontSize: 13 }}
                domain={[0, 3000]}
                tickFormatter={(value) => {
                  if (value >= 1000) return `${value / 1000}천`;
                  return value.toString();
                }}
                dx={0}
              />

              {/* 라인 */}
              <Line
                type="linear"
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
        <div className="pb-4">
          <span className="text-[13px] text-gray-6">12월</span>
        </div>
      </div>
      {/* 기간 선택 드롭다운 */}
      <div className="flex items-center gap-2.5 px-8 py-3.5">
        <span className="text-[13px] text-gray-6">지난 7일</span>
        <Icon icon={PolygonIcon} width={16} height={7} color="#9E9E9E" />
      </div>
    </div>
  );
};

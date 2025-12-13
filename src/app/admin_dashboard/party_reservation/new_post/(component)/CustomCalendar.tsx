"use client";

import { useState } from "react";

interface CustomCalendarProps {
  value?: Date;
  onChange: (date: Date) => void;
  onClose?: () => void;
}

// Figma 디자인 기반 커스텀 달력
export const CustomCalendar = ({
  value,
  onChange,
  onClose,
}: CustomCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 이전 연도로 이동
  const handlePrevYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
  };

  // 다음 연도로 이동
  const handleNextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
  };

  // 오늘로 이동
  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onChange(today);
    onClose?.();
  };

  // 날짜 선택
  const handleDateClick = (date: Date) => {
    onChange(date);
    onClose?.();
  };

  // 달력 날짜 생성
  const generateCalendarDays = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
    }> = [];

    // 이전 달 날짜
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevLastDate - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    // 현재 달 날짜
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(year, month, i);
      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const isSelected =
        value &&
        date.getDate() === value.getDate() &&
        date.getMonth() === value.getMonth() &&
        date.getFullYear() === value.getFullYear();

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected: isSelected || false,
      });
    }

    // 다음 달 날짜 (6주 고정)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="w-[280px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="relative h-10 bg-white flex items-center justify-between px-6">
        {/* 이전 연도 버튼 */}
        <button
          type="button"
          onClick={handlePrevYear}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 2L8 6L4 10M8 2L12 6L8 10"
              stroke="#9E9E9E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="rotate(180 8 6)"
            />
          </svg>
        </button>

        {/* 이전 달 버튼 */}
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 2L8 6L4 10"
              stroke="#9E9E9E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="rotate(180 6 6)"
            />
          </svg>
        </button>

        {/* 년월 표시 */}
        <span className="text-sm font-semibold text-black">
          {year}년 {month + 1}월
        </span>

        {/* 다음 달 버튼 */}
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 2L8 6L4 10"
              stroke="#9E9E9E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 다음 연도 버튼 */}
        <button
          type="button"
          onClick={handleNextYear}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 2L8 6L4 10M8 2L12 6L8 10"
              stroke="#9E9E9E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-4" />

      {/* 달력 본문 */}
      <div className="p-2.5">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-1">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className="w-8 h-6 flex items-center justify-center text-xs"
              style={{ color: index === 0 ? "#E42938" : "#141414" }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-1">
          {calendarDays.map((day, index) => {
            const isHoliday = day.date.getDay() === 0; // 일요일

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDateClick(day.date)}
                disabled={!day.isCurrentMonth}
                className="w-8 h-6 flex items-center justify-center text-xs rounded cursor-pointer transition-colors hover:bg-gray-100"
                style={{
                  backgroundColor: day.isSelected ? "#A772CD" : "transparent",
                  color: day.isSelected
                    ? "#FFFFFF"
                    : !day.isCurrentMonth
                    ? "#9E9E9E"
                    : isHoliday
                    ? "#E42938"
                    : "#141414",
                }}
              >
                {day.date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* 하단 구분선 */}
      <div className="border-t border-gray-4" />

      {/* 오늘 버튼 */}
      <div className="h-10 bg-white flex items-center justify-center">
        <button
          type="button"
          onClick={handleToday}
          className="text-xs text-blue font-normal cursor-pointer hover:underline"
        >
          오늘
        </button>
      </div>
    </div>
  );
};

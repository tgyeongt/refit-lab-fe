"use client";

import { useState } from "react";
import { CustomCalendar } from "./CustomCalendar";

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

// 날짜 선택 컴포넌트
export const DatePicker = ({
  value,
  onChange,
  placeholder,
}: DatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    onChange(formattedDate);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value || ""}
        placeholder={placeholder || "날짜를 선택해주세요"}
        readOnly
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full h-[45px] px-5 border border-gray-6 rounded cursor-pointer text-base"
      />

      {showCalendar && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowCalendar(false)}
          />

          {/* 커스텀 캘린더 */}
          <div className="absolute top-full left-0 mt-2 z-50">
            <CustomCalendar
              value={value ? new Date(value) : undefined}
              onChange={handleDateChange}
              onClose={() => setShowCalendar(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

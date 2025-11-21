"use client";

import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "../../(util)/event-styles";

interface BookingButtonProps {
  isReservable: boolean;
  isLoading?: boolean;
  isReserved?: boolean;
  onClick?: () => void;
}

// 예약하기 버튼 컴포넌트
export const BookingButton = ({
  isReservable,
  isLoading = false,
  isReserved = false,
  onClick,
}: BookingButtonProps) => {
  const handleReserveClick = () => {
    if (isReserved) {
      return;
    }
    onClick?.();
  };
  return (
    <div className={bookingStyles.component.bookingButton}>
      {/* 임시 설정: 이미 예약한 행사인 경우 */}
      {isReserved ? (
        <button
          className={cn(bookingStyles.component.buttonCTADisabled)}
          disabled={true}
          type="button"
        >
          이미 예약한 행사입니다
        </button>
      ) : (
        <button
          onClick={handleReserveClick}
          disabled={!isReservable || isLoading}
          className={bookingStyles.component.buttonCTA}
          type="button"
        >
          {isLoading ? "이동 중..." : "예약하기"}
        </button>
      )}
    </div>
  );
};

"use client";

import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";

interface BookingButtonProps {
  isReservable: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

// 예약하기 버튼 컴포넌트
export const BookingButton = ({
  isReservable,
  isLoading = false,
  onClick,
}: BookingButtonProps) => {
  return (
    <div className={bookingStyles.component.bookingButton}>
      <button
        onClick={onClick}
        disabled={!isReservable || isLoading}
        className={bookingStyles.component.buttonCTA}
        type="button"
      >
        {isLoading ? "예약 중..." : "예약하기"}
      </button>
    </div>
  );
};

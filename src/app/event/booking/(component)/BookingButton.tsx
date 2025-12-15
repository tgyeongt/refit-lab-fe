"use client";

import { useRouter } from "next/navigation";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "../../(util)/event-styles";

interface BookingButtonProps {
  isReserved: boolean;
  isLoading?: boolean;
  eventId: number;
  onReservationSuccess?: () => void;
}

// 예약하기 버튼 컴포넌트 (라우팅만 처리)
export const BookingButton = ({
  isLoading = false,
  isReserved,
  eventId,
  onReservationSuccess,
}: BookingButtonProps) => {
  const router = useRouter();

  const handleReserveClick = () => {
    if (isReserved) {
      return;
    }

    // 예약 페이지로 라우팅
    router.push(`/event/booking/${eventId}/reservation`);
  };

  return (
    <div className={bookingStyles.component.bookingButton}>
      {/* 이미 예약한 행사인 경우 */}
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
          disabled={isReserved || isLoading}
          className={bookingStyles.component.buttonCTA}
          type="button"
        >
          {isLoading ? "이동 중..." : "예약하기"}
        </button>
      )}
    </div>
  );
};

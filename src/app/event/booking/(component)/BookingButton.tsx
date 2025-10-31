'use client';

import { bookingStyles } from '@/app/event/booking/(util)/booking-styles';

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
    <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-[#E0E0E0] z-50">
      <button
        onClick={onClick}
        disabled={!isReservable || isLoading}
        className={bookingStyles.component.buttonCTA}
        type="button"
      >
        {isLoading ? '예약 중...' : '예약하기'}
      </button>
    </div>
  );
};

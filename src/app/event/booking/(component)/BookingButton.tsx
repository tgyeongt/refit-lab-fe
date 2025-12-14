"use client";

import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "../../(util)/event-styles";
import {
  usePartyHistoryActions,
  usePartyHistoryInfo,
} from "@/shared/stores/usePartyHistoryStore";
import { Event } from "@/app/event/types/event";

interface BookingButtonProps {
  isReservable: boolean;
  isLoading?: boolean;
  isReserved?: boolean;
  onClick?: () => void;
  eventData?: Event; // 예약할 행사 정보
}

// 예약하기 버튼 컴포넌트
export const BookingButton = ({
  isReservable,
  isLoading = false,
  isReserved: isReservedProp = false,
  onClick,
  eventData,
}: BookingButtonProps) => {
  const { addReservedEvent } = usePartyHistoryActions();
  const { reservedEvents } = usePartyHistoryInfo();

  // Store에서 예약 여부 확인
  const isReservedInStore = eventData
    ? reservedEvents.some((e) => e.eventId === eventData.eventId)
    : false;

  const isReserved = isReservedProp || isReservedInStore;

  const handleReserveClick = () => {
    if (isReserved) {
      return;
    }

    // 커스텀 onClick이 있으면 실행
    onClick?.();

    // 행사 정보가 있으면 Store에 추가
    if (eventData) {
      addReservedEvent(eventData);
      alert("예약이 완료되었습니다!");
    }
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

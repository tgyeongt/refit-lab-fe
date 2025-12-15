"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";

interface ReservationCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

export const ReservationCompleteModal = ({
  isOpen,
  onClose,
  eventId,
}: ReservationCompleteModalProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    router.push(`/event/booking/${eventId}`);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={bookingStyles.component.modalOverlay} onClick={handleClose}>
      <div
        className={bookingStyles.component.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <h2 className={bookingStyles.component.modalTitle}>
          행사 예약이
          <br />
          완료 되었습니다!
        </h2>

        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className={bookingStyles.component.modalCloseButton}
        >
          닫기
        </button>
      </div>
    </div>,
    document.body
  );
};

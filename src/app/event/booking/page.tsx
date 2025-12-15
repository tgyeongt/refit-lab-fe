"use client";

import { EventDetailHero } from "@/app/event/booking/(component)/EventDetailHero";
import { EventInfoCard } from "@/app/event/booking/(component)/EventInfoCard";
import { EventGallery } from "@/app/event/booking/(component)/EventGallery";
import { BookingButton } from "@/app/event/booking/(component)/BookingButton";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useEventDetail } from "@/app/event/(hook)/query/useEventDetail";

// useSearchParams를 사용하는 컴포넌트
function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리스트링에서 이벤트 ID 추출 (?id=1)
  const idParam = searchParams.get("id");
  const eventId = idParam ? Number(idParam) : null;

  const isValidEventId = eventId !== null && !isNaN(eventId) && eventId > 0;

  const {
    data: eventDetail,
    isLoading,
    error,
  } = useEventDetail(isValidEventId ? eventId : 0);

  const handleReservationSuccess = () => {
    router.refresh();
  };

  const handleDetailClick = () => {
    // 추가 정보 모달 또는 페이지
    console.log("자세히 알아보기 클릭");
  };

  if (!isValidEventId) {
    return (
      <main
        className={cn(
          bookingStyles.color.bgPage,
          "min-h-screen flex items-center justify-center"
        )}
      >
        <p className={bookingStyles.text.body}>유효하지 않은 행사 ID입니다.</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main
        className={cn(
          bookingStyles.color.bgPage,
          "min-h-screen flex items-center justify-center"
        )}
      >
        <p className={bookingStyles.text.body}>로딩 중...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className={cn(
          bookingStyles.color.bgPage,
          "min-h-screen flex items-center justify-center"
        )}
      >
        <p className={bookingStyles.text.body}>
          행사를 불러오는데 실패했습니다.
        </p>
      </main>
    );
  }

  if (!eventDetail) {
    return (
      <main
        className={cn(
          bookingStyles.color.bgPage,
          "min-h-screen flex items-center justify-center"
        )}
      >
        <p className={bookingStyles.text.body}>행사를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main
      className={cn(
        bookingStyles.color.bgPage,
        "w-full",
        "max-w-[393px]",
        "mb-[98px]",
        "p-[16px]"
      )}
    >
      {/* 히어로 섹션 */}
      <div
        className={cn(
          bookingStyles.component.card,
          bookingStyles.layout.mb30px
        )}
      >
        <EventDetailHero
          eventDetail={eventDetail}
          onDetailClick={handleDetailClick}
        />
      </div>

      {/* 행사 정보 카드 */}
      <div className={bookingStyles.layout.mb6}>
        <EventInfoCard eventDetail={eventDetail} />
      </div>

      {/* 갤러리 섹션 */}
      <div className={bookingStyles.layout.mb7}>
        <EventGallery eventDetail={eventDetail} />
      </div>

      {/* 예약하기 버튼 (하단 고정) */}
      <BookingButton
        isReserved={eventDetail.isReserved || false}
        eventId={eventDetail.eventId}
        onReservationSuccess={handleReservationSuccess}
      />
    </main>
  );
}

// 행사 예약 상세 페이지
export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main
          className={cn(
            bookingStyles.color.bgPage,
            "min-h-screen flex items-center justify-center"
          )}
        >
          <p className={bookingStyles.text.body}>로딩 중...</p>
        </main>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}

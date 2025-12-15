"use client";

import { EventDetailHero } from "@/app/event/booking/(component)/EventDetailHero";
import { EventInfoCard } from "@/app/event/booking/(component)/EventInfoCard";
import { EventGallery } from "@/app/event/booking/(component)/EventGallery";
import { BookingButton } from "@/app/event/booking/(component)/BookingButton";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { useRouter, useParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useEventDetail } from "@/app/event/(hook)/query/useEventDetail";

// useSearchParams를 사용하는 컴포넌트
function BookingPageContent() {
  const params = useParams();
  const eventId = params.id ? Number(params.id) : null;

  // eventId 유효성 검사
  const isValidEventId = eventId !== null && !isNaN(eventId) && eventId > 0;

  // API 호출
  const {
    data: apiEventDetail,
    isLoading: isLoadingAPI,
    error,
  } = useEventDetail(isValidEventId ? eventId : 0);
  const router = useRouter();

  // 예약 성공 핸들러
  const handleReservationSuccess = () => {
    // 예약 성공 시 페이지 새로고침 또는 데이터 재조회
    router.refresh();
  };

  // 자세히 알아보기
  const handleDetailClick = () => {
    // 추가 정보 모달 또는 페이지
    console.log("자세히 알아보기 클릭");
  };

  // eventId가 유효하지 않은 경우
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

  // 로딩 상태
  if (isLoadingAPI) {
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

  // 에러 상태
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

  // 데이터가 없을 때
  if (!apiEventDetail) {
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
          eventDetail={apiEventDetail}
          onDetailClick={handleDetailClick}
        />
      </div>

      {/* 행사 정보 카드 */}
      <div className={bookingStyles.layout.mb6}>
        <EventInfoCard eventDetail={apiEventDetail} />
      </div>

      {/* 갤러리 섹션 */}
      <div className={bookingStyles.layout.mb7}>
        <EventGallery eventDetail={apiEventDetail} />
      </div>

      {/* 예약하기 버튼 (하단 고정) */}
      <BookingButton
        isReserved={apiEventDetail?.isReserved || false}
        eventId={eventId!}
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

"use client";

import { EventDetailHero } from "@/app/event/booking/(component)/EventDetailHero";
import { EventInfoCard } from "@/app/event/booking/(component)/EventInfoCard";
import { EventGallery } from "@/app/event/booking/(component)/EventGallery";
import { BookingButton } from "@/app/event/booking/(component)/BookingButton";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import mockEventDetail from "@/app/event/booking/(util)/mock-event-detail.json";
import { EventDetail } from "./(util)/event-detail";

// 행사 예약 상세 페이지
export default function BookingPage() {
  // mock 데이터 추출
  const {
    id,
    title,
    description,
    location,
    date,
    thumbnailUrl,
    info,
    galleryImages,
    totalGalleryCount,
    isReservable,
  } = mockEventDetail;

  // 이벤트 상세 정보 객체 생성
  const eventDetail: EventDetail = {
    id,
    title,
    description,
    location,
    date,
    thumbnailUrl,
    info,
    galleryImages,
    totalGalleryCount,
    isReservable,
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id") || "1";

  // 임시 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBookingPending, setisBookingPending] = useState<boolean>(false);

  // 예약 처리
  const handleBooking = () => {
    if (!eventDetail) return;

    setisBookingPending(true);
    setTimeout(() => {
      setisBookingPending(false);
      setIsLoading(false);
    }, 1000);
  };

  // 갤러리 더보기
  const handleGalleryMore = () => {
    // 갤러리 전체 보기 페이지로 이동
    router.push(`/event/booking/gallery?id=${eventId}`);
  };

  // 자세히 알아보기
  const handleDetailClick = () => {
    // 추가 정보 모달 또는 페이지
    console.log("자세히 알아보기 클릭");
  };

  // 로딩 상태
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
          eventDetail={eventDetail!}
          onDetailClick={handleDetailClick}
        />
      </div>

      {/* 행사 정보 카드 */}
      <div className={bookingStyles.layout.mb6}>
        <EventInfoCard eventDetail={eventDetail!} />
      </div>

      {/* 갤러리 섹션 */}
      <div className={bookingStyles.layout.mb7}>
        <EventGallery
          eventDetail={eventDetail!}
          onMoreClick={handleGalleryMore}
        />
      </div>

      {/* 예약하기 버튼 (하단 고정) */}
      <BookingButton
        isReservable={eventDetail?.isReservable || false}
        isLoading={isBookingPending}
        onClick={handleBooking}
      />
    </main>
  );
}

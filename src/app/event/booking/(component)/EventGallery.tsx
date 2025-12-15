"use client";

import { useState } from "react";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { GalleryItem } from "./GalleryItem";
import { GalleryModal } from "./GalleryModal";
import { useModalActions, useModalInfo } from "@/shared/stores/useModalStore";
import { EventDetail } from "../../types/event";

interface EventGalleryProps {
  eventDetail: EventDetail;
}

// 행사 갤러리 컴포넌트
export const EventGallery = ({ eventDetail }: EventGalleryProps) => {
  const { isOpen: isModalOpen } = useModalInfo();
  const { openModal, closeModal } = useModalActions();
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  // recentImageUrlList를 사용
  const galleryImages = eventDetail.recentImageUrlList || [];

  if (!eventDetail) {
    return null;
  }

  // 이미지가 없는 경우
  if (galleryImages.length === 0) {
    return (
      <section className={bookingStyles.component.infoCard}>
        <h2
          className={cn(
            bookingStyles.text.sectionTitle,
            "mb-[15px]",
            bookingStyles.color.textPrimary
          )}
        >
          행사 정보
        </h2>
        <div className="flex items-center justify-center h-[320px] bg-gray-100 rounded-lg">
          <p className="text-gray-500 text-base">행사 이미지가 없습니다.</p>
        </div>
      </section>
    );
  }

  // 최대 4개만 표시 (2x2 그리드)
  const displayImages = galleryImages.slice(0, 4);
  // clothCountExceptRecent4를 사용하여 나머지 개수 계산
  const remainingCount = eventDetail.clothCountExceptRecent4 || 0;

  // 더보기 버튼 클릭 핸들러
  const handleMoreClick = () => {
    const startIndex = Math.min(3, galleryImages.length - 1);
    setInitialImageIndex(startIndex);
    openModal("party-gallery");
  };

  // 이미지 클릭 핸들러
  const handleImageClick = (index: number) => {
    setInitialImageIndex(index);
    openModal("party-gallery");
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <section className={bookingStyles.component.infoCard}>
        <h2
          className={cn(
            bookingStyles.text.sectionTitle,
            "mb-[15px]",
            bookingStyles.color.textPrimary
          )}
        >
          행사 정보
        </h2>

        <div className={cn(bookingStyles.component.galleryGrid)}>
          {displayImages.map((imageUrl: string, index: number) => (
            <GalleryItem
              key={index}
              imageUrl={imageUrl}
              index={index}
              // 마지막 아이템에 더보기 오버레이 표시
              showMoreOverlay={index === 3 && remainingCount > 0}
              remainingCount={remainingCount}
              onMoreClick={handleMoreClick}
              onImageClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </section>

      {/* 갤러리 모달 */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={galleryImages}
        initialIndex={initialImageIndex}
      />
    </>
  );
};

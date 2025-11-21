"use client";

import { useState } from "react";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { EventDetail } from "../(util)/event-detail";
import { GalleryItem } from "./GalleryItem";
import { GalleryModal } from "./GalleryModal";

interface EventGalleryProps {
  eventDetail: EventDetail;
}

// 행사 갤러리 컴포넌트
export const EventGallery = ({ eventDetail }: EventGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  // 최대 4개만 표시 (2x2 그리드)
  const displayImages = eventDetail.galleryImages.slice(0, 4);
  const remainingCount = eventDetail.totalGalleryCount - displayImages.length;

  // 더보기 버튼 클릭 핸들러
  const handleMoreClick = () => {
    const startIndex = Math.min(3, eventDetail.galleryImages.length - 1);
    setInitialImageIndex(startIndex);
    setIsModalOpen(true);
  };

  // 이미지 클릭 핸들러
  const handleImageClick = (index: number) => {
    setInitialImageIndex(index);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          {displayImages.map((imageUrl, index) => (
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
        images={eventDetail.galleryImages}
        initialIndex={initialImageIndex}
      />
    </>
  );
};

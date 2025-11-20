"use client";

import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import { EventDetail } from "../(util)/event-detail";
import { GalleryItem } from "./GalleryItem";

interface EventGalleryProps {
  eventDetail: EventDetail;
  onMoreClick: () => void;
}

// 행사 갤러리 컴포넌트
export const EventGallery = ({
  eventDetail,
  onMoreClick,
}: EventGalleryProps) => {
  // 최대 4개만 표시 (2x2 그리드)
  const displayImages = eventDetail.galleryImages.slice(0, 4);
  const remainingCount = eventDetail.totalGalleryCount - displayImages.length;

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

      <div className={cn(bookingStyles.component.galleryGrid)}>
        {displayImages.map((imageUrl, index) => (
          <GalleryItem
            key={index}
            imageUrl={imageUrl}
            index={index}
            // 마지막 아이템에 더보기 오버레이 표시
            showMoreOverlay={index === 3 && remainingCount > 0}
            remainingCount={remainingCount}
            onMoreClick={onMoreClick}
          />
        ))}
      </div>
    </section>
  );
};

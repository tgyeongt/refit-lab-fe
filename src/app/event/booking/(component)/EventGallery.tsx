'use client';

import Image from 'next/image';
import { bookingStyles } from '@/app/event/booking/(util)/booking-styles';
import { cn } from '@/app/event/(util)/event-styles';
import { EventDetail } from '../(util)/event-detail';

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
    <section className="w-full">
      <h2
        className={cn(
          bookingStyles.text.sectionTitle,
          'ml-[45px]',
          'mb-[47px]',
          bookingStyles.color.textPrimary
        )}
      >
        행사 정보
      </h2>

      <div className={cn(bookingStyles.component.galleryGrid, 'mx-[42px]')}>
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

/**
 * 갤러리 아이템 컴포넌트
 */
interface GalleryItemProps {
  imageUrl: string;
  index: number;
  showMoreOverlay: boolean;
  remainingCount: number;
  onMoreClick?: () => void;
}

const GalleryItem = ({
  imageUrl,
  showMoreOverlay,
  remainingCount,
  onMoreClick,
}: GalleryItemProps) => {
  return (
    <div className={bookingStyles.component.galleryItem}>
      <Image
        src={imageUrl}
        alt={`행사 갤러리 이미지 ${imageUrl}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 155px, 155px"
      />
      {showMoreOverlay && (
        <button
          onClick={onMoreClick}
          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white z-10 transition-opacity hover:opacity-90"
        >
          <span className={bookingStyles.text.galleryMore}>
            {remainingCount}개
          </span>
          <span className={bookingStyles.text.galleryMore}>더보기</span>
        </button>
      )}
    </div>
  );
};

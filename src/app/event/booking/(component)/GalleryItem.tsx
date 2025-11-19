import Image from "next/image";
import { cn } from "../../(util)/event-styles";
import { bookingStyles } from "../(util)/booking-styles";

// 갤러리 아이템 컴포넌트
interface GalleryItemProps {
  imageUrl: string;
  index: number;
  showMoreOverlay: boolean;
  remainingCount: number;
  onMoreClick?: () => void;
  onImageClick?: () => void;
}

export const GalleryItem = ({
  imageUrl,
  showMoreOverlay,
  remainingCount,
  onMoreClick,
  onImageClick,
}: GalleryItemProps) => {
  const handleClick = () => {
    if (showMoreOverlay && onMoreClick) {
      onMoreClick();
    } else if (onImageClick) {
      onImageClick();
    }
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <Image
        src={imageUrl}
        alt={`행사 갤러리 이미지 ${imageUrl}`}
        width={155}
        height={155}
        className={cn(bookingStyles.component.galleryItem)}
      />
      {showMoreOverlay && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoreClick?.();
          }}
          className={bookingStyles.component.galleryOverlay}
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

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { bookingStyles } from "@/app/event/booking/(util)/booking-styles";
import { cn } from "@/app/event/(util)/event-styles";
import Image from "next/image";
import { useEventImages } from "@/app/event/(hook)/query/useEventImages";
import { GalleryModal } from "../../(component)/GalleryModal";
import useHeader from "@/shared/hooks/useHeader";

// 행사 더보기 갤러리 페이지
export default function EventGalleryPage() {
  const params = useParams<{ id: string }>();
  const eventId = params?.id ? Number(params.id) : NaN;
  const [initialIndex, setInitialIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { images, isLoading, error } = useEventImages(eventId);

  const imageUrls = images.map((img) => img.imageUrl);

  // 상단 공통 Header 설정
  useHeader({ title: "행사정보", showBack: true, showMenu: false });

  const handleImageClick = (index: number) => {
    setInitialIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!eventId || isNaN(eventId) || eventId <= 0) {
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

  return (
    <main
      className={cn(
        bookingStyles.color.bgPage,
        "w-full",
        "max-w-[393px]",
        "min-h-screen",
        "mx-auto",
        "bg-white"
      )}
    >
      {/* 갤러리 그리드 */}
      <section className="px-[19px] pt-2.5 pb-[32px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-[320px]">
            <p className="text-gray-5A text-base">
              이미지를 불러오는 중입니다...
            </p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[320px]">
            <p className="text-gray-5A text-base">
              이미지를 불러오는데 실패했습니다.
            </p>
          </div>
        ) : imageUrls.length === 0 ? (
          <div className="flex items-center justify-center h-[320px] bg-gray-100">
            <p className="text-gray-500 text-base">행사 이미지가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[5px]">
            {imageUrls.map((url, index) => (
              <button
                key={`${url}-${index}`}
                type="button"
                onClick={() => handleImageClick(index)}
                className="relative w-full pb-[100%] overflow-hidden bg-gray-100"
              >
                <Image
                  src={url}
                  alt={`행사 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 전체 이미지 모달 */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={imageUrls}
        initialIndex={initialIndex}
      />
    </main>
  );
}

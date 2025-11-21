"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ArrowLeft from "@/assets/icon/arrow-left.svg";
import gallery from "@/assets/icon/gallery.svg";
import Icon from "@/shared/components/Icon";
import { cn } from "@/app/event/(util)/event-styles";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export const GalleryModal = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: GalleryModalProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // initialIndex가 변경될 때 메인 슬라이더 이동
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

  // Swiper가 활성화 되면 initialIndex 위치로 이동
  useEffect(() => {
    if (!isOpen) return;
    if (!mainSwiper) return;
    if (mainSwiper.destroyed) return;

    try {
      mainSwiper.slideTo(initialIndex);
    } catch (error) {
      console.error("Swiper slideTo error:", error);
    }
  }, [isOpen, initialIndex, mainSwiper]);

  // 컴포넌트 언마운트 시 Swiper 인스턴스 정리
  useEffect(() => {
    return () => {
      if (mainSwiper && !mainSwiper.destroyed) {
        try {
          mainSwiper.destroy(true, true);
        } catch (error) {
          console.error("Main Swiper 정리 오류:", error);
        }
      }
      if (thumbsSwiper && !thumbsSwiper.destroyed) {
        try {
          thumbsSwiper.destroy(true, true);
        } catch (error) {
          console.error("Thumbs Swiper 정리 오류:", error);
        }
      }
    };
  }, [mainSwiper, thumbsSwiper]);

  if (!isOpen) return null;

  // 모달 닫기
  const handleClose = () => {
    onClose();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);

    if (thumbsSwiper && !thumbsSwiper.destroyed) {
      try {
        thumbsSwiper.slideTo(swiper.activeIndex);
      } catch (error) {
        console.error("Thumbs Swiper slideTo error:", error);
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed",
        "inset-0",
        "z-50",
        "bg-[#141414]",
        "flex",
        "flex-col"
      )}
      onClick={handleClose}
    >
      {/* 헤더 - 뒤로가기 버튼 */}
      <div
        className={cn(
          "relative",
          "w-full",
          "h-[44px]",
          "flex",
          "items-center",
          "px-[14px]",
          "pt-[13px]",
          "pb-[12px]",
          "z-10"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className={cn(
            "w-[28px]",
            "h-[28px]",
            "flex",
            "items-center",
            "justify-center",
            "cursor-pointer"
          )}
        >
          <Icon
            icon={ArrowLeft}
            color="#929292"
            width={28}
            height={28}
            className="w-[28px] h-[28px]"
          />
        </button>
      </div>

      {/* 메인 이미지 슬라이더 */}
      <div
        className={cn(
          "flex-1",
          "relative",
          "w-full",
          "flex",
          "items-center",
          "justify-center"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Thumbs]}
          thumbs={
            thumbsSwiper && !thumbsSwiper.destroyed
              ? { swiper: thumbsSwiper }
              : undefined
          }
          onSwiper={(swiper) => {
            if (swiper && !swiper.destroyed) {
              setMainSwiper(swiper);
            }
          }}
          onSlideChange={handleSlideChange}
          initialSlide={initialIndex}
          className={cn("w-full", "h-full")}
          spaceBetween={0}
          slidesPerView={1}
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div
                className={cn(
                  "relative",
                  "w-full",
                  "h-full",
                  "flex",
                  "items-center",
                  "justify-end"
                )}
              >
                <Image
                  src={imageUrl}
                  alt={`갤러리 이미지 ${index + 1}`}
                  fill
                  className={cn("object-contain")}
                  priority={index === initialIndex}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 하단 썸네일 및 카운터 */}
      <div
        className={cn(
          "flex",
          "flex-col",
          "justify-center",
          "w-full",
          "pt-[23px]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 썸네일 슬라이더 */}
        <div className={cn("mb-2.5", "px-3")}>
          <Swiper
            modules={[Thumbs]}
            onSwiper={(swiper) => {
              if (swiper && !swiper.destroyed) {
                setThumbsSwiper(swiper);
              }
            }}
            watchSlidesProgress
            spaceBetween={10}
            slidesPerView="auto"
            centeredSlides
            className={cn("w-full")}
          >
            {images.map((imageUrl, index) => (
              <SwiperSlide
                key={index}
                className={cn("w-[44px]!", "h-[60px]!", "cursor-pointer")}
              >
                <div
                  className={cn(
                    "relative",
                    "w-full",
                    "h-full",
                    "rounded-[4px]",
                    currentIndex === index
                      ? "border-[1.5px]! border-[#08B0B7]"
                      : "border-[1.5px]! border-transparent"
                  )}
                  onClick={() => {
                    if (mainSwiper && !mainSwiper.destroyed) {
                      try {
                        mainSwiper.slideTo(index);
                      } catch (error) {
                        console.error("Main Swiper slideTo error:", error);
                      }
                    }
                  }}
                >
                  <div
                    className={cn(
                      "relative",
                      "w-full",
                      "h-full",
                      "overflow-hidden",
                      "rounded-[2.5px]"
                    )}
                  >
                    <Image
                      src={imageUrl}
                      alt={`썸네일 ${index + 1}`}
                      width={66}
                      height={84}
                      className={cn(
                        "object-cover",
                        "w-full",
                        "h-full",
                        currentIndex === index ? "opacity-100" : "opacity-60"
                      )}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 카운터 */}
      <div
        className={cn(
          "flex",
          "items-center",
          "justify-center",
          "gap-[10px]",
          "pb-6"
        )}
      >
        <div className={cn("w-[24px]", "h-[24px]", "relative")}>
          <Icon icon={gallery} className="w-[24px] h-[24px]" />
        </div>
        <span
          className={cn(
            "text-white",
            "text-[14px]",
            "font-medium",
            "leading-[1.193]",
            "tracking-[-0.035em]"
          )}
        >
          {currentIndex + 1}/{images.length}
        </span>
      </div>
    </div>
  );
};

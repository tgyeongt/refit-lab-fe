"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Keyboard } from "swiper/modules";

type GalleryModalProps = {
  open: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
};

export default function GalleryModal({
  open,
  images,
  initialIndex = 0,
  onClose,
}: GalleryModalProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // ✅ destroyed 된 thumbs 인스턴스는 절대 사용하지 않기
  const safeThumbs = useMemo(() => {
    if (!thumbsSwiper) return null;
    if (thumbsSwiper.destroyed) return null;
    return thumbsSwiper;
  }, [thumbsSwiper]);

  // ✅ 모달 닫힐 때 thumbs 초기화 (재오픈 안정화)
  useEffect(() => {
    if (!open) setThumbsSwiper(null);
  }, [open]);

  // (옵션) ESC 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      setThumbsSwiper(null);
    };
  }, [open, onClose]);

  // ✅ 핵심: 닫혔으면 Swiper를 “아예 렌더링 안 함”
  if (!open) return null;

  if (!images || images.length === 0) {
    return (
      <div
        className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60"
        onClick={onClose}
      >
        <div
          className="w-[min(92vw,720px)] rounded-2xl bg-white p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-gray-700">표시할 이미지가 없습니다.</p>
          <button
            className="mt-4 rounded-xl bg-black px-4 py-2 text-white"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-[min(92vw,860px)] rounded-2xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-800">
            {initialIndex + 1} / {images.length}
          </div>
          <button
            className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            닫기
          </button>
        </div>

        {/* 메인 Swiper */}
        <Swiper
          // ✅ thumbs가 준비되기 전에는 thumbs prop 자체를 안 넘기는 게 안전
          thumbs={safeThumbs ? { swiper: safeThumbs } : undefined}
          modules={[Thumbs, Keyboard]}
          keyboard={{ enabled: true }}
          initialSlide={Math.min(Math.max(initialIndex, 0), images.length - 1)}
          spaceBetween={12}
          className="rounded-2xl"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={`${src}-${idx}`}>
              <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={src}
                  alt={`gallery-${idx}`}
                  fill
                  sizes="(max-width: 860px) 92vw, 860px"
                  className="object-contain"
                  priority={idx === initialIndex}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 썸네일 Swiper */}
        <div className="mt-4">
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={(s) => setThumbsSwiper(s)}
            onDestroy={() => setThumbsSwiper(null)} // ✅ 방어
            watchSlidesProgress
            freeMode
            spaceBetween={10}
            slidesPerView="auto"
            className="rounded-2xl"
          >
            {images.map((src, idx) => (
              <SwiperSlide
                key={`thumb-${src}-${idx}`}
                className="w-[72px]! h-[72px]!"
              >
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={src}
                    alt={`thumb-${idx}`}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

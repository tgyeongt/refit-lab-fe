"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/app/event/(util)/event-styles";
import useHeader from "@/shared/hooks/useHeader";
import Icon from "@/shared/components/Icon";
import CameraIcon from "@/assets/icon/camera.svg";
import { ReservationCompleteModal } from "./(component)/reservation-complete-modal";
import {
  reservationSchema,
  type ReservationFormData,
} from "./(schema)/reservationSchema";
import { useReservationForm } from "./(hook)/useReservationForm";

const MAX_CLOTHES_COUNT = 10;

export default function ReservationPage() {
  const params = useParams();
  const eventId = Number(params.id);
  useHeader({ title: "행사 예약", showBack: true, showMenu: false });

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      clothesCount: 0,
      clothImageList: [],
      isEmailConsent: false,
    },
  });

  // 예약 폼 커스텀 훅
  const {
    uploadedImages,
    imagePreviews,
    isModalOpen,
    isPending,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    onSubmit,
    setIsModalOpen,
  } = useReservationForm({
    eventId,
    setValue,
    watch,
  });

  const clothesCount = watch("clothesCount");
  const isEmailConsent = watch("isEmailConsent");

  return (
    <main className="flex w-full justify-center bg-[#FCFCFC]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[393px] flex-col gap-8 px-5 pb-[19px] pt-6"
      >
        <section className="flex flex-col gap-6">
          {/* 이름 */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="reservation-name"
              className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-black"
            >
              이름
            </label>
            <input
              id="reservation-name"
              type="text"
              placeholder="이름을 입력해주세요."
              autoComplete="name"
              {...register("name")}
              className="h-[60px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[16px] font-normal leading-normal tracking-[-0.025em] text-black placeholder:text-[#BDBDBD] focus:border-[#642C8D] focus:outline-none"
            />
            {errors.name && (
              <p className="text-red text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="reservation-contact"
              className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-black"
            >
              연락처
            </label>
            <input
              id="reservation-contact"
              type="tel"
              placeholder="010-0000-0000"
              autoComplete="tel"
              {...register("contact")}
              className="h-[60px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[16px] font-normal leading-normal tracking-[-0.025em] text-black placeholder:text-[#BDBDBD] focus:border-[#642C8D] focus:outline-none"
            />
            {errors.contact && (
              <p className="text-red text-sm">{errors.contact.message}</p>
            )}
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="reservation-email"
              className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-black"
            >
              이메일
            </label>
            <input
              id="reservation-email"
              type="email"
              placeholder="이메일을 입력해주세요."
              autoComplete="email"
              {...register("email")}
              className="h-[60px] rounded-lg border border-[#E0E0E0] bg-white px-4 text-[16px] font-normal leading-normal tracking-[-0.025em] text-black placeholder:text-[#BDBDBD] focus:border-[#642C8D] focus:outline-none"
            />
            {errors.email && (
              <p className="text-red text-sm">{errors.email.message}</p>
            )}
          </div>
        </section>

        {/* 옷 수량 */}
        <section className="flex flex-col gap-3">
          <p className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-black">
            옷 수량
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-[60px] w-[165px] items-center justify-between rounded-lg border border-[#E0E0E0] bg-white px-4">
              <input
                type="number"
                inputMode="numeric"
                placeholder="개수"
                {...register("clothesCount", { valueAsNumber: true })}
                className="w-full bg-transparent text-[14px] font-medium text-black placeholder:text-[#BDBDBD] focus:outline-none"
              />
              <span className="ml-2 text-[18px] font-semibold text-black">
                개
              </span>
            </div>
          </div>
          {errors.clothesCount && (
            <p className="text-red text-sm">{errors.clothesCount.message}</p>
          )}
        </section>

        {/* 파티에 가져갈 옷을 골라주세요 */}
        <section className="flex flex-col gap-3">
          <p className="text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] text-black">
            파티에 가져갈 옷을 골라주세요.
          </p>
          <div className="flex flex-col gap-3">
            {/* 이미지 미리보기 그리드 */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-3">
                {imagePreviews.map((previewUrl, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-[#E0E0E0] bg-gray-100">
                      <img
                        src={previewUrl}
                        alt={`선택한 이미지 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* 삭제 버튼 */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                      >
                        <span className="text-white text-sm font-bold">×</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 파일 선택 버튼 (기존 UI 유지) */}
            {uploadedImages.length < MAX_CLOTHES_COUNT && (
              <label
                htmlFor="clothImageList"
                className={cn(
                  "flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-[#EEE] bg-[#EEE] cursor-pointer hover:bg-gray-200 transition-colors",
                  uploadedImages.length > 0 ? "h-[120px]" : "h-[200px]"
                )}
              >
                <input
                  id="clothImageList"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <Icon
                  icon={CameraIcon}
                  color="#757575"
                  width={33}
                  height={33}
                />
                <span className="text-[14px] font-medium leading-[1.193] tracking-[-0.036em] text-gray-7 mt-2">
                  {uploadedImages.length}/{MAX_CLOTHES_COUNT}
                </span>
                {uploadedImages.length > 0 && (
                  <span className="text-xs text-gray-500 mt-1">
                    추가 이미지 선택
                  </span>
                )}
              </label>
            )}

            {uploadedImages.length >= MAX_CLOTHES_COUNT && (
              <div className="text-center text-sm text-gray-500 py-2">
                최대 {MAX_CLOTHES_COUNT}개까지 선택 가능합니다.
              </div>
            )}
          </div>
        </section>

        {/* 수신 동의 */}
        <section>
          <span className="text-[18px] font-semibold tracking-[-0.027em] text-black">
            수신 동의
          </span>

          <label
            htmlFor="reservation-email-consent"
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#E0E0E0] bg-white px-5 py-4 mt-2.5"
          >
            <input
              id="reservation-email-consent"
              type="checkbox"
              {...register("isEmailConsent")}
              className="sr-only"
            />

            {/* 체크박스 */}
            <div
              className={cn(
                "flex h-4.5 w-4.5 items-center justify-center rounded-full transition-colors",
                isEmailConsent ? "bg-[#08B0B7]" : "bg-[#E0E0E0]"
              )}
            />

            {/* 텍스트 */}
            <span
              className={cn(
                "flex flex-col gap-1 text-[16px] font-medium leading-normal tracking-[-0.031em]",
                isEmailConsent ? "text-black" : "text-[#9E9E9E]"
              )}
            >
              이메일로 파티 관련 소식을 듣겠습니다.
            </span>
          </label>
        </section>

        {/* 예약하기 */}
        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className={cn(
            "mt-4.5 h-[60px] rounded-lg text-[18px] font-semibold leading-[1.111] tracking-[-0.027em] transition-colors",
            isSubmitting || isPending
              ? "bg-[#BDBDBD] text-white cursor-not-allowed"
              : "bg-[#642C8D] text-white hover:bg-[#54257D]"
          )}
        >
          {isSubmitting || isPending ? "예약 중..." : "예약하기"}
        </button>
      </form>

      {/* 예약 완료 모달 */}
      <ReservationCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventId={String(eventId)}
      />
    </main>
  );
}

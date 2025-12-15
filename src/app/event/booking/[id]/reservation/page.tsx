"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { useCreateReservation } from "@/app/event/(hook)/mutation/useCreateReservation";
import {
  validateFilesSize,
  formatFileSize,
} from "@/shared/util/file-validation";
import { useIssueDevTicket } from "@/app/event/(hook)/mutation/useIssueDevTicket";
import { useAuth } from "@/shared/stores/useAuthStore";

const MAX_CLOTHES_COUNT = 10;

export default function ReservationPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = Number(params.id);
  useHeader({ title: "행사 예약", showBack: true, showMenu: false });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 미리보기 URL 생성 및 메모리 정리
  useEffect(() => {
    const previews = uploadedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedImages]);

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

  // Mutation 훅
  const { mutate: createReservation, isPending } = useCreateReservation();
  const { mutateAsync: issueDevTicket } = useIssueDevTicket();
  const { user } = useAuth();

  const clothesCount = watch("clothesCount");
  const isEmailConsent = watch("isEmailConsent");

  // 다중 이미지 변경 핸들러
  const handleMultipleImageChange = (files: File[]) => {
    setUploadedImages(files);
    setValue("clothImageList", files);
    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 직접 파일 선택 핸들러 (기존 UI용, 5MB 제한)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const remainingSlots = MAX_CLOTHES_COUNT - uploadedImages.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    // 파일 크기 검증 (5MB 제한)
    const validation = validateFilesSize(filesToAdd);
    if (!validation.valid && validation.errors) {
      alert(validation.errors.join("\n"));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const updatedImages = [...uploadedImages, ...filesToAdd];
    handleMultipleImageChange(updatedImages);
  };

  // 폼 제출 핸들러
  const onSubmit = (data: ReservationFormData) => {
    console.log("=== 폼 제출 시작 ===");
    console.log("eventId:", eventId);
    console.log("폼 데이터:", data);
    console.log("업로드된 이미지:", uploadedImages.length, "개");

    // eventId 유효성 검사
    if (!eventId || isNaN(eventId) || eventId <= 0) {
      console.error("유효하지 않은 eventId:", eventId);
      alert("유효하지 않은 행사 ID입니다.");
      return;
    }

    createReservation(
      {
        eventId,
        request: {
          name: data.name,
          phone: data.contact,
          email: data.email,
          clothCount: data.clothesCount,
          marketingConsent: data.isEmailConsent,
        },
        clothImageList: data.clothImageList,
      },
      {
        onSuccess: async (response) => {
          console.log("=== 예약 성공 ===");
          console.log("응답:", response);

          try {
            if (!user?.userId) {
              console.warn(
                "[티켓 발급] userId가 없어 dev 티켓을 발급하지 않습니다."
              );
            } else {
              // TODO: 만료일(expiresAt)은 실제 비즈니스 로직에 맞게 조정 필요
              const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

              await issueDevTicket({
                type: "EVENT",
                targetId: eventId,
                userId: user.userId,
                expiresAt: today,
              });
              console.log("=== Dev 티켓 발급 성공 ===");
            }
          } catch (ticketError) {
            console.error("=== Dev 티켓 발급 실패 ===", ticketError);
          }

          setIsModalOpen(true);
        },
        onError: (error: any) => {
          console.error("=== 예약 실패 (컴포넌트 레벨) ===");
          console.error("에러:", error);
          console.error("에러 응답:", error?.response?.data);
          const errorMessage =
            error?.response?.data?.message ||
            "예약에 실패했습니다. 다시 시도해주세요.";
          alert(errorMessage);
        },
      }
    );
  };

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
                        onClick={() => {
                          const newImages = uploadedImages.filter(
                            (_, i) => i !== index
                          );
                          setUploadedImages(newImages);
                          setValue("clothImageList", newImages);
                        }}
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

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { validateFilesSize } from "@/shared/util/file-validation";
import { useCreateReservation } from "@/app/event/(hook)/mutation/useCreateReservation";
import { useIssueDevTicket } from "@/app/event/(hook)/mutation/useIssueDevTicket";
import { useAuth } from "@/shared/stores/useAuthStore";
import type { ReservationFormData } from "../(schema)/reservationSchema";

const MAX_CLOTHES_COUNT = 10;

interface UseReservationFormProps {
  eventId: number;
  setValue: UseFormSetValue<ReservationFormData>;
  watch: UseFormWatch<ReservationFormData>;
  onSuccess?: () => void;
}

export const useReservationForm = ({
  eventId,
  setValue,
  watch,
  onSuccess,
}: UseReservationFormProps) => {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createReservation, isPending } = useCreateReservation();
  const { mutateAsync: issueDevTicket } = useIssueDevTicket();
  const { user } = useAuth();

  // 이미지 미리보기 URL 생성 및 메모리 정리
  useEffect(() => {
    const previews = uploadedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedImages]);

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

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setValue("clothImageList", newImages);
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
          onSuccess?.();
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

  return {
    // 상태
    uploadedImages,
    imagePreviews,
    isModalOpen,
    isPending,
    fileInputRef,
    // 핸들러
    handleFileChange,
    handleRemoveImage,
    onSubmit,
    setIsModalOpen,
  };
};

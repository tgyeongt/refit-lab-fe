import Image from "next/image";
import { useRef } from "react";
import Icon from "./Icon";
import PencilIcon from "@/assets/icon/pencil.svg";
import { useUpdateProfileImage } from "@/app/my/(hook)/mutation/useUpdateProfileImage";

interface ProfileImgUploaderProps {
  userName: string;
  currentIgmUrl?: string | null;
  onUploadSuccess?: (imageUrl: string) => void;
}

export default function ProfileImgUploader({
  userName,
  currentIgmUrl,
  onUploadSuccess,
}: ProfileImgUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfileImage, isPending: isUpdating } = useUpdateProfileImage();

  // 파일 선택 클릭 시 파일 선택 창 열기
  const handleClickButton = () => fileInputRef.current?.click();

  // 파일 선택 시 파일 업로드 (PUT /api/users/profile-image)
  const handleUploadProfileImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일만 허용
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    updateProfileImage(file, {
      onSuccess: (response) => {
        const imageUrl = response.data;
        onUploadSuccess?.(imageUrl);
      },
      onError: (error) => {
        console.error("프로필 이미지 업로드 실패:", error);
        alert("프로필 이미지 업로드에 실패했습니다.");
      },
    });

    if (e.target) {
      e.target.value = "";
    }
  };

  const src = currentIgmUrl || "/images/default-profile.jpg";

  return (
    <div className="flex items-center gap-3">
      {/* 버튼 + 숨겨진 input */}
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={handleClickButton}
          className="text-sm text-[#642C8D] underline"
          disabled={isUpdating}
        >
          <Icon icon={PencilIcon} color="#642C8D" width={30} height={30} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUploadProfileImage}
        />

        {isUpdating && (
          <span className="text-xs text-gray-500">업로드 중...</span>
        )}
      </div>
    </div>
  );
}

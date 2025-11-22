import Image from "next/image";
import { useUserImgStore } from "../user/stores/useUserImgStore";
import { useRef } from "react";
import Icon from "./Icon";
import PencilIcon from "@/assets/icon/pencil.svg";

interface ProfileImgUploaderProps {
  userName: string;
  currentIgmUrl?: string | null;
}

export default function ProfileImgUploader({
  userName,
  currentIgmUrl,
}: ProfileImgUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadProfileImage, isUpdating, error, profileImage } =
    useUserImgStore();

  // 파일 선택 클릭 시 파일 선택 창 열기
  const handleClickButton = () => fileInputRef.current?.click();

  // 파일 선택 시 파일 업로드
  const handleUploadProfileImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadProfileImage(file);
    } catch (error) {
      console.error(error);
    } finally {
      e.target.value = "";
    }
  };

  const src = profileImage || currentIgmUrl || "/images/default-profile.jpg";

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

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { mypageStyles, cn } from "../(util)/mypage-styles";
import ProfileImgUploader from "@/shared/components/ProfileImgUploader";

interface ProfileSectionProps {
  userName: string | undefined;
  userProfile: string | null;
}

const FALLBACK_SRC = "/assets/image/profile.png";

// 이미지 소스 정규화
function normalizeImageSrc(input?: string | null) {
  const s = (input ?? "").trim();

  // 빈 값 / 가짜 값
  if (!s || s === "null" || s === "undefined") return FALLBACK_SRC;

  // 이미 절대 URL
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  // data/blob
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;

  // //cdn...
  if (s.startsWith("//")) return `https:${s}`;

  if (s.startsWith("/")) return s;
  return `/${s}`;
}

export const ProfileSection = ({
  userName,
  userProfile,
}: ProfileSectionProps) => {
  return (
    <div className={mypageStyles.profile.header}>
      {/* 프로필 컨텐츠 */}
      <div className={mypageStyles.profile.content}>
        {/* 프로필 이미지 */}
        <div
          className={cn(
            "relative",
            "flex",
            "items-center",
            "gap-4",
            "rounded-full",
            "overflow-hidden"
          )}
        >
          <div
            className={cn(
              "w-[81px]",
              "h-[81px]",
              "rounded-full",
              "overflow-hidden",
              "relative"
            )}
          >
            <Image
              src={normalizeImageSrc(userProfile)}
              alt={userName || "김다입님"}
              fill
              className={cn("object-contain")}
            />
          </div>

          <h1 className={mypageStyles.profile.userName}>{userName} 님</h1>
        </div>

        {/* 사용자 이름 및 편집 버튼 */}
        <div className={mypageStyles.profile.userNameContainer}>
          <ProfileImgUploader
            userName={userName || ""}
            currentIgmUrl={userProfile}
          />
        </div>
      </div>
    </div>
  );
};

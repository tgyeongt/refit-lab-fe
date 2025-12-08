"use client";

import Image from "next/image";
import { mypageStyles, cn } from "../(util)/mypage-styles";
import ProfileImgUploader from "@/shared/components/ProfileImgUploader";

interface ProfileSectionProps {
  userName: string;
  userProfile: string;
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
              src={userProfile}
              alt={userName}
              fill
              className={cn("object-contain")}
            />
          </div>

          <h1 className={mypageStyles.profile.userName}>{userName} 님</h1>
        </div>

        {/* 사용자 이름 및 편집 버튼 */}
        <div className={mypageStyles.profile.userNameContainer}>
          <ProfileImgUploader userName={userName} currentIgmUrl={userProfile} />
        </div>
      </div>
    </div>
  );
};

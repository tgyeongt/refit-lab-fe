"use client";

import ArrowLeftIcon from "@/assets/icon/arrow-left.svg";
import LogoIcon from "@/assets/icon/logo.svg";
import ProfileImg from "@/assets/image/Profile.png";
import Image from "next/image";
import { ProfileModal } from "./ProfileModal";
import { useModalActions, useModalInfo } from "@/shared/stores/useModalStore";
import ModalPortal from "@/shared/components/ModalPortal";

// 관리자 페이지 헤더
export const AdminHeader = () => {
  const { isOpen } = useModalInfo();
  const { openModal, closeModal } = useModalActions();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white border-b border-gray-5">
      <div className="flex h-full items-center justify-between px-14">
        {/* 로고 */}
        <div className="w-[60px] h-8 relative">
          <LogoIcon />
        </div>

        {/* 오른쪽: 프로필 & 뒤로가기 */}
        <div className="flex items-center gap-5">
          {/* 프로필 아이콘 */}
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={ProfileImg}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => openModal("profile")}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            aria-label="프로필 메뉴"
          >
            <ArrowLeftIcon className="w-7 h-7 rotate-270" />
          </button>
        </div>
      </div>

      {/* 프로필 모달 */}
      <ModalPortal>
        <ProfileModal isOpen={isOpen} onClose={() => closeModal()} />
      </ModalPortal>
    </header>
  );
};

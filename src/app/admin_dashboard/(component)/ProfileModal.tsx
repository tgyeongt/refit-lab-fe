"use client";

import Image from "next/image";
import ProfileImg from "@/assets/image/Profile.png";
import ProtectIcon from "@/assets/icon/protect.svg";
import Icon from "@/shared/components/Icon";
import XIcon from "@/assets/icon/X.svg";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const buttonItems = [
  {
    id: "event-management",
    title: "행사 관리",
  },
  {
    id: "challenge-management",
    title: "챌린지 관리",
  },
  {
    id: "check-in-management",
    title: "체크인 조회",
  },
  {
    id: "report-generation",
    title: "리포트 생성",
  },
];

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-24 right-14 z-50 w-[236px] bg-white rounded-lg shadow-xl border border-gray-200 pb-2">
      <button
        onClick={onClose}
        className="absolute top-4.5 right-4 hover:bg-gray-1 rounded-sm p-1.5 transition-colors"
      >
        <Icon icon={XIcon} width={12} height={12} color="#9E9E9E" />
      </button>
      {/* 프로필 섹션 */}
      <div className="flex flex-col items-center pt-14 pb-4">
        {/* 프로필 이미지 */}
        <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-[#9E9E9E]">
          <Image src={ProfileImg} alt="Profile" fill className="object-cover" />
        </div>

        {/* 이름 */}
        <h3 className="mt-3 text-xl text-gray-5A tracking-tight">김관리</h3>

        {/* 권한 배지 */}
        <div className="mt-2 px-[11px] py-1 bg-[#EDD5F2] rounded-lg">
          <div className="flex items-center gap-1">
            <Icon icon={ProtectIcon} width={12} height={12} color="#424242" />
            <span className="text-xs text-gray-5A tracking-tight">
              슈퍼 관리자
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[171px] h-px bg-[#BDBDBD] mx-auto" />

      {/* 정보 섹션 */}
      <div className="px-[33px] py-0">
        {/* 이메일 */}
        <div className="h-[38px] flex items-center justify-center">
          <span className="text-sm text-gray-2 tracking-tight">
            admin@example.com
          </span>
        </div>

        {/* 마지막 로그인 */}
        <div className="h-[38px] flex items-center justify-center">
          <span className="text-xs text-gray-2 tracking-tight">
            마지막 로그인: 2025-11-07
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[171px] h-px bg-gray-5 mx-auto" />

      {/* 권한 버튼들 */}
      <div className="px-[58px] py-4.5 grid grid-cols-2 gap-2">
        {buttonItems.map((item) => (
          <button
            key={item.id}
            className="flex-1 h-[23px] flex items-center justify-center bg-gray-1 rounded-lg"
          >
            <span className="text-[10px] text-gray-5A tracking-tight">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* 구분선 */}
      <div className="w-[171px] h-px bg-gray-5 mx-auto" />

      {/* 액션 버튼들 */}
      <div className="px-[34px] pt-0">
        <button className="w-full h-[38px] flex items-center justify-center hover:bg-gray-1 transition-colors">
          <span className="text-[11px] text-gray-7 tracking-tight">
            계정추가
          </span>
        </button>
        <button className="w-full h-[38px] flex items-center justify-center hover:bg-gray-1 transition-colors">
          <span className="text-[11px] text-gray-7 tracking-tight">
            계정관리
          </span>
        </button>
        <button className="w-full h-[38px] flex items-center justify-center hover:bg-gray-1 transition-colors">
          <span className="text-[11px] text-gray-7 tracking-tight">
            로그아웃
          </span>
        </button>
      </div>
    </div>
  );
};

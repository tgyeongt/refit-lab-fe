"use client";

import Image from "next/image";
import ProfileImg from "@/assets/image/Profile.png";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-24 right-14 z-50 w-[236px] bg-white rounded-lg shadow-xl border border-gray-200">
      {/* 프로필 섹션 */}
      <div className="flex flex-col items-center pt-[58px] pb-6">
        {/* 프로필 이미지 */}
        <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-[#9E9E9E]">
          <Image src={ProfileImg} alt="Profile" fill className="object-cover" />
        </div>

        {/* 이름 */}
        <h3 className="mt-3 text-xl font-semibold text-[#424242] tracking-tight">
          김관리
        </h3>

        {/* 권한 배지 */}
        <div className="mt-2 px-[11px] py-1 bg-[#EDD5F2] rounded-lg">
          <div className="flex items-center gap-[12px]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
                fill="#424242"
              />
            </svg>
            <span className="text-xs font-medium text-[#424242] tracking-tight">
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
        <div className="h-[38px] flex items-center">
          <span className="text-sm text-[#4A5565] tracking-tight">
            admin@example.com
          </span>
        </div>

        {/* 마지막 로그인 */}
        <div className="h-[38px] flex items-center">
          <span className="text-xs text-[#4A5565] tracking-tight">
            마지막 로그인: 2025-11-07
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[171px] h-px bg-[#BDBDBD] mx-auto" />

      {/* 권한 버튼들 */}
      <div className="px-[58px] pt-[17px] pb-[6px]">
        <div className="flex gap-2 mb-2">
          <button className="flex-1 h-[23px] px-2 bg-[#EEEEEE] rounded-lg">
            <span className="text-[10px] font-medium text-[#424242] tracking-tight">
              행사 관리
            </span>
          </button>
          <button className="flex-1 h-[23px] px-2 bg-[#EEEEEE] rounded-lg">
            <span className="text-[10px] font-medium text-[#424242] tracking-tight">
              챌린지 관리
            </span>
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 h-[23px] px-2 bg-[#EEEEEE] rounded-lg">
            <span className="text-[10px] font-medium text-[#424242] tracking-tight">
              체크인 조회
            </span>
          </button>
          <button className="flex-1 h-[23px] px-2 bg-[#EEEEEE] rounded-lg">
            <span className="text-[10px] font-medium text-[#424242] tracking-tight">
              리포트 생성
            </span>
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-[171px] h-px bg-[#BDBDBD] mx-auto mt-[14px]" />

      {/* 액션 버튼들 */}
      <div className="px-[34px] pt-0">
        <button className="w-full h-[38px] flex items-center justify-center hover:bg-[#F5F5F7] transition-colors">
          <span className="text-[11px] text-[#4A5565] tracking-tight">
            계정추가
          </span>
        </button>
        <button className="w-full h-[38px] flex items-center justify-center hover:bg-[#F5F5F7] transition-colors">
          <span className="text-[11px] text-[#4A5565] tracking-tight">
            계정관리
          </span>
        </button>
        <button className="w-full h-[38px] flex items-center justify-center hover:bg-[#F5F5F7] transition-colors">
          <span className="text-[11px] text-[#4A5565] tracking-tight">
            로그아웃
          </span>
        </button>
      </div>
    </div>
  );
};


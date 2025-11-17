// src/app/(home)/LoginScreen.tsx
"use client";

import Icon from "@/assets/icon/Icon";
import Logo from "@/assets/icon/logo.svg";
import Kakao from "@/assets/icon/kakao.svg";
import Naver from "@/assets/icon/naver.svg";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const handleLogin = () => {
    localStorage.setItem("accessToken", "test-token");
    onLogin(); // Layout에 로그인 상태 전달
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen max-w-3xl">
      <Icon icon={Logo} size={120} className="mt-[120px]" />

      <div className="flex flex-col gap-[15px] w-full px-6 mt-[100px]">
        <button className="flex items-center justify-center gap-[30px] bg-[#FEE102] py-3 rounded-[5px] font-semibold">
          <Kakao />
          <span>Kakao로 시작하기</span>
        </button>

        <button className="flex items-center justify-center gap-[30px] bg-[#05C050] text-white py-3 rounded-[5px] font-semibold">
          <Naver />
          <span>Naver로 시작하기</span>
        </button>

        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-[30px] bg-[#F6F6F6] text-[#9E9E9E] py-3 rounded-[5px] font-semibold"
        >
          테스트 로그인
        </button>
      </div>

      <button className="mt-[60px] underline text-gray-500">
        Skip for now
      </button>
    </div>
  );
}

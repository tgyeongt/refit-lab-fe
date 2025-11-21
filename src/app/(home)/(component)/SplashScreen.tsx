"use client";
import Icon from "@/shared/components/Icon";
import LogoWhite from "@/assets/icon/logo-white.svg";

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center mx-auto min-h-screen max-w-3xl bg-[#642C8D]">
      <Icon icon={LogoWhite} size={120} />
    </div>
  );
}

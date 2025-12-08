"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useHeaderStore } from "@/shared/stores/headerStore";

import Icon from "@/shared/components/Icon";
import LogoIcon from "@/assets/icon/logo.svg";
import BackIcon from "@/assets/icon/arrow-left.svg";
import MenuIcon from "@/assets/icon/menu.svg";

import Sidebar from "./SideBar";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    title,
    showBack,
    showMenu,
    rightButton,
    setHeader,
    setRightHeader,
    setSidebarOpen,
  } = useHeaderStore();

  // 페이지 이동 시 기본 헤더 초기화
  useEffect(() => {
    setHeader({
      title: "",
      showBack: false,
      showMenu: true,
    });

    // 오른쪽 버튼 초기화 (null)
    setRightHeader(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // pathname 기준 헤더 초기화

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 relative">
        {/* 왼쪽: 로고 or 뒤로가기 */}
        <div className="flex items-center space-x-2 w-1/3">
          {showBack ? (
            <button onClick={() => router.back()}>
              <Icon icon={BackIcon} color="#9E9E9E" size={24} />
            </button>
          ) : (
            <button onClick={() => router.push("/")}>
              <LogoIcon height={29} />
            </button>
          )}
        </div>

        {/* 중앙 title */}
        <div className="flex justify-center w-1/3">
          {title && <span className="text-[16px] font-medium">{title}</span>}
        </div>

        {/* 오른쪽: 메뉴 or 커스텀 버튼 */}
        <div className="flex justify-end w-1/3">
          {rightButton ? (
            <button
              onClick={rightButton.onClick || (() => {})}
              disabled={rightButton.active}
              className={`text-[16px] font-medium transition
                ${rightButton.active ? "text-[#642C8D]" : "text-[#BDBDBD]"}
              `}
            >
              {rightButton.text}
            </button>
          ) : (
            showMenu && (
              <button onClick={() => setSidebarOpen(true)}>
                <MenuIcon width={28} height={28} />
              </button>
            )
          )}
        </div>
      </header>

      <Sidebar />
    </>
  );
}

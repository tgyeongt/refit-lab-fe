"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useHeaderStore } from "@/shared/stores/headerStore";

import Icon from "@/shared/components/Icon";
import LogoIcon from "@/assets/icon/logo.svg";
import BackIcon from "@/assets/icon/arrow-left.svg";
import MenuIcon from "@/assets/icon/menu.svg";
import MoreIcon from "@/assets/icon/more.svg";

import Sidebar from "./SideBar";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const NO_HEADER_PATHS = ["/community/post", "/exchange/post"];

  if (NO_HEADER_PATHS.includes(pathname)) {
    return null;
  }

  const {
    title,
    showBack,
    showMenu,
    isMoreOpen,
    onEdit,
    onDelete,
    setHeader,
    setSidebarOpen,
    setMoreOpen,
  } = useHeaderStore();

  // 페이지 이동 시 헤더 초기화
  useEffect(() => {
    setHeader({
      title: "",
      showBack: false,
      showMenu: true,
      onEdit: undefined,
      onDelete: undefined,
    });
  }, [pathname, setHeader]);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 relative">
        {/* 왼쪽 */}
        <div className="flex items-center w-1/3">
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

        {/* 중앙 */}
        <div className="flex justify-center w-1/3">
          {title && <span className="text-[16px] font-medium">{title}</span>}
        </div>

        {/* 오른쪽 */}
        <div className="flex justify-end w-1/3">
          {showMenu ? (
            <button onClick={() => setSidebarOpen(true)}>
              <MenuIcon width={28} height={28} />
            </button>
          ) : (
            <button onClick={() => setMoreOpen(true)}>
              <MoreIcon width={24} height={24} />
            </button>
          )}
        </div>
      </header>

      {/* More Bottom Sheet */}
      {isMoreOpen && !showMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMoreOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50">
            <button
              className="w-full py-4 text-left px-6"
              onClick={() => {
                onEdit?.();
                setMoreOpen(false);
              }}
            >
              수정
            </button>

            <button
              className="w-full py-4 text-left px-6 text-red-500"
              onClick={() => {
                onDelete?.();
                setMoreOpen(false);
              }}
            >
              삭제
            </button>

            <button
              className="w-full py-3 text-center text-gray-400"
              onClick={() => setMoreOpen(false)}
            >
              취소
            </button>
          </div>
        </>
      )}

      <Sidebar />
    </>
  );
}

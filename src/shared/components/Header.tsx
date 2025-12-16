"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  const NO_HEADER_PATHS = ["/community/post", "/exchange/post"];

  if (NO_HEADER_PATHS.includes(pathname)) {
    return null;
  }

  const {
    title,
    showBack,
    showMenu,
    onEdit,
    onDelete,
    setHeader,
    setSidebarOpen,
    setMoreOpen,
  } = useHeaderStore();

  const [isMoreOpen, setIsMoreOpen] = useState(false);

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

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <button onClick={() => setIsMoreOpen((prev) => !prev)}>
              <MoreIcon width={20} height={20} />
            </button>
          )}
          {/* ✅ 드롭다운 메뉴 */}
          {isMoreOpen && !showMenu && (
            <div className="absolute right-0 top-8 w-[100px] bg-white shadow-md rounded-md p-1 text-sm z-50">
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                onClick={() => {
                  onEdit?.();
                  setIsMoreOpen(false);
                }}
              >
                수정
              </button>

              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                onClick={() => {
                  onDelete?.();
                  setIsMoreOpen(false);
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </header>

      <Sidebar />
    </>
  );
}

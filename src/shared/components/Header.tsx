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

  const NO_HEADER_PATHS = [
    "/community/post",
    "/exchange/post",
    "/exchange/chat",
  ];
  const hideHeader = NO_HEADER_PATHS.includes(pathname);

  const {
    title,
    showBack,
    showMenu,
    onDelete,
    setHeader,
    setSidebarOpen,
    isAuthor,
  } = useHeaderStore();

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    if (hideHeader) return;

    setHeader({
      title: "",
      showBack: false,
      showMenu: true,
      onDelete: undefined,
      isAuthor: false,
    });
  }, [pathname, hideHeader, setHeader]);

  useEffect(() => {
    if (hideHeader) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hideHeader]);

  if (hideHeader) return null;

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 relative">
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

        <div className="flex justify-center w-1/3">
          {title && <span className="text-[16px] font-medium">{title}</span>}
        </div>

        <div className="flex justify-end w-1/3 relative" ref={menuRef}>
          {showMenu ? (
            <button onClick={() => setSidebarOpen(true)}>
              <MenuIcon width={28} height={28} />
            </button>
          ) : (
            <button onClick={() => setIsMoreOpen((prev) => !prev)}>
              <MoreIcon width={20} height={20} />
            </button>
          )}

          {isMoreOpen && !showMenu && (
            <div className="absolute right-0 top-8 w-[120px] bg-white shadow-md rounded-md p-1 text-sm z-50">
              {isAuthor ? (
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => {
                    onDelete?.();
                    setIsMoreOpen(false);
                  }}
                >
                  삭제
                </button>
              ) : (
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  onClick={() => {
                    alert("신고 기능 실행");
                    setIsMoreOpen(false);
                  }}
                >
                  신고
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <Sidebar />
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useHeaderStore } from "@/shared/stores/headerStore";

import LogoIcon from "@/assets/icon/logo.svg";
import BackIcon from "@/assets/icon/arrow-left.svg";
import MenuIcon from "@/assets/icon/menu.svg";

export default function Header() {
  const router = useRouter();
  const { title, showBack, showMenu } = useHeaderStore();

  return (
    <header className="flex items-center justify-between px-4 py-3">
      {/* 왼쪽: 로고 or 뒤로가기 */}
      <div className="flex items-center space-x-2 w-1/3">
        {showBack ? (
          <button onClick={() => router.back()}>
            <BackIcon width={24} height={24} />
          </button>
        ) : (
          <LogoIcon height={29} />
        )}
      </div>

      {/* 중앙: title */}
      <div className="flex justify-center w-1/3">
        {title && <span className="text-lg font-medium">{title}</span>}
      </div>

      {/* 오른쪽: menu */}
      <div className="flex justify-end w-1/3">
        {showMenu && (
          <button>
            <MenuIcon width={24} height={24} />
          </button>
        )}
      </div>
    </header>
  );
}

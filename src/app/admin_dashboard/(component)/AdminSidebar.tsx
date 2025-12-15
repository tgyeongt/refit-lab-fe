"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import Icon from "@/shared/components/Icon";
import HomeIcon from "@/assets/icon/home.svg";
import ChartIcon from "@/assets/icon/chart.svg";
import CommunityIcon from "@/assets/icon/people.svg";
import TagIcon from "@/assets/icon/ticket.svg";
import QRCodeIcon from "@/assets/icon/QR.svg";
import PartyReservIcon from "@/assets/icon/party-reserv.svg";

// 네비게이션 아이콘 목록
type NavIconName = "home" | "party" | "chart" | "tag" | "qr" | "community";

// 네비게이션 메뉴 아이템
interface NavMenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

// 네비게이션 메뉴 아이템
const NAV_MENU_ITEMS_MOCK: NavMenuItem[] = [
  {
    id: "home",
    label: "홈",
    icon: "home",
    path: "/admin_dashboard",
  },
  {
    id: "party-registration",
    label: "행사 등록",
    icon: "party",
    path: "/admin_dashboard/party_reservation",
  },
  {
    id: "exchange",
    label: "교환 현황",
    icon: "tag",
    path: "#",
  },
  {
    id: "community",
    label: "커뮤니티 관리",
    icon: "community",
    path: "#",
  },
  {
    id: "checkin",
    label: "체크인 현황",
    icon: "qr",
    path: "#",
  },
  {
    id: "impact",
    label: "임팩트 리포트",
    icon: "chart",
    path: "#",
  },
];

const NAV_ICON_COMPONENTS: Record<NavIconName, typeof HomeIcon> = {
  home: HomeIcon,
  party: PartyReservIcon,
  tag: TagIcon,
  qr: QRCodeIcon,
  community: CommunityIcon,
  chart: ChartIcon,
};

interface NavIconProps {
  name: NavIconName;
  isActive: boolean;
}

// 네비게이션 아이콘
const NavIcon = ({ name, isActive }: NavIconProps) => {
  const iconComponent = NAV_ICON_COMPONENTS[name];

  if (!iconComponent) return null;
  return (
    <Icon
      icon={iconComponent}
      className={clsx("w-5 h-5 text-gray-5A", isActive && "text-purple")}
      strokeWidth={2}
    />
  );
};

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isActive, setIsActive] = useState<NavIconName>("home");

  // 경로에 따라 활성 메뉴 설정
  useEffect(() => {
    if (pathname.includes("party_reservation")) {
      setIsActive("party");
    } else if (pathname === "/admin_dashboard") {
      setIsActive("home");
    }
  }, [pathname]);

  const handleClickNavItem = (item: NavMenuItem) => {
    setIsActive(item.icon as NavIconName);
    router.push(item.path);
  };

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-[219px] bg-white border-r border-gray-5">
      <nav className="flex flex-col">
        {/* 네비게이션 메뉴 */}
        {NAV_MENU_ITEMS_MOCK.map((item) => {
          return (
            <button
              key={item.id}
              type="button"
              className={clsx(
                "h-20 flex items-center gap-4 px-8  transition-colors cursor-pointer",
                isActive === (item.icon as NavIconName)
                  ? "bg-[#F4E4FF]"
                  : "hover:bg-gray-1"
              )}
              onClick={() => handleClickNavItem(item)}
            >
              <NavIcon
                name={item.icon as NavIconName}
                isActive={isActive === (item.icon as NavIconName)}
              />
              <span
                className={clsx(
                  "text-xl",
                  isActive === (item.icon as NavIconName)
                    ? "text-purple"
                    : "text-gray-5A"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

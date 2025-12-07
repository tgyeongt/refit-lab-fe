"use client";

import { usePathname } from "next/navigation";
import { NAV_MENU_ITEMS_MOCK } from "@/shared/mocks/admin-dashboard-mock";
import { clsx } from "clsx";
import Icon from "@/shared/components/Icon";
import HomeIcon from "@/assets/icon/home.svg";
import ChartIcon from "@/assets/icon/chart.svg";
import CommunityIcon from "@/assets/icon/community.svg";
import TagIcon from "@/assets/icon/ticket.svg";
import QRCodeIcon from "@/assets/icon/QR.svg";
import CalendarIcon from "@/assets/icon/calendar.svg";

// 네비게이션 아이콘 목록
const IconComponent = [
  {
    name: "home",
    icon: HomeIcon,
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
  },
  {
    name: "chart",
    icon: ChartIcon,
  },
  {
    name: "tag",
    icon: TagIcon,
  },
  {
    name: "qr",
    icon: QRCodeIcon,
  },
  {
    name: "community",
    icon: CommunityIcon,
  },
];

// 네비게이션 아이콘
const NavIcon = ({ icon, isActive }: { icon: string; isActive: boolean }) => {
  const iconClass = clsx("w-5 h-5 text-gray-5A", isActive && "text-purple");
  const iconComponent = IconComponent.find((item) => item.name === icon);

  if (!iconComponent) return null;
  return (
    <Icon icon={iconComponent.icon} className={iconClass} strokeWidth={2} />
  );
};

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-[219px] bg-white border-r border-gray-5">
      <nav className="flex flex-col">
        {/* 네비게이션 메뉴 */}
        {NAV_MENU_ITEMS_MOCK.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.id}
              type="button"
              className={clsx(
                "h-20 flex items-center gap-4 px-8 border-b border-gray-5 transition-colors",
                isActive ? "bg-white" : "hover:bg-gray-1"
              )}
              onClick={() => isActive}
            >
              <NavIcon icon={item.icon} isActive={isActive} />
              <span
                className={clsx(
                  "text-xl",
                  isActive
                    ? "font-semibold text-purple"
                    : "font-medium text-gray-5A"
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

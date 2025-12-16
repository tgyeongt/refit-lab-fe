"use client";

import { useHeaderStore } from "@/shared/stores/headerStore";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import Icon from "@/shared/components/Icon";

import CloseIcon from "@/assets/icon/close.svg";
import HomeIcon from "@/assets/icon/home.svg";
import ExchangeIcon from "@/assets/icon/exchange.svg";
import EventIcon from "@/assets/icon/event.svg";
import CommunityIcon from "@/assets/icon/community.svg";
import MyPageIcon from "@/assets/icon/mypage.svg";

import DummyImg from "@/assets/image/Profile.png";
import { useMyPage } from "@/app/my/(hook)/query/useMyPage";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useHeaderStore();
  const { data: myPage } = useMyPage();

  if (!isSidebarOpen) return null;

  const userName = myPage?.data?.user?.nickname ?? "님";
  const profileImage = myPage?.data?.user?.profileImageUrl ?? DummyImg;

  const menuItems = [
    { label: "홈", path: "/", icon: HomeIcon },
    { label: "의류 교환", path: "/exchange", icon: ExchangeIcon },
    { label: "행사 예약", path: "/event", icon: EventIcon },
    { label: "커뮤니티", path: "/community", icon: CommunityIcon },
    { label: "마이페이지", path: "/my", icon: MyPageIcon },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/50 z-40"
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`
          relative ml-auto h-full w-[50vw] max-w-[200px] bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full p-[15px] pt-0 text-[14px]">
          <div className="flex items-center justify-between pt-6 pb-[20px] border-b border-[#9E9E9E]">
            <div className="flex items-center space-x-3">
              <Image
                src={profileImage}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full object-cover aspect-square"
              />
              <span className="font-semibold mr-[3px]">{userName}</span>
            </div>

            <button onClick={() => setSidebarOpen(false)}>
              <CloseIcon width={13} height={13} />
            </button>
          </div>

          <nav className="flex flex-col space-y-[7px] text-[16px] mt-[20px]">
            {menuItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              const activeColor = "#642C8D";
              const inactiveColor = "#141414";

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`
                    flex items-center space-x-3 text-left px-3 py-3
                    ${isActive ? "bg-[#F5F5F7]" : ""}
                  `}
                  style={{
                    color: isActive ? activeColor : inactiveColor,
                  }}
                >
                  <Icon
                    icon={item.icon}
                    size={20}
                    className="text-current [&_*]:stroke-current"
                    style={{
                      color: isActive ? activeColor : inactiveColor,
                    }}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Icon from "@/shared/components/Icon";
import BackIcon from "@/assets/icon/arrow-left.svg";

interface ChatHeaderProps {
  username: string;
  profileUrl: string;
  onBack: () => void;
}

export default function ChatHeader({
  username,
  profileUrl,
  onBack,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center px-4 py-3 border-b border-gray-200 bg-white">
      <button onClick={onBack} className="mr-3">
        <Icon icon={BackIcon} color="#9E9E9E" size={24} />
      </button>

      <Image
        src={profileUrl}
        alt={username}
        width={40}
        height={40}
        className="rounded-full object-contain mr-3"
      />

      <span className="font-medium text-gray-900 text-[16px]">{username}</span>
    </header>
  );
}

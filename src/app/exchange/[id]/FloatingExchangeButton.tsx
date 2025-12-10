"use client";

import { useRouter } from "next/navigation";

interface FloatingExchangeButtonProps {
  onClick?: () => void;
}

export default function FloatingExchangeButton({
  onClick,
}: FloatingExchangeButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    router.push("/exchange/local"); // 이동
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 
        z-50 
        px-[10px] pb-[15px] pt-[10px]
        pointer-events-none bg-white
      "
    >
      <button
        onClick={handleClick}
        className="
          w-full bg-[#8F53BB] text-white font-[14px]
          flex items-center justify-center 
          px-[20px] py-[15px] rounded-[8px]
          pointer-events-auto
        "
      >
        교환 요청하기
      </button>
    </div>
  );
}

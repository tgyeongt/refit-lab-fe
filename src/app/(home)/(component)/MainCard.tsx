import Image from "next/image";

export interface MainCardProps {
  dday: string; // 예: "D-3"
  title: string; // 예: "청바지 리폼 클래스"
  location: string; // 예: "서울 성동구"
  image: string; // 배경 이미지 경로
}

export default function MainCard({
  dday,
  title,
  location,
  image,
}: MainCardProps) {
  return (
    <div className="relative w-full h-[55vw] max-h-[380px] rounded-2xl overflow-hidden shadow-md">
      <Image src={image} alt={title} fill className="object-cover" priority />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-5 text-white">
        <span className="text-sm font-semibold mb-1">{dday}</span>
        <span className="text-xl font-bold mb-1">{title}</span>
        <span className="text-sm opacity-90">{location}</span>
      </div>
    </div>
  );
}

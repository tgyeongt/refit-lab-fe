import Image from "next/image";
import type { StaticImageData } from "next/image";
import Location from "@/assets/icon/pin.svg";

export interface MainCardProps {
  dday: string;
  title: string;
  location: string;
  image: string | StaticImageData;
}

export default function MainCard({
  dday,
  title,
  location,
  image,
}: MainCardProps) {
  return (
    <div className="relative w-full h-[55vw] max-h-[380px] overflow-hidden shadow-md">
      <Image src={image} alt={title} fill className="object-cover" priority />

      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-5 text-white">
        <div className="bg-[#E42938] rounded-[5px] px-[12px] py-[3px] inline-flex self-start mb-2">
          <span className="text-[10px] font-medium">D-{dday}</span>
        </div>

        <span className="text-[20px] font-semibold mb-1">{title}</span>

        <div className="flex items-center gap-[4px]">
          <Location width={18.25} height={18.25} color="white" />
          <span className="text-[14px] font-medium">{location}</span>
        </div>
      </div>
    </div>
  );
}

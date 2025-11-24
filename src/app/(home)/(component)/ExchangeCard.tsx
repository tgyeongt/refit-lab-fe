import Link from "next/link";
import Image from "next/image";
import DummyImg from "@/assets/image/Profile.png";

interface ExchangeCardProps {
  id: number;
  title: string;
  location: string;
}

export default function ExchangeCard({
  id,
  title,
  location,
}: ExchangeCardProps) {
  return (
    <Link href={`/exchange/${id}`}>
      <div
        className="
          flex-shrink-0 w-[205px] flex flex-col cursor-pointer
          bg-white rounded-[8px]
          shadow-[0_4px_4px_rgba(0,0,0,0.10)]
        "
      >
        <div className="rounded-t-[8px] overflow-hidden">
          <Image
            src={DummyImg}
            alt={title}
            width={200}
            height={175}
            className="w-full h-[175px] object-cover"
          />
        </div>

        <div className="px-[20px] py-[20px]">
          <h2 className="text-[18px] font-semibold">{title}</h2>
          <p className="text-[12px] text-[#424242]">{location}</p>
        </div>
      </div>
    </Link>
  );
}

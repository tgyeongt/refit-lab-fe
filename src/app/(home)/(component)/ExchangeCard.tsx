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
    <Link
      href={`/exchange/${id}`}
      style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.10)" }}
    >
      <div className="flex-shrink-0 w-[240px] flex flex-col items-start cursor-pointer">
        <div className="w-full rounded-t-[8px] overflow-hidden">
          <Image
            src={DummyImg}
            alt={title}
            width={200}
            height={170}
            className="w-full h-[170px] object-cover"
          />
        </div>
        <div className="pl-[20px] py-[30px] rounded-b-[8px]">
          <h2 className="text-[18px] font-semibold">{title}</h2>
          <p className="text-[12px] text-[#424242]">{location}</p>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";
import Location from "@/assets/icon/pin.svg";
import { ExchangePost } from "@/app/exchange/(api)/getExchangeList";

interface ExchangeCardProps {
  item: ExchangePost;
}

export default function ExchangeCard({ item }: ExchangeCardProps) {
  return (
    <Link href={`/exchange/${item.exchangePostId}`}>
      <div
        className="
          flex-shrink-0 w-[205px] flex flex-col cursor-pointer
          bg-white rounded-[8px]
          shadow-[0_4px_4px_rgba(0,0,0,0.10)]
        "
      >
        <div className="rounded-t-[8px] overflow-hidden">
          <Image
            src={item.thumbnailImageUrl}
            alt={item.title}
            width={200}
            height={175}
            className="w-full h-[175px] object-cover"
          />
        </div>

        <div className="px-[20px] py-[20px]">
          <h2 className="text-[18px] font-semibold">{item.title}</h2>
          <div className="flex gap-[3px] mt-[7px] items-center">
            <Location width={17} height={17} />
            <span className="text-[12px] text-[#424242]">
              {item.exchangeSpot}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

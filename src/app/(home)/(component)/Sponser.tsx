import Image from "next/image";
import SponserImg from "@/assets/image/sponser.png";

export default function Sponser() {
  return (
    <div className="my-[30px] relative w-screen h-[50vw]">
      <Image
        src={SponserImg}
        alt="스폰서 이미지"
        fill
        className="object-cover"
      />
    </div>
  );
}

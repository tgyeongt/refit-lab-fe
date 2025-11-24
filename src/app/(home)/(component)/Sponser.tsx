import Image from "next/image";
import SponserImg from "@/assets/image/sponser.png";

export default function Sponser() {
  return (
    <div className="my-[30px]">
      <Image src={SponserImg} alt="스폰서 이미지" />
    </div>
  );
}

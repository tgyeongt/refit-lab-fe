import ProfileImg from "@/assets/image/Profile.png";
import CircleExchangeIcon from "@/assets/icon/circle-exchange.svg";
import ReceiptIcon from "@/assets/icon/receipt.svg";
import FireworkIcon from "@/assets/icon/firework.svg";
import WriteIcon from "@/assets/icon/write.svg";
import { FC, SVGProps } from "react";

export interface MyPageUser {
  id: number;
  userName: string;
  userProfile: string;
  membershipLevel: string;
  ticketCount: number;
  exchangeCount: number;
  carbonReduction: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface MyPageMenu {
  exchange: MenuItem[];
  activity: MenuItem[];
}

// 목데이터
export const myPageUser: MyPageUser = {
  id: 1,
  userName: "김재생",
  userProfile: ProfileImg.src,
  membershipLevel: "맴버쉽 등급",
  ticketCount: 0,
  exchangeCount: 5,
  carbonReduction: 750,
};

export const myPageMenu: MyPageMenu = {
  exchange: [
    {
      id: "exchange-history",
      label: "교환 내역",
      icon: CircleExchangeIcon,
    },
    {
      id: "receipt-history",
      label: "환경영수증 발급 내역",
      icon: ReceiptIcon,
    },
  ],
  activity: [
    {
      id: "party-history",
      label: "참가한 21% 파티",
      icon: FireworkIcon,
    },
    {
      id: "experience-posts",
      label: "내 경험 공유 글",
      icon: WriteIcon,
    },
  ],
};

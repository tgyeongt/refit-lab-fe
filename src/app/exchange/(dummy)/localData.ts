import CardiganImg from "@/assets/image/cardigan.png";

export interface CardItem {
  id: number;
  title: string;
  station: string;
  image: string;
}

export const localData: CardItem[] = [
  {
    id: 11,
    title: "프리사이즈 흰색 후드",
    station: "교환 희망역",
    image: CardiganImg.src,
  },
  {
    id: 12,
    title: "봄 아우터",
    station: "교환 희망역",
    image: "/mock/cardigan.png",
  },
  {
    id: 13,
    title: "숏 자켓",
    station: "교환 희망역",
    image: "/mock/cardigan.png",
  },
];

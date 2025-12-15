import CardiganImg from "@/assets/image/cardigan.png";

export interface CardItem {
  id: number;
  title: string;
  tags: string[];
  likes: number;
  image: string;
}

export const recommendData: Record<string, CardItem[]> = {
  아우터: [
    {
      id: 1,
      title: "가을 가디건",
      tags: [
        "#주황가디건의_환생프로젝트",
        "#비타민C_룩북",
        "#오렌지와_가을_사이",
      ],
      likes: 32,
      image: CardiganImg.src,
    },
    {
      id: 2,
      title: "봄 아우터",
      tags: ["#산뜻함", "#레이어드", "#활용도"],
      likes: 22,
      image: "/mock/cardigan.png",
    },
    {
      id: 3,
      title: "숏 자켓",
      tags: ["#트렌디", "#캐주얼", "#필수템"],
      likes: 41,
      image: "/mock/cardigan.png",
    },
  ],

  티셔츠: [
    {
      id: 4,
      title: "화이트 티셔츠",
      tags: ["#베이직", "#필수템", "#코디쉬움"],
      likes: 55,
      image: "/mock/cardigan.png",
    },
    {
      id: 5,
      title: "프린팅 티셔츠",
      tags: ["#포인트", "#스트릿", "#감성"],
      likes: 18,
      image: "/mock/cardigan.png",
    },
    {
      id: 6,
      title: "롱슬리브 티",
      tags: ["#편안함", "#간절기", "#레이어드"],
      likes: 29,
      image: "/mock/cardigan.png",
    },
  ],

  치마: [
    {
      id: 7,
      title: "플리츠 스커트",
      tags: ["#여성스러움", "#하객룩", "#데일리"],
      likes: 38,
      image: "/mock/cardigan.png",
    },
    {
      id: 8,
      title: "데님 스커트",
      tags: ["#캐주얼", "#트렌디", "#활동성"],
      likes: 27,
      image: "/mock/cardigan.png",
    },
    {
      id: 9,
      title: "롱 스커트",
      tags: ["#포근함", "#겨울룩", "#부드러움"],
      likes: 15,
      image: "/mock/cardigan.png",
    },
  ],
  바지: [
    {
      id: 10,
      title: "스트레이트 팬츠",
      tags: ["#데일리", "#깔끔한핏", "#직장인"],
      likes: 49,
      image: "/mock/cardigan.png",
    },
    {
      id: 11,
      title: "조거 팬츠",
      tags: ["#편안함", "#홈웨어", "#캐주얼"],
      likes: 33,
      image: "/mock/cardigan.png",
    },
    {
      id: 12,
      title: "데님 팬츠",
      tags: ["#기본템", "#활용도", "#내구성"],
      likes: 61,
      image: "/mock/cardigan.png",
    },
  ],

  모자: [
    {
      id: 13,
      title: "버킷햇",
      tags: ["#여름템", "#데일리", "#트렌디"],
      likes: 21,
      image: "/mock/cardigan.png",
    },
    {
      id: 14,
      title: "볼캡",
      tags: ["#캐주얼", "#스트릿", "#활동적"],
      likes: 44,
      image: "/mock/cardigan.png",
    },
    {
      id: 15,
      title: "비니",
      tags: ["#겨울필수", "#포근함", "#보온성"],
      likes: 19,
      image: "/mock/cardigan.png",
    },
  ],
};

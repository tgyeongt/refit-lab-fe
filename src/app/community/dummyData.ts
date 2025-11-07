export interface CommunityPost {
  id: number;
  title: string;
  description: string;
  time: string;
  likes: number;
  comments: number;
  tag: string;
}

export const dataMap: Record<string, CommunityPost[]> = {
  "자유 질문": [
    {
      id: 1,
      tag: "자유 질문",
      title: "수선 어떻게 시작하셨나요?",
      description: "수선이 너무 어렵네요",
      time: "11:15",
      likes: 5,
      comments: 2,
    },
    {
      id: 2,
      tag: "자유 질문",
      title: "21파티 관련 질문드립니다.",
      description: "사람들 많나요?",
      time: "10:40",
      likes: 8,
      comments: 1,
    },
  ],
  "수선 꿀팁": [
    {
      id: 3,
      tag: "수선 꿀팁",
      title: "청바지 기장 수선 꿀팁",
      description: "접지 않고 깔끔하게 자르는 법을 공유해요.",
      time: "14:20",
      likes: 10,
      comments: 4,
    },
    {
      id: 4,
      tag: "수선 꿀팁",
      title: "패딩 지퍼 교체 비용 절약법",
      description: "부품만 구매하면 훨씬 저렴해요.",
      time: "15:10",
      likes: 7,
      comments: 0,
    },
  ],
  "정보 공유": [
    {
      id: 5,
      tag: "정보 공유",
      title: "서울 신촌 근처 좋은 수선집 추천",
      description: "친절하고 꼼꼼하게 해주세요!",
      time: "13:45",
      likes: 11,
      comments: 2,
    },
    {
      id: 6,
      tag: "정보 공유",
      title: "원단별 세탁 방법",
      description: "울, 린넨, 면 각각 다르게 관리해야 해요.",
      time: "12:30",
      likes: 9,
      comments: 1,
    },
  ],
};

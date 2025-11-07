import ProfileImg from "@/assets/image/Profile.png";

export interface Comment {
  id: number;
  userName: string;
  userProfile: string;
  content: string;
  time: string;
  replies?: Comment[];
}

export interface CommunityPost {
  id: number;
  tag: string;
  title: string;
  description: string;
  time: string;
  likes: number;
  comments: number;
  userName: string;
  userProfile: string;
  commentList?: Comment[];
}

export const dataMap: Record<string, CommunityPost[]> = {
  "자유 질문": [
    {
      id: 1,
      tag: "자유 질문",
      title: "수선 어떻게 시작하셨나요?",
      description:
        "처음엔 재봉틀 돌리는 게 어렵더라고요. 다들 어떻게 시작하셨나요?",
      time: "11:15",
      likes: 5,
      comments: 2,
      userName: "김민지",
      userProfile: ProfileImg.src,
      commentList: [
        {
          id: 1,
          userName: "이준호",
          userProfile: ProfileImg.src,
          content: "저는 엄마한테 배웠어요 ㅎㅎ",
          time: "11:30",
          replies: [
            {
              id: 2,
              userName: "김민지",
              userProfile: ProfileImg.src,
              content: "우와 부럽네요!",
              time: "11:40",
            },
          ],
        },
        {
          id: 3,
          userName: "박수연",
          userProfile: ProfileImg.src,
          content: "저도 독학했어요. 유튜브 영상 추천드려요!",
          time: "11:45",
        },
      ],
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
      userName: "홍길동",
      userProfile: ProfileImg.src,
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
      userName: "이서연",
      userProfile: ProfileImg.src,
    },
  ],
};

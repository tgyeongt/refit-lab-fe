// 행사 상세 정보 (Mock 전용)
export interface EventDetailMock {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  thumbnailUrl: string;
  // 행사 정보 카드 데이터
  info: {
    date: string;
    location: string;
    participantCapacity: string;
    totalClothesExchanged: string;
    recycledItems?: string;
  };
  // 갤러리 이미지 URL 배열 (최소 4개, 2x2 그리드)
  galleryImages: string[];
  // 갤러리 총 개수 (더보기 텍스트에 사용)
  totalGalleryCount: number;
  // 예약 가능 여부
  isReservable: boolean;
}

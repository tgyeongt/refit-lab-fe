import { BaseResponse } from "@/shared/api/BaseResponse";

// 사용자 정보 타입
export interface MyPageUser {
  userId: number;
  profileImageUrl: string;
  nickname: string;
  username: string;
  locationConsent: boolean;
}

// 탄소 변경 이력 타입
export interface CarbonChange {
  changedAt: string;
  totalAfterG: number;
  deltaG: number;
}

// 마이페이지 데이터 타입
export interface MyPageData {
  isLoggedIn: boolean;
  user: MyPageUser;
  exchangeCount: number;
  totalReducedCarbonG: number;
  carbonChangeList: CarbonChange[];
}

// 마이페이지 조회 응답 타입
export type ResponseMyPage = BaseResponse<MyPageData>;

export interface UpdateProfileImageRequest {
  profileImage: File;
}

// 프로필 이미지 업데이트 응답 타입
export type ResponseProfileImage = BaseResponse<string>;



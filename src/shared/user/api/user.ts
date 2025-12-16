import { AxiosError } from "axios";
import { privateAPI } from "../../api/apiInstance";
import { BaseResponse } from "../../api/BaseResponse";

// 사용자 정보 타입 (GET /api/users)
export interface UserInfo {
  userId: number;
  profileImageUrl: string;
  nickname: string;
  username: string;
  locationConsent: boolean;
}

export type ResponseUserInfo = BaseResponse<UserInfo>;

// 현재 로그인한 사용자 정보 조회: GET /api/users
export const getUserInfo = async (): Promise<ResponseUserInfo> => {
  try {
    const { data } = await privateAPI.get<ResponseUserInfo>("/users");
    return data;
  } catch (error) {
    console.error("[getUserInfo] 사용자 정보 조회 실패:", error);
    const axiosError = error as AxiosError;
    throw new Error(
      (axiosError.response?.data as { message: string }).message ||
        "Failed to fetch user info"
    );
  }
};

// 사용자 프로필 이미지 업데이트
export const updateUserProfileImage = async (
  profileImage: string
): Promise<BaseResponse<string>> => {
  try {
    const { data } = await privateAPI.put<BaseResponse<string>>(
      `/users/profile-image`,
      {
        profileImage,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    const axiosError = error as AxiosError;
    throw new Error(
      (axiosError.response?.data as { message: string }).message ||
        "Failed to update user profile image"
    );
  }
};

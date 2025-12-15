import { AxiosError } from "axios";
import { privateAPI } from "../../api/apiInstance";
import { BaseResponse } from "../../api/BaseResponse";

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

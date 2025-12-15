import { privateAPI } from "./apiInstance";
import { BaseResponse } from "./BaseResponse";

// 프로필 이미지 업로드 API
export const uploadProfileImage = async (
  file: File
): Promise<BaseResponse<string>> => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const { data } = await privateAPI.put<BaseResponse<string>>(
    "/users/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

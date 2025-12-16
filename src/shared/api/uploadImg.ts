import { AxiosError } from "axios";
import { BaseResponse } from "./BaseResponse";
import { privateAPI } from "./apiInstance";

interface UploadImageToS3Response {
  imageUrl: string;
}

enum UploadImageToS3PathName {
  PROFILE_IMAGE = "PROFILE_IMAGE",
  FOLDER = "FOLDER",
}

// S3에 이미지 업로드(개발용)
export const uploadImageToS3 = async (
  file: File
): Promise<BaseResponse<UploadImageToS3Response>> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await privateAPI.post("s3/dev/image-upload", formData, {
      params: {
        pathName: UploadImageToS3PathName.PROFILE_IMAGE,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("S3 업로드 실패: ", error.response?.data.message);
      throw new Error(error.response?.data.message);
    }
    console.error("예상치 못한 오류: ", error);
    throw new Error("예상치 못한 오류가 발생했습니다.");
  }
};

import { privateAPI } from "@/shared/api/apiInstance";

export const createExchangePost = async (request: any, imageList: File[]) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify(request));

  imageList.forEach((file) => {
    formData.append("imageList", file);
  });

  const { data } = await privateAPI.post("/exchanges/new", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};

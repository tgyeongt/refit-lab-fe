import { privateAPI } from "@/shared/api/apiInstance";

interface PostNewPostRequest {
  postCategory: string;
  title: string;
  content: string;
  imageList?: File[];
}

export const postNewPost = async (data: PostNewPostRequest) => {
  const { postCategory, title, content, imageList = [] } = data;

  const formData = new FormData();

  formData.append(
    "request",
    new Blob(
      [
        JSON.stringify({
          postCategory,
          title,
          content,
        }),
      ],
      { type: "application/json" }
    )
  );

  imageList.forEach((file) => {
    formData.append("imageList", file);
  });

  const response = await privateAPI.post("/posts/new", formData);
  return response.data;
};

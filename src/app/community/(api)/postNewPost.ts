"use client";

import axios from "axios";

export interface NewPostPayload {
  postCategory: string;
  title: string;
  content: string;
  imageList?: File[];
}

export const postNewPost = async (payload: NewPostPayload, token: string) => {
  const formData = new FormData();

  formData.append("postCategory", payload.postCategory);
  formData.append("title", payload.title);
  formData.append("content", payload.content);

  if (payload.imageList && payload.imageList.length > 0) {
    payload.imageList.forEach((file) => {
      formData.append("imageList", file);
    });
  }

  const { data } = await axios.post(
    "https://api.refitlab.site/api/posts/new",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!data.success) throw new Error(data.message || "게시글 등록 실패");

  return data.data;
};

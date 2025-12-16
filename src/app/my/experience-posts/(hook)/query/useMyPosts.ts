"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/shared/constants/key";
import { useAuthInfo } from "@/shared/stores/useAuthStore";
import { getMyPosts } from "../../(api)/get-my-posts";
import type { MyPostsPageData, MyExperiencePostCard } from "../../(types)/myPosts";
import { mapMyPostFromApi } from "../../(types)/myPosts";

export const useMyPosts = (page: number, size: number) => {
  const { hydrated, isLoggedIn } = useAuthInfo();

  const query = useQuery({
    queryKey: [QUERY_KEY.myPosts, page, size],
    queryFn: () => getMyPosts({ page, size }),
    enabled: hydrated && isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });

  const data: MyPostsPageData | undefined = query.data?.data;
  const posts: MyExperiencePostCard[] = data
    ? data.items.map((item) => mapMyPostFromApi(item))
    : [];

  return {
    ...query,
    posts,
    pagination: data
      ? {
          page: data.page,
          size: data.size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          hasNext: data.hasNext,
        }
      : undefined,
  };
};



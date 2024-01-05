import axiosInstance from '@/api/config'
import type { CreatePostRequest, PostsRequest, PostsResponse } from '@/model/Post'

export const fetchPosts = async (req?: PostsRequest, pageParam?: number) =>
  (
    await axiosInstance.get<PostsResponse>('/posts', {
      params: {
        ...req?.queryParams,
        page: pageParam
      }
    })
  ).data

export const createPost = async ({ payload }: CreatePostRequest) =>
  (await axiosInstance.post('/posts', payload)).data

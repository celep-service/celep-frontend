import axiosInstance from '@/api/config'
import type { ToggleBookmarkRequest } from '@/model/Bookmark'

export const toggleBookmark = async ({ routeParams: { id, type } }: ToggleBookmarkRequest) =>
  (await axiosInstance.post(`/bookmarks/${type}/${id}`)).data

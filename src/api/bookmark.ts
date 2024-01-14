import axiosInstance from '@/api/config'
import type {
  BookmarksRequest,
  BookmarksResponse,
  ToggleBookmarkRequest,
  ToggleBookmarkResponse
} from '@/model/Bookmark'

export const toggleBookmark = async ({ routeParams: { id, type } }: ToggleBookmarkRequest) =>
  (await axiosInstance.post<ToggleBookmarkResponse>(`/bookmarks/${type}/${id}`)).data

export const fetchBookmarks = async (req: BookmarksRequest, pageParam?: number) =>
  (
    await axiosInstance.get<BookmarksResponse>(`/bookmarks/${req.routeParams.type}`, {
      params: {
        ...req.queryParams,
        page: pageParam
      }
    })
  ).data

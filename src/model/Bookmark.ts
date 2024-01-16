import type { ApiResponse } from '@/model/Api'
import type { ClothesTemplate } from '@/model/Clothes'
import type { Pagination, PaginationQueryParams } from '@/model/Pagination'
import type { PostTemplate } from '@/model/Post'

export type BookmarkType = 'post' | 'clothes'

export interface ToggleBookmarkRequest {
  routeParams: {
    type: BookmarkType
    id: number
  }
}

export type ToggleBookmarkResponse = ApiResponse<{
  isBookmarked: boolean
}>

export interface BookmarksRequest {
  routeParams: {
    type: BookmarkType
  }
  queryParams?: PaginationQueryParams & {}
}

export type BookmarkTemplate = PostTemplate | ClothesTemplate

export type BookmarksResponse = Pagination<BookmarkTemplate>

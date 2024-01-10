export type BookmarkType = 'post' | 'clothes'
export interface ToggleBookmarkRequest {
  routeParams: {
    type: BookmarkType
    id: number
  }
}
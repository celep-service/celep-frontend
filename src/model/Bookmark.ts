export type ToggleBookmarkType = 'post' | 'clothes'
export interface ToggleBookmarkRequest {
  routeParams: {
    type: ToggleBookmarkType
    id: number
  }
}
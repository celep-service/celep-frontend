import type { CelebCategoryCode, CelebTemplate } from '@/model/Celeb'
import type { ClothesTemplate } from '@/model/Clothes'
import type { Gender, GenderCode } from '@/model/Gender'
import type { Pagination, PaginationQueryParams } from '@/model/Pagination'
import type { TimeStampString } from '@/model/Time'
import type { UserTemplate } from '@/model/User'

export interface PostsRequest {
  queryParams: PaginationQueryParams & {
    celebCategory?: CelebCategoryCode
    userId?: number
    search?: string
    gender?: GenderCode
  }
}

export interface PostTemplate {
  id: number
  title: string
  imageUrl: string
  createdAt: TimeStampString
  updatedAt: TimeStampString
  celeb: CelebTemplate
  isBookmarked?: boolean
  bookmarkCount: number
  codiesDtoList: {
    id: number
    clothesDto: ClothesTemplate
  }[]
  commentCount: number
  userDto: UserTemplate
  gender: Gender
}

export type PostsResponse = Pagination<PostTemplate>

export interface CreatePostRequest {
  payload: {
    title: string
    clothesIdList: number[]
    imageUrl: string
    celebId: number
    gender: GenderCode
  }
}

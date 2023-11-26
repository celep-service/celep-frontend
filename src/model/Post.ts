import type { CelebCategoryCode, CelebTemplate } from '@/model/Celeb'
import type { ClothesTemplate } from '@/model/Clothes'
import type { GenderCode } from '@/model/Gender'
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
  codiesDtoList: {
    id: number
    clothes: ClothesTemplate
  }[]
  commentCount: number
  userDto: UserTemplate
  gender: GenderCode
}

export type PostsResponse = Pagination<PostTemplate>

import axiosInstance from '@/api/config'
import type { CelebsRequest, CelebsResponse } from '@/model/Celeb'

export const fetchCelebs = async (req?: CelebsRequest, pageParam?: number) =>
  (
    await axiosInstance.get<CelebsResponse>('/celebs', {
      params: {
        ...req?.queryParams,
        page: pageParam,
        size: 20
      }
    })
  ).data

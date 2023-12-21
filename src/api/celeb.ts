import axiosInstance from '@/api/config'
import type { CelebsRequest, CelebsResponse } from '@/model/Celeb'

export const fetchCelebs = async (req?: CelebsRequest) =>
  (await axiosInstance.get<CelebsResponse>('/celebs', { params: req?.queryParams })).data

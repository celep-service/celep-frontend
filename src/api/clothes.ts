import axiosInstance from '@/api/config'
import type { ClothesListRequest, ClothesListResponse } from '@/model/Clothes'

export const fetchClothesList = async (req?: ClothesListRequest, pageParam?: number) =>
  (
    await axiosInstance.get<ClothesListResponse>('/clothes', {
      params: {
        ...req?.queryParams,
        page: pageParam
      }
    })
  ).data

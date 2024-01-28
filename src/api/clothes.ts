import axiosInstance from '@/api/config'
import type { ClothesListRequest, ClothesListResponse, CreateClothesRequest } from '@/model/Clothes'

export const fetchClothesList = async (req?: ClothesListRequest, pageParam?: number) =>
  (
    await axiosInstance.get<ClothesListResponse>('/clothes', {
      params: {
        ...req?.queryParams,
        page: pageParam
      }
    })
  ).data

  export const createClothes = async ({ payload }: CreateClothesRequest) =>
  (await axiosInstance.post('/clothes', payload)).data
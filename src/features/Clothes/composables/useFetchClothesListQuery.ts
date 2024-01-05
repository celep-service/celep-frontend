import { fetchClothesList } from '@/api/clothes'
import type { ClothesListRequest } from '@/model/Clothes'
import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

const useFetchClothesListQuery = (req?: ComputedRef<ClothesListRequest>) => {
  return useQuery({
    queryKey: ['fetchClothesListQuery', req],
    queryFn: () => fetchClothesList(req?.value)
  })
}

export default useFetchClothesListQuery

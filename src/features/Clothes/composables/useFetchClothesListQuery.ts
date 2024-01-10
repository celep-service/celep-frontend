import { fetchClothesList } from '@/api/clothes'
import type { ClothesListRequest } from '@/model/Clothes'
import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const FETCH_CLOTHES_LIST_QUERY_KEY = 'fetchClothesListQuery'

const useFetchClothesListQuery = (req?: ComputedRef<ClothesListRequest>) => {
  return useQuery({
    queryKey: [FETCH_CLOTHES_LIST_QUERY_KEY, req],
    queryFn: () => fetchClothesList(req?.value)
  })
}

export default useFetchClothesListQuery

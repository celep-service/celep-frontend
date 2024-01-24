import { fetchClothesList } from '@/api/clothes'
import type { ClothesListRequest } from '@/model/Clothes'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const FETCH_CLOTHES_LIST_INFINITE_QUERY_KEY = 'fetchClothesListInfiniteQuery'

const useFetchClothesListInfiniteQuery = (req?: ComputedRef<ClothesListRequest>) => {
  return useInfiniteQuery({
    queryKey: [FETCH_CLOTHES_LIST_INFINITE_QUERY_KEY, req],
    queryFn: ({ pageParam = 0 }) => fetchClothesList(req?.value, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.last ? undefined : lastPage.data.pageable.pageNumber + 1
  })
}

export default useFetchClothesListInfiniteQuery

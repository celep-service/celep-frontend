import { fetchCelebs } from '@/api/celeb'
import type { CelebsRequest } from '@/model/Celeb'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const FETCH_CELEBS_INFINITE_QUERY_KEY = 'fetchCelebsInfiniteQuery'

const useFetchCelebsInfiniteQuery = (req?: ComputedRef<CelebsRequest>) => {
  return useInfiniteQuery({
    queryKey: [FETCH_CELEBS_INFINITE_QUERY_KEY, req],
    queryFn: ({ pageParam = 0 }) => fetchCelebs(req?.value, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.last ? undefined : lastPage.data.pageable.pageNumber + 1
  })
}

export default useFetchCelebsInfiniteQuery

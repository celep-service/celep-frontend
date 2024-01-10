import { fetchCelebs } from '@/api/celeb'
import type { CelebsRequest } from '@/model/Celeb'
import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const FETCH_CELEBS_QUERY_KEY = 'fetchCelebsQuery'

const useFetchCelebsQuery = (req?: ComputedRef<CelebsRequest>) => {
  return useQuery({
    queryKey: [FETCH_CELEBS_QUERY_KEY, req],
    queryFn: () => fetchCelebs(req?.value)
  })
}

export default useFetchCelebsQuery

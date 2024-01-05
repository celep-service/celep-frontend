import { fetchCelebs } from '@/api/celeb'
import type { CelebsRequest } from '@/model/Celeb'
import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

const useFetchCelebsQuery = (req?: ComputedRef<CelebsRequest>) => {
  return useQuery({
    queryKey: ['fetchCelebsQuery', req],
    queryFn: () => fetchCelebs(req?.value)
  })
}

export default useFetchCelebsQuery

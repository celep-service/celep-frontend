import { fetchLoggedInUser } from '@/api/user'
import { useQuery } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'

export const FETCH_LOGGED_IN_USER_QUERY_KEY = 'fetchLoggedInUserQuery'

const useFetchLoggedInUserQuery = (enabled?: MaybeRef<boolean>) => {
  return useQuery({
    queryKey: [FETCH_LOGGED_IN_USER_QUERY_KEY],
    queryFn: fetchLoggedInUser,
    enabled: enabled
  })
}

export default useFetchLoggedInUserQuery

import { fetchPosts } from '@/api/post'
import type { PostsRequest } from '@/model/Post'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const FETCH_POSTS_INFINITE_QUERY_KEY = 'fetchPostsInfiniteQuery'

const useFetchPostsInfiniteQuery = (req?: ComputedRef<PostsRequest>) => {
  return useInfiniteQuery({
    queryKey: [FETCH_POSTS_INFINITE_QUERY_KEY, req],
    queryFn: ({ pageParam = 0 }) => fetchPosts(req?.value, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.last ? undefined : lastPage.data.pageable.pageNumber + 1
  })
}

export default useFetchPostsInfiniteQuery

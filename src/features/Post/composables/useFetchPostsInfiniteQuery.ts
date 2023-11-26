import { fetchPosts } from '@/api/posts'
import type { PostsRequest } from '@/model/Post'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

const useFetchPostsInfiniteQuery = (req?: ComputedRef<PostsRequest>) => {
  return useInfiniteQuery({
    queryKey: ['fetchPostsInfiniteQuery', req],
    queryFn: ({ pageParam = 0 }) => fetchPosts(req?.value, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.last ? undefined : lastPage.data.pageable.pageNumber + 1
  })
}

export default useFetchPostsInfiniteQuery

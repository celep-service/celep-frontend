import { fetchBookmarks } from '@/api/bookmark'
import type { BookmarksRequest } from '@/model/Bookmark'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const FETCH_BOOKMARKS_INFINITE_QUERY_KEY = 'fetchBookmarksInfiniteQuery'

const useFetchBookmarksInfiniteQuery = (req: ComputedRef<BookmarksRequest>) => {
  return useInfiniteQuery({
    queryKey: [FETCH_BOOKMARKS_INFINITE_QUERY_KEY, req],
    queryFn: ({ pageParam = 0 }) => fetchBookmarks(req.value, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.last ? undefined : lastPage.data.pageable.pageNumber + 1
  })
}

export default useFetchBookmarksInfiniteQuery

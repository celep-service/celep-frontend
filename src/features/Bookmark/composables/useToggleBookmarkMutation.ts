import { toggleBookmark } from '@/api/bookmark'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import useToastMessageStore from '@/composables/useToastMessageStore'
import { FETCH_BOOKMARKS_INFINITE_QUERY_KEY } from '@/features/Bookmark/composables/useFetchBookmarksInfiniteQuery'
import { FETCH_POSTS_INFINITE_QUERY_KEY } from '@/features/Post/composables/useFetchPostsInfiniteQuery'
import type { ToggleBookmarkRequest } from '@/model/Bookmark'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { isAxiosError } from 'axios'

/* Pinia */
const { showToastMessage } = useToastMessageStore()
const { showErrorAlertDialog } = useAlertDialogStore()

const useToggleBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: ToggleBookmarkRequest) => toggleBookmark(req),
    onSuccess: (res) => {
      const SUCCESS_MESSAGE = res.data.isBookmarked
        ? '북마크가 추가되었습니다.'
        : '북마크가 해제되었습니다.'
      showToastMessage(SUCCESS_MESSAGE, 'Success')
      queryClient.invalidateQueries([FETCH_POSTS_INFINITE_QUERY_KEY])
      queryClient.invalidateQueries({
        queryKey: [FETCH_BOOKMARKS_INFINITE_QUERY_KEY],
        refetchType: 'all'
      })
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 403) return
      showErrorAlertDialog(error)
    }
  })
}

export default useToggleBookmarkMutation

import { toggleBookmark } from '@/api/bookmark'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import { FETCH_POSTS_INFINITE_QUERY_KEY } from '@/features/Post/composables/useFetchPostsInfiniteQuery'
import type { ToggleBookmarkRequest } from '@/model/Bookmark'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { isAxiosError } from 'axios'

/* Pinia */
const { showErrorAlertDialog } = useAlertDialogStore()

const useToggleBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: ToggleBookmarkRequest) => toggleBookmark(req),
    onSuccess: () => {
      queryClient.invalidateQueries([FETCH_POSTS_INFINITE_QUERY_KEY])
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 403) return
      showErrorAlertDialog(error)
    }
  })
}

export default useToggleBookmarkMutation

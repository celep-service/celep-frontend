import { createPost } from '@/api/post'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import useToastMessageStore from '@/composables/useToastMessageStore'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import type { CreatePostRequest } from '@/model/Post'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

/* Pinia */
const { resetAllState } = useCreatePostStore()
const { showToastMessage } = useToastMessageStore()
const { showErrorAlertDialog } = useAlertDialogStore()

const useCreatePostMutation = () => {
  /* Router */
  const router = useRouter()

  return useMutation({
    mutationFn: (req: CreatePostRequest) => createPost(req),
    onSuccess: () => {
      resetAllState()
      router.push({ name: 'home' })
      showToastMessage('코디가 추가되었습니다.', 'Success')
    },
    onError: (error) => {
      showErrorAlertDialog(error)
    }
  })
}

export default useCreatePostMutation

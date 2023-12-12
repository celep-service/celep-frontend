import { loginUser } from '@/api/user'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import useToastMessageStore from '@/composables/useToastMessageStore'
import { ACCESS_TOKEN_KEY } from '@/constants/jwt'
import type { LoginUserRequest } from '@/model/User'
import { useMutation } from '@tanstack/vue-query'
import type { AnyFn } from '@vueuse/core'
import { useRouter } from 'vue-router'

/* Pinia */
const { showToastMessage } = useToastMessageStore()

const useLoginUserMutation = (onError: AnyFn) => {
  /* Router */
  const router = useRouter()

  return useMutation({
    mutationFn: (req: LoginUserRequest) => loginUser(req),
    onSuccess: (res) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, res.data.accessToken)
      router.push({ name: 'home' })
      showToastMessage('로그인 되었습니다.', 'Success')
    },
    onError: (error) => {
      onError(error)
    }
  })
}

export default useLoginUserMutation

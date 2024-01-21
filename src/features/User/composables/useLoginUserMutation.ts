import { loginUser } from '@/api/user'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import { ACCESS_TOKEN_KEY } from '@/constants/jwt'
import type { LoginUserRequest } from '@/model/User'
import { useMutation } from '@tanstack/vue-query'
import type { AnyFn } from '@vueuse/core'

const useLoginUserMutation = (onError: AnyFn) => {
  return useMutation({
    mutationFn: (req: LoginUserRequest) => loginUser(req),
    onSuccess: (res) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, res.data.accessToken)
    },
    onError: (error) => {
      onError(error)
    }
  })
}

export default useLoginUserMutation

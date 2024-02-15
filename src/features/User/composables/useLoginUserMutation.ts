import { loginUser } from '@/api/user'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import { ACCESS_TOKEN_KEY } from '@/constants/jwt'
import type { LoginUserRequest } from '@/model/User'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AnyFn } from '@vueuse/core'

const useLoginUserMutation = (onError: AnyFn) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: LoginUserRequest) => loginUser(req),
    onSuccess: (res) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, res.data.accessToken)
      queryClient.invalidateQueries({ refetchType: 'all' })
    },
    onError: (error) => {
      onError(error)
    }
  })
}

export default useLoginUserMutation

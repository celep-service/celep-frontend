import { createUser } from '@/api/user'
import useToastMessageStore from '@/composables/useToastMessageStore'
import type { CreateUserRequest } from '@/model/User'
import { useMutation } from '@tanstack/vue-query'
import type { AnyFn } from '@vueuse/core'

/* Pinia */
const { showToastMessage } = useToastMessageStore()

const useCreateUserMutation = (onError: AnyFn) => {
  return useMutation({
    mutationFn: (req: CreateUserRequest) => createUser(req),
    onSuccess: () => {
      showToastMessage('회원가입 되었습니다.', 'Success')
    },
    onError: (error) => {
      onError(error)
    }
  })
}

export default useCreateUserMutation

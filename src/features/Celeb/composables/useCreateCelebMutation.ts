import { createCeleb } from '@/api/celeb'
import useToastMessageStore from '@/composables/useToastMessageStore'
import { FETCH_CELEBS_INFINITE_QUERY_KEY } from '@/features/Celeb/composables/useFetchCelebsInfiniteQuery'
import type { CreateCelebRequest } from '@/model/Celeb'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

/* Pinia */
const { showToastMessage } = useToastMessageStore()

const useCreateCelebMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateCelebRequest) => createCeleb(req),
    onSuccess: () => {
      queryClient.invalidateQueries([FETCH_CELEBS_INFINITE_QUERY_KEY])
      showToastMessage('셀럽이 추가되었습니다.', 'Success')
    }
  })
}

export default useCreateCelebMutation

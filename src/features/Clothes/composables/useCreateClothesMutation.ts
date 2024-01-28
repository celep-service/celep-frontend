import { createClothes } from '@/api/clothes'
import useToastMessageStore from '@/composables/useToastMessageStore'
import { FETCH_CLOTHES_LIST_INFINITE_QUERY_KEY } from '@/features/Clothes/composables/useFetchClothesListInfiniteQuery'
import type { CreateClothesRequest } from '@/model/Clothes'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

/* Pinia */
const { showToastMessage } = useToastMessageStore()

const useCreateClothesMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateClothesRequest) => createClothes(req),
    onSuccess: () => {
      queryClient.invalidateQueries([FETCH_CLOTHES_LIST_INFINITE_QUERY_KEY])
      showToastMessage('의류/악세사리가 추가되었습니다.', 'Success')
    }
  })
}

export default useCreateClothesMutation

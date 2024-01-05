import { computed } from 'vue'
import { search } from './CelebSelectProfileCardsContainer.vue'

export const requestData = computed<CelebsRequest>(() => ({
  queryParams: {
    search: search.value
  }
}))

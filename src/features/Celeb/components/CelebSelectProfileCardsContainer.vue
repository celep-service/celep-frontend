<script setup lang="ts">
import BaseInput from '@/components/Base/BaseInput.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import CelebSelectProfileCard from '@/features/Celeb/components/CelebSelectProfileCard.vue'
import CelebSelectProfileCardsSkeleton from '@/features/Celeb/components/CelebSelectProfileCardsSkeleton.vue'
import useFetchCelebsQuery from '@/features/Celeb/composables/useFetchCelebsQuery'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import type { CelebsRequest } from '@/model/Celeb'
import { storeToRefs } from 'pinia'
import { computed, onUpdated } from 'vue'

/* Pinia */
const { celebId, celebNameSearchKeyword: search } = storeToRefs(useCreatePostStore())
const { resetCelebId } = useCreatePostStore()

/* Local State */
const requestData = computed<CelebsRequest>(() => ({
  queryParams: {
    search: search.value
  }
}))
const hasContent = computed(() => data.value?.data.content.length !== 0)

/* Vue Query */
const { data } = useFetchCelebsQuery(requestData)

/* Watch */
onUpdated(() => {
  if (!data.value) return
  if (data.value.data.content.some((celeb) => celeb.id === celebId.value)) return

  resetCelebId()
})
</script>

<template>
  <div class="celeb-select-profile-cards-container">
    <BaseInput
      v-model="search"
      label="셀럽 찾기"
      :focus="true"
      :debounce="true"
      class="celeb-select-profile-cards-container__search-input"
    />

    <template v-if="data">
      <div v-if="hasContent" class="celeb-select-profile-cards-container__cards">
        <CelebSelectProfileCard
          v-for="{ id, name, imageUrl } in data.data.content"
          :key="id"
          v-model="celebId"
          :id="id"
          :name="name"
          :imageUrl="imageUrl"
        />
      </div>

      <div v-else class="celeb-select-profile-cards-container__empty-container">
        <TextBody2 class="celeb-select-profile-cards-container__empty-message">
          셀럽이 존재하지 않습니다.
        </TextBody2>
        <!-- TODO: 셀럽 추가 기능 구현
        <BaseButton backgroundColor="var(--create)">
          <BaseIcon name="person_add" />
          셀럽 추가하기
        </BaseButton>
        -->
      </div>
    </template>

    <CelebSelectProfileCardsSkeleton v-else />
  </div>
</template>

<style scoped lang="scss">
.celeb-select-profile-cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;

  &__search-input {
    width: 200px;
    margin-bottom: 50px;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    width: 90vw;
  }

  &__empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  &__empty-message {
    color: rgba(var(--gray-700));
  }
}
</style>

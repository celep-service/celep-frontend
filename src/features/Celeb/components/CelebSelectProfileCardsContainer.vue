<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import AppSpinner from '@/components/Common/AppSpinner.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import CelebCreateModal from '@/features/Celeb/components/CelebCreateModal.vue'
import CelebSelectProfileCard from '@/features/Celeb/components/CelebSelectProfileCard.vue'
import CelebSelectProfileCardsSkeleton from '@/features/Celeb/components/CelebSelectProfileCardsSkeleton.vue'
import useFetchCelebsInfiniteQuery from '@/features/Celeb/composables/useFetchCelebsInfiniteQuery'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import type { CelebsRequest } from '@/model/Celeb'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

/* Pinia */
const { celebId, celebNameSearchKeyword: search } = storeToRefs(useCreatePostStore())
const { resetCelebId } = useCreatePostStore()

/* Local State */
const requestData = computed<CelebsRequest>(() => ({
  queryParams: {
    search: search.value
  }
}))
const hasContent = computed(() => data.value?.pages[0].data.content.length !== 0)
const showCelebCreateModal = ref(false)

/* Vue Query */
const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
  useFetchCelebsInfiniteQuery(requestData)

/* Event Handler */
const handleClickExpandMoreButton = () => {
  fetchNextPage()
}
const handleClickCreateCelebButton = () => {
  showCelebCreateModal.value = true
}

/* Watch */
watch(search, () => {
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
      <template v-if="hasContent">
        <div class="celeb-select-profile-cards-container__cards">
          <template v-for="page in data.pages" :key="page.data.pageable.pageNumber">
            <CelebSelectProfileCard
              v-for="{ id, name, imageUrl } in page.data.content"
              :key="id"
              v-model="celebId"
              :id="id"
              :name="name"
              :imageUrl="imageUrl"
            />
          </template>
        </div>

        <BaseButton
          v-if="hasNextPage"
          @click="handleClickExpandMoreButton"
          type="outlined"
          textColor="var(--gray-600)"
          class="celeb-select-profile-cards-container__expand-more-button"
        >
          더보기
          <BaseIcon name="expand_more" opsz="20" />
        </BaseButton>

        <div
          v-if="isFetchingNextPage"
          class="celeb-select-profile-cards-container__spinner-wrapper"
        >
          <AppSpinner />
        </div>
      </template>

      <TextBody2 v-else class="celeb-select-profile-cards-container__empty-message">
        셀럽이 존재하지 않습니다.
      </TextBody2>

      <BaseButton @click="handleClickCreateCelebButton" backgroundColor="var(--create)" class="celeb-select-profile-cards-container__create-celeb-button">
        <BaseIcon name="person_add" />
        셀럽 추가하기
      </BaseButton>
    </template>

    <CelebSelectProfileCardsSkeleton v-else />

    <!-- Modal -->
    <CelebCreateModal v-model:open="showCelebCreateModal" />
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
    max-width: 500px;
  }

  &__expand-more-button {
    width: 60vw;
    height: 40px;
    margin-top: 20px;
  }

  &__spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }

  &__empty-message {
    color: rgba(var(--gray-700));
  }

  &__create-celeb-button{
    margin-top: 30px;
  }
}
</style>

<script setup lang="ts">
import ClothesCreateModal from '@/features/Clothes/components/ClothesCreateModal.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect, { type BaseSelectOption } from '@/components/Base/BaseSelect.vue'
import AppSpinner from '@/components/Common/AppSpinner.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import TextCaption from '@/components/Text/TextCaption.vue'
import ClothesSelectList from '@/features/Clothes/components/ClothesSelectList.vue'
import ClothesSelectListSkeleton from '@/features/Clothes/components/ClothesSelectListSkeleton.vue'
import useFetchClothesListInfiniteQuery from '@/features/Clothes/composables/useFetchClothesListInfiniteQuery'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import type { ClothesCategory, ClothesCategoryCode, ClothesListRequest } from '@/model/Clothes'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

/* Constant */
const CLOTHES_CATEGORY_OPTIONS: BaseSelectOption<ClothesCategoryCode, ClothesCategory>[] = [
  { label: '가방', value: 'BAG' },
  { label: '상의', value: 'TOP' },
  { label: '신발', value: 'SHOES' },
  { label: '아우터', value: 'OUTER' },
  { label: '악세사리', value: 'ACCESSORY' },
  { label: '하의', value: 'BOTTOM' }
]

/* Pinia */
const { checkedClothesList, clothesNameSearchKeyword: search } = storeToRefs(useCreatePostStore())

/* Local State */
const clothesCategory = ref<ClothesCategoryCode>()
const requestData = computed<ClothesListRequest>(() => ({
  queryParams: {
    clothesCategory: clothesCategory.value,
    search: search.value
  }
}))
const hasContent = computed(() => data.value?.pages[0].data.content.length !== 0)
const showClothesCreateModal = ref(false)

/* Vue Query */
const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
  useFetchClothesListInfiniteQuery(requestData)

/* Event Handler */
const handleClickRemoveCheckButton = (id: number) => {
  const removeTargetIndex = checkedClothesList.value.findIndex((clothes) => clothes.id === id)
  checkedClothesList.value.splice(removeTargetIndex, 1)
}
const handleClickExpandMoreButton = () => {
  fetchNextPage()
}
const handleClickCreateClothesButton = () => {
  showClothesCreateModal.value = true
}
</script>

<template>
  <div class="clothes-select-list-container">
    <div class="clothes-select-list-container__search-bar">
      <BaseSelect
        v-model="clothesCategory"
        :options="CLOTHES_CATEGORY_OPTIONS"
        placeholder="전체"
        color="var(--gray-600)"
        borderColor="var(--gray-400)"
        class="clothes-select-list-container__category-select"
      />
      <BaseInput
        v-model="search"
        label="검색"
        :focus="true"
        :debounce="true"
        class="clothes-select-list-container__search-input"
      />
    </div>

    <div class="clothes-select-list-container__checked_clothes-chips-container">
      <div
        v-for="checkedClothes in checkedClothesList"
        :key="checkedClothes.id"
        class="clothes-select-list-container__checked_clothes-chip"
      >
        <TextCaption weight="600">{{ checkedClothes.name }}</TextCaption>
        <BaseIcon @click="handleClickRemoveCheckButton(checkedClothes.id)" name="close" />
      </div>
    </div>

    <template v-if="data">
      <div v-if="hasContent">
        <ClothesSelectList
          v-for="page in data.pages"
          :key="page.data.pageable.pageNumber"
          :clothesList="page.data.content"
        />

        <BaseButton
          v-if="hasNextPage"
          @click="handleClickExpandMoreButton"
          type="outlined"
          textColor="var(--gray-600)"
          class="clothes-select-list-container__expand-more-button"
        >
          더보기
          <BaseIcon name="expand_more" opsz="20" />
        </BaseButton>

        <div v-if="isFetchingNextPage" class="clothes-select-list-container__spinner-wrapper">
          <AppSpinner />
        </div>
      </div>

      <TextBody2 v-else class="clothes-select-list-container__empty-message">
        의류/악세사리가 존재하지 않습니다.
      </TextBody2>
      <BaseButton
        @click="handleClickCreateClothesButton"
        backgroundColor="var(--create)"
        class="clothes-select-list-container__create-clothes-button"
      >
        <BaseIcon name="add" />
        의류/악세사리 추가하기
      </BaseButton>
    </template>

    <ClothesSelectListSkeleton v-else />

    <!-- Modal -->
    <ClothesCreateModal v-model:open="showClothesCreateModal" />
  </div>
</template>

<style scoped lang="scss">
.clothes-select-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;

  &__search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__search-input {
    width: 200px;
  }

  &__checked_clothes-chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 90vw;
    min-height: 26px;
    margin-bottom: 20px;
  }

  &__checked_clothes-chip {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 8px 10px;
    border-radius: 30px;
    background-color: rgba(var(--zinc-400));
    color: rgba(var(--gray-100));
  }

  &__expand-more-button {
    width: 60vw;
    height: 40px;
    margin: 0 auto;
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

  &__create-clothes-button {
    margin-top: 30px;
  }
}
</style>

<script setup lang="ts">
import AppSpinner from '@/components/Common/AppSpinner.vue'
import ObserverTrigger from '@/components/ObserverTrigger.vue'
import MyPostsGrid from '@/features/Post/components/MyPostsGrid.vue'
import MyPostsGridSkeleton from '@/features/Post/components/MyPostsGridSkeleton.vue'
import useFetchPostsInfiniteQuery from '@/features/Post/composables/useFetchPostsInfiniteQuery'
import useUserStore from '@/features/User/stores/useUserStore'
import type { PostsRequest } from '@/model/Post'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

/* Pinia */
const { user } = storeToRefs(useUserStore())

/* Local State */
const requestData = computed<PostsRequest>(() => ({
  queryParams: {
    userId: user.value!.id,
  }
}))
const hasContent = computed(() => data.value?.pages[0].data.content.length !== 0)

/* Vue Query */
const { data, fetchNextPage, isFetchingNextPage } = useFetchPostsInfiniteQuery(requestData)
</script>

<template>
  <div class="my-posts-grid-container">
    <template v-if="data">
      <template v-if="hasContent">
        <MyPostsGrid
          v-for="page in data.pages"
          :key="page.data.pageable.pageNumber"
          :posts="page.data.content"
          :page="page.data.pageable.pageNumber"
        />

        <ObserverTrigger @triggerIntersected="fetchNextPage" />

        <div v-if="isFetchingNextPage" class="my-posts-grid-container__spinner-wrapper">
          <AppSpinner />
        </div>
      </template>

      <div v-else class="my-posts-grid-container__empty-message">내가 추가한 코디가 없습니다.</div>
    </template>

    <MyPostsGridSkeleton v-else />
  </div>
</template>

<style scoped lang="scss">
.my-posts-grid-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;

  &__spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }

  &__empty-message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
  }
}
</style>

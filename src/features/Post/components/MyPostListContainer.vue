<script setup lang="ts">
import AppSpinner from '@/components/Common/AppSpinner.vue'
import ObserverTrigger from '@/components/ObserverTrigger.vue'
import PostList from '@/features/Post/components/PostList.vue'
import PostListSkeleton from '@/features/Post/components/PostListSkeleton.vue'
import useFetchPostsInfiniteQuery from '@/features/Post/composables/useFetchPostsInfiniteQuery'
import useUserStore from '@/features/User/stores/useUserStore'
import type { PostTemplate, PostsRequest } from '@/model/Post'
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

/* Vue Query */
const { data, fetchNextPage, isFetchingNextPage } = useFetchPostsInfiniteQuery(requestData)
</script>

<template>
  <div class="my-post-list-container">
    <template v-if="data">
      <PostList
        v-for="page in data.pages"
        :key="page.data.pageable.pageNumber"
        :posts="(page.data.content as PostTemplate[])"
      />

      <ObserverTrigger @triggerIntersected="fetchNextPage" />

      <div v-if="isFetchingNextPage" class="my-post-list-container__spinner-wrapper">
        <AppSpinner />
      </div>
    </template>

    <PostListSkeleton v-else />
  </div>
</template>

<style scoped lang="scss">
.my-post-list-container {
  display: flex;
  flex-direction: column;

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

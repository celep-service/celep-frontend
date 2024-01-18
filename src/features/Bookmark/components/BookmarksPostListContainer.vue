<script setup lang="ts">
import AppSpinner from '@/components/Common/AppSpinner.vue'
import ObserverTrigger from '@/components/ObserverTrigger.vue'
import useFetchBookmarksInfiniteQuery from '@/features/Bookmark/composables/useFetchBookmarksInfiniteQuery'
import PostList from '@/features/Post/components/PostList.vue'
import PostListSkeleton from '@/features/Post/components/PostListSkeleton.vue'
import type { BookmarksRequest } from '@/model/Bookmark'
import type { PostTemplate } from '@/model/Post'
import { computed } from 'vue'

/* Local State */
const requestData = computed<BookmarksRequest>(() => ({
  routeParams: {
    type: 'post'
  }
}))

/* Vue Query */
const { data, fetchNextPage, isFetchingNextPage } = useFetchBookmarksInfiniteQuery(requestData)
</script>

<template>
  <div class="post-list-container">
    <template v-if="data">
      <PostList
        v-for="page in data.pages"
        :key="page.data.pageable.pageNumber"
        :posts="(page.data.content as PostTemplate[])"
      />

      <ObserverTrigger @triggerIntersected="fetchNextPage" />

      <div v-if="isFetchingNextPage" class="post-list-container__spinner-wrapper">
        <AppSpinner />
      </div>
    </template>

    <PostListSkeleton v-else />
  </div>
</template>

<style scoped lang="scss">
.post-list-container {
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

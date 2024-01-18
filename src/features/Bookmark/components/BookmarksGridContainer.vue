<script setup lang="ts">
import AppSpinner from '@/components/Common/AppSpinner.vue'
import ObserverTrigger from '@/components/ObserverTrigger.vue'
import BookmarksGrid from '@/features/Bookmark/components/BookmarksGrid.vue'
import BookmarksGridSkeleton from '@/features/Bookmark/components/BookmarksGridSkeleton.vue'
import useFetchBookmarksInfiniteQuery from '@/features/Bookmark/composables/useFetchBookmarksInfiniteQuery'
import type { BookmarkType, BookmarksRequest } from '@/model/Bookmark'
import { computed } from 'vue'

/* Prop */
interface Props {
  bookmarkType: BookmarkType
}
const props = withDefaults(defineProps<Props>(), {})

/* Local State */
const requestData = computed<BookmarksRequest>(() => ({
  routeParams: {
    type: props.bookmarkType
  }
}))
const hasContent = computed(() => data.value?.pages[0].data.content.length !== 0)

/* Vue Query */
const { data, fetchNextPage, isFetchingNextPage } = useFetchBookmarksInfiniteQuery(requestData)
</script>

<template>
  <div class="bookmarks-grid-container">
    <template v-if="data">
      <template v-if="hasContent">
        <BookmarksGrid
          v-for="page in data.pages"
          :key="page.data.pageable.pageNumber"
          :bookmarks="page.data.content"
          :bookmarkType="bookmarkType"
          :page="page.data.pageable.pageNumber"
        />

        <ObserverTrigger @triggerIntersected="fetchNextPage" />

        <div v-if="isFetchingNextPage" class="bookmarks-grid-container__spinner-wrapper">
          <AppSpinner />
        </div>
      </template>

      <div v-else class="bookmarks-grid-container__empty-message">북마크가 존재하지 않습니다.</div>
    </template>

    <BookmarksGridSkeleton v-else />
  </div>
</template>

<style scoped lang="scss">
.bookmarks-grid-container {
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

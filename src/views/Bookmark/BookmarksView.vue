<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import BookmarksGridContainer from '@/features/Bookmark/components/BookmarksGridContainer.vue'
import BookmarksTabs from '@/features/Bookmark/components/BookmarksTabs.vue'
import type { BookmarkType } from '@/model/Bookmark'
import { ref } from 'vue'

/* Local State */
const bookmarkType = ref<BookmarkType>('post')
</script>

<template>
  <ViewContainer class="bookmarks-view">
    <template #app-bar>
      <AppBar />
    </template>

    <main class="bookmarks-view__main">
      <BookmarksTabs v-model="bookmarkType" />
      <BookmarksGridContainer :bookmarkType="bookmarkType" />
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.bookmarks-view {
  &__main {
    display: flex;
    flex-direction: column;
  }
}
</style>

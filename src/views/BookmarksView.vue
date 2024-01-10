<script setup lang="ts">
import BookmarksTabs from '@/features/Bookmark/components/BookmarksTabs.vue'
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import { ref } from 'vue';
import type { BookmarkType } from '@/model/Bookmark';

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
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.bookmarks-view {
  &__main {
  }
}
</style>

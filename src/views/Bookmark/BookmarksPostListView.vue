<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import BookmarksPostListContainer from '@/features/Bookmark/components/BookmarksPostListContainer.vue'
</script>

<template>
  <ViewContainer class="bookmarks-post-list-view">
    <template #app-bar>
      <AppBar type="back" title="북마크 코디" />
    </template>

    <main class="bookmarks-post-list-view__main">
      <BookmarksPostListContainer />
    </main>
  </ViewContainer>
</template>

<style>
.view-container__main-wrapper {
  scroll-behavior: initial !important;
}
</style>

<style scoped lang="scss">
.bookmarks-post-list-view {
  &__main {
  }
}
</style>

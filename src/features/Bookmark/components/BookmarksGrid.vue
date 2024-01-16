<script setup lang="ts">
import BookmarksGridItem from '@/features/Bookmark/components/BookmarksGridItem.vue'
import type { BookmarkTemplate, BookmarkType } from '@/model/Bookmark'

/* Prop */
interface Props {
  bookmarks: BookmarkTemplate[]
  bookmarkType: BookmarkType
  page: number
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="bookmarks-grid">
    <BookmarksGridItem
      v-for="bookmark in bookmarks"
      :key="bookmark.id"
      :bookmark="bookmark"
      :bookmark-type="bookmarkType"
      :page="page"
    />
  </div>
</template>

<style scoped lang="scss">
.bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
</style>

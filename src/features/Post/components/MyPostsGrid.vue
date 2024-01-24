<script setup lang="ts">
import MyPostsGridItem from '@/features/Post/components/MyPostsGridItem.vue'
import type { PostTemplate } from '@/model/Post'

/* Prop */
interface Props {
  posts: PostTemplate[]
  page: number
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="my-posts-grid">
    <MyPostsGridItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :page="page"
    />
  </div>
</template>

<style scoped lang="scss">
.my-posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
</style>

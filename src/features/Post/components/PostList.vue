<script setup lang="ts">
import PostListItem from '@/features/Post/components/PostListItem.vue'
import type { PostTemplate } from '@/model/Post'

/* Prop */
interface Props {
  posts: PostTemplate[]
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="post-list">
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped lang="scss">
.post-list {
  display: flex;
  flex-direction: column;
}
</style>

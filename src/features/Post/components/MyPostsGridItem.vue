<script setup lang="ts">
import type { PostTemplate } from '@/model/Post'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

/* Prop */
interface Props {
  post: PostTemplate
}
const props = withDefaults(defineProps<Props>(), {})

/* Router */
const router = useRouter()

/* Local State */
const backgroundImageUrlString = computed(() => `url(${props.post.imageUrl})`)

/* Event Handler */
const handleClickItem = () => {
  router.push({ name: 'profile/posts', query: { postId: props.post.id } })
}
</script>

<template>
  <div
    @click="handleClickItem"
    class="my-posts-grid-item"
    :style="{ backgroundImage: backgroundImageUrlString }"
  ></div>
</template>

<style scoped lang="scss">
.my-posts-grid-item {
  position: relative;
  aspect-ratio: 1;
  background-color: rgba(var(--gray-100));
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

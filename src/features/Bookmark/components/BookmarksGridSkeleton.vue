<script setup lang="ts">
import BaseSkeleton from '@/components/Base/BaseSkeleton.vue'

/* Prop */
interface Props {
  field?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="bookmarks-grid-skeleton">
    <BaseSkeleton v-for="i in 12" :key="i" class="bookmarks-grid-skeleton__item" />
  </div>
</template>

<style scoped lang="scss">
.bookmarks-grid-skeleton {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;

  &__item {
    aspect-ratio: 1;
  }
}
</style>

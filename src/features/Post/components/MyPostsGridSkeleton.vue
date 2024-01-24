<script setup lang="ts">
import BaseSkeleton from '@/components/Base/BaseSkeleton.vue'
</script>

<template>
  <div class="my-posts-grid-skeleton">
    <BaseSkeleton v-for="i in 12" :key="i" class="my-posts-grid-skeleton__item" />
  </div>
</template>

<style scoped lang="scss">
.my-posts-grid-skeleton {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;

  &__item {
    aspect-ratio: 1;
  }
}
</style>

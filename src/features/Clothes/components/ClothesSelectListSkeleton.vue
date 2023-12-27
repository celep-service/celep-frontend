<script setup lang="ts">
import BaseSkeleton from '@/components/Base/BaseSkeleton.vue'
</script>

<template>
  <div class="clothes-select-list-skeleton">
    <div v-for="i in 10" :key="i" class="clothes-select-list-skeleton__item">
      <BaseSkeleton width="14px" height="14px" />
      <BaseSkeleton width="80px" height="80px" />
      <BaseSkeleton width="200px" height="16px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.clothes-select-list-skeleton {
  display: flex;
  flex-direction: column;
  width: 100vw;

  &__item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: solid 1px rgba(var(--gray-100));
  }
}
</style>

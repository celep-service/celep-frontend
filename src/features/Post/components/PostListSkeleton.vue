<script setup lang="ts">
import BaseSkeleton from '@/components/Base/BaseSkeleton.vue'

/* Prop */
interface Props {
  field?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="post-list-skeleton">
    <div v-for="i in 10" :key="i" class="post-list-skeleton__item">
      <div class="post-list-skeleton__item__user-info-wrapper">
        <BaseSkeleton shape="circle" width="24px" height="24px" />
        <BaseSkeleton width="80px" height="16px" />
      </div>
      <BaseSkeleton class="post-list-skeleton__item__swiper" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-list-skeleton {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    flex-direction: column;
    width: 100vw;

    &__user-info-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
    }

    &__swiper {
      width: 100%;
      max-width: 400px;
      aspect-ratio: 1;
      margin: 0 auto;
    }
  }
}
</style>

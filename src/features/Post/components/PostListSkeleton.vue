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
      <BaseSkeleton height="200px" />
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

    &__user-info-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
    }
  }
}
</style>

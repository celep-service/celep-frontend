<script setup lang="ts">
import BaseSkeleton from '@/components/Base/BaseSkeleton.vue'
</script>

<template>
  <div class="celeb-select-profile-cards-skeleton">
    <div v-for="i in 16" :key="i" class="celeb-select-profile-cards-skeleton__card">
      <div class="celeb-select-profile-cards-skeleton__avatar-wrapper">
        <BaseSkeleton shape="circle" width="100%" height="100%" />
      </div>
      <BaseSkeleton height="16px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeb-select-profile-cards-skeleton {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 10px;
  max-width: 340px;

  &__card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    padding: 8px;
  }

  &__avatar-wrapper {
    width: 64px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: rgba(var(--gray-300));
    overflow: hidden;
  }

  &__avatar {
    width: 100%;
    height: 100%;
  }
}
</style>

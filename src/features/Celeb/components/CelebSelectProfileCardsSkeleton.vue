<script setup lang="ts">
import BaseSkeleton from '@/components/Base/BaseSkeleton.vue'
</script>

<template>
  <div class="celeb-select-profile-cards-skeleton">
    <div v-for="i in 4" :key="i" class="celeb-select-profile-cards-skeleton__card">
      <div class="celeb-select-profile-cards-skeleton__avatar-wrapper">
        <BaseSkeleton shape="circle" width="100%" height="100%" />
      </div>
      <BaseSkeleton height="16px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeb-select-profile-cards-skeleton {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 20px;
  width: 260px;

  &__card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
  }

  &__avatar-wrapper {
    width: 50px;
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

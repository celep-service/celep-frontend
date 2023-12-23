<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore';

/* Pinia */
const { resetAllState } = useCreatePostStore()
</script>

<template>
  <ViewContainer class="posts-create-clothes-view">
    <template #app-bar>
      <AppBar type="close" title="clothes" :on-close="resetAllState" />
    </template>

    <main class="posts-create-clothes-view__main"></main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-clothes-view {
  &__main {
  }
}
</style>

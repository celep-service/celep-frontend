<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import MyPostListContainer from '@/features/Post/components/MyPostListContainer.vue'
</script>

<template>
  <ViewContainer class="my-post-list-view">
    <template #app-bar>
      <AppBar type="back" title="내가 추가한 코디" />
    </template>

    <main class="my-post-list-view__main">
      <MyPostListContainer />
    </main>
  </ViewContainer>
</template>

<style>
.view-container__main-wrapper {
  scroll-behavior: initial !important;
}
</style>

<style scoped lang="scss">
.my-post-list-view {
  &__main {
  }
}
</style>

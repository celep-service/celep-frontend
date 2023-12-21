<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer class="posts-create-title-view">
    <template #app-bar>
      <AppBar type="close" title="제목 입력" />
    </template>

    <main class="posts-create-title-view__main"></main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-title-view {
  &__main {
  }
}
</style>

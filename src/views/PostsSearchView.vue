<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer :is-active-bottom-tab-bar="false" class="posts-search-view">
    <template #app-bar>
      <AppBar type='back' title="검색" />
    </template>

    <main class="posts-search-view__main"></main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-search-view {
  &__main {
  }
}
</style>

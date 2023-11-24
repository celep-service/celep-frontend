<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer class="bookmarks-view">
    <template #app-bar>
      <AppBar />
    </template>
    
    <main class="bookmarks-view__main"></main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.bookmarks-view {
  &__main {
  }
}
</style>

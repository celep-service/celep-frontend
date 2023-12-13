<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer class="posts-create-view">
    <template #app-bar>
      <AppBar type="close" title="코디 추가" />
    </template>

    <main class="posts-create-view__main"></main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-view {
  &__main {
  }
}
</style>

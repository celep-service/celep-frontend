<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import PostListContainer from '@/features/Post/components/PostListContainer.vue'
</script>

<template>
  <ViewContainer class="home-view">
    <template #app-bar>
      <AppBar />
    </template>

    <main class="home-view__main">
      <PostListContainer />
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.home-view {
}
</style>

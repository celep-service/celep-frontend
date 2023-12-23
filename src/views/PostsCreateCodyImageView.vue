<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer class="posts-create-cody-image-view">
    <template #app-bar>
      <AppBar type="close" title="코디 사진"/>
    </template>

    <main class="posts-create-cody-image-view__main"></main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-cody-image-view {
  &__main {
  }
}
</style>

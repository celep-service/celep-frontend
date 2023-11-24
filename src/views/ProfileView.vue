<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer class="profile-view">
    <template #app-bar>
      <AppBar />
    </template>

    <main class="profile-view__main"></main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.profile-view {
  &__main {
  }
}
</style>

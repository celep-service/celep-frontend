<script setup lang="ts">
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer :is-active-bottom-tab-bar="false" class="login-view">
    <main class="login-view__main">LoginView</main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.login-view {
  padding-top: 0;

  &__main {
  }
}
</style>

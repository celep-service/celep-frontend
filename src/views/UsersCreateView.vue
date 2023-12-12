<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import ViewContainer from '@/components/ViewContainer.vue'
</script>

<template>
  <ViewContainer :is-active-bottom-tab-bar="false" class="users-create-view">
    <template #app-bar>
      <AppBar type="back" title="회원가입" />
    </template>

    <main class="users-create-view__main">UsersCreateView</main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.users-create-view {
  &__main {
  }
}
</style>

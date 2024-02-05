<script setup lang="ts">
import useBottomTabBarStore from '@/stores/useBottomTabBarStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

/* Pinia */
const { isActive: isActiveBottomTabBar } = storeToRefs(useBottomTabBarStore())

/* Local State */
const paddingBottom = computed(() =>
  isActiveBottomTabBar.value ? 'var(--bottom-tab-bar-height)' : '0'
)
</script>

<template>
  <div class="view-container">
    <slot name="app-bar"></slot>

    <div class="view-container__main-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  width: 100%;
  padding-top: var(--app-bar-height);
  padding-bottom: v-bind(paddingBottom);
}

.view-container__main-wrapper {
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
</style>

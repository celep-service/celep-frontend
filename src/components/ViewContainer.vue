<script setup lang="ts">
import useBottomTabBarStore from '@/stores/useBottomTabBarStore'
import { computed } from 'vue'

/* Prop */
interface Props {
  isActiveBottomTabBar?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isActiveBottomTabBar: true
})

/* Local State */
const paddingBottom = computed(() =>
  props.isActiveBottomTabBar ? 'var(--bottom-tab-bar-height)' : '0'
)

/* Pinia */
const bottomTabBarStore = useBottomTabBarStore()
bottomTabBarStore.isActive = props.isActiveBottomTabBar
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
  height: 100%;
  overflow: hidden;
  padding-top: var(--app-bar-height);
  padding-bottom: v-bind(paddingBottom);
}

.view-container__main-wrapper {
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
</style>

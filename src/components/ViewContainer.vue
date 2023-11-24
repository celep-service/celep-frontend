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
const viewContainerHeight = computed(() =>
  props.isActiveBottomTabBar ? 'calc(100vh - var(--bottom-tab-bar-height))' : '100vh'
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: v-bind(viewContainerHeight);
}

.view-container__main-wrapper {
  flex: 1;
  overflow-y: auto;
}
</style>

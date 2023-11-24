<script setup lang="ts">
import BottomTabBar from '@/components/BottomTabBar/BottomTabBar.vue'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import useBottomTabBarStore from '@/stores/useBottomTabBarStore'
import useConfirmDialogStore from '@/stores/useConfirmDialogStore'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'

/* Pinia */
const { isActive: isActiveBottomTabBar } = storeToRefs(useBottomTabBarStore())
const { isShow: isShowConfirmDialog } = storeToRefs(useConfirmDialogStore())
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
  <BottomTabBar v-if="isActiveBottomTabBar" />

  <!-- Modal -->
  <Teleport to="body">
    <ConfirmDialog v-model:open="isShowConfirmDialog" />
  </Teleport>
</template>

<style lang="scss">
@import './assets/scss/global.scss';
</style>

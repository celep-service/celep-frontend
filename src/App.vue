<script setup lang="ts">
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import useConfirmDialogStore from '@/stores/useConfirmDialogStore'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'

/* Pinia */
const { isShow: isShowConfirmDialog } = storeToRefs(useConfirmDialogStore())
</script>

<template>
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <!-- Modal -->
  <Teleport to="body">
    <ConfirmDialog v-model:open="isShowConfirmDialog" />
  </Teleport>
</template>

<style lang="scss">
@import './assets/scss/global.scss';
</style>

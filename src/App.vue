<script setup lang="ts">
import BottomTabBar from '@/components/BottomTabBar/BottomTabBar.vue'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import ToastMessage from '@/components/Common/ToastMessage.vue'
import useToastMessageStore from '@/composables/useToastMessageStore'
import useBottomTabBarStore from '@/stores/useBottomTabBarStore'
import useConfirmDialogStore from '@/stores/useConfirmDialogStore'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'

/* Pinia */
const { isActive: isActiveBottomTabBar } = storeToRefs(useBottomTabBarStore())
const { isShow: isShowConfirmDialog } = storeToRefs(useConfirmDialogStore())
const { messages: toastMessages } = storeToRefs(useToastMessageStore())
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
    <div class="toast-messages">
      <ToastMessage
        v-for="({ state, body }, index) in toastMessages"
        :key="index"
        :state="state"
        :body="body"
      />
    </div>
  </Teleport>
</template>

<style lang="scss">
@import './assets/scss/global.scss';

.toast-messages {
  z-index: 2000;
  position: fixed;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

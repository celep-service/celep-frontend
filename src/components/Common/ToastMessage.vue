<script lang="ts">
export type ToastMessageState = 'Success' | 'Info' | 'Warning' | 'Error'

export interface ToastMessageProps {
  state: ToastMessageState
  body: string
}
</script>

<script setup lang="ts">
import TextBody2 from '@/components/Text/TextBody2.vue'
import { computed, onMounted, ref } from 'vue'

/* Props */
const props = withDefaults(defineProps<ToastMessageProps>(), {})

/* Local State */
const isShow = ref(false)
const stateColor = computed(() => {
  switch (props.state) {
    case 'Success':
      return 'var(--green-400)'
    case 'Info':
      return 'var(--blue-400)'
    case 'Warning':
      return 'var(--amber-400)'
    case 'Error':
      return 'var(--red-400)'
    default:
      return ''
  }
})
const msOnClose = computed(() => (props.state === 'Success' ? 2000 : 3000))

/* Helper Function */
const showToastMessage = () => {
  isShow.value = true
}
const closeToastMessage = () => {
  isShow.value = false
}

/* Hook */
onMounted(() => {
  showToastMessage()
  setTimeout(() => {
    closeToastMessage()
  }, msOnClose.value)
})
</script>

<template>
  <Transition name="toast-message">
    <div v-if="isShow" class="toast-message">
      <div class="toast-message__left-bar"></div>
      <TextBody2 class="toast-message__body">{{ body }}</TextBody2>
    </div>
  </Transition>
</template>

<style scoped>
.toast-message {
  display: flex;
  gap: 8px;
  width: 90vw;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: rgba(var(--white));
  box-shadow:
    -2px 3px 6px rgba(var(--black) / 0.16),
    0 3px 6px rgba(var(--black) / 0.23);
}

.toast-message__left-bar {
  width: 4px;
  border-radius: 10px;
  background-color: rgba(v-bind(stateColor));
}

.toast-message__body {
  width: 100%;
  white-space: pre-wrap;
}

/*
Transition 
*/
.toast-message-enter-active,
.toast-message-leave-active {
  transition: all 0.8s ease;
}

.toast-message-enter-from,
.toast-message-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

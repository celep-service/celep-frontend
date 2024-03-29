<script setup lang="ts">
import IconButton from '@/components/Common/IconButton.vue'
import TextSubheading from '@/components/Text/TextSubheading.vue'
import { computed, onMounted, onUpdated, ref } from 'vue'

defineOptions({
  inheritAttrs: false
})

/* Props */
interface Props {
  title: string
  open: boolean
  width?: string
}
const props = withDefaults(defineProps<Props>(), {
  width: '90vw'
})

/* Emits */
interface Emits {
  (e: 'update:open', value: boolean): void
}
const emits = defineEmits<Emits>()

/* Local State */
const modalRef = ref<HTMLDialogElement | null>(null)
const openModelValue = computed({
  get() {
    return props.open
  },
  set(value) {
    emits('update:open', value)
  }
})

/* Helper Function */
const closeModal = () => {
  openModelValue.value = false
}

/* Event Handler */
const handleClickModal = (event: Event) => {
  if ((event.target as HTMLDialogElement).nodeName === 'DIALOG') {
    closeModal()
  }
}
const handleClickCloseButton = () => {
  closeModal()
}

/* Hooks */
onMounted(() => {
  modalRef.value?.showModal()
})
onUpdated(() => {
  if (!modalRef.value?.open) {
    modalRef.value?.showModal()
  }
})
</script>

<template>
  <Teleport to="body" v-if="props.open">
    <dialog
      v-bind="$attrs"
      ref="modalRef"
      @click="handleClickModal"
      :style="{ width: props.width }"
      class="base-modal"
    >
      <div class="base-modal__wrapper">
        <div class="base-modal__header">
          <TextSubheading weight="600">{{ title }}</TextSubheading>
          <IconButton
            @click="handleClickCloseButton"
            :icon-option="{
              name: 'close',
              opsz: '22'
            }"
            class="base-modal__close-button"
          />
        </div>
        <div class="base-modal__content">
          <slot></slot>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped lang="scss">
.base-modal {
  padding: 0;
  border: none;
  border-radius: 10px;

  &::backdrop {
    background: rgba(0, 0, 0, 0.6);
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 14px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__close-button {
    position: relative;
    left: 4px;
  }

  &__content {
    padding-top: 0;
    white-space: pre-wrap;
  }
}
</style>

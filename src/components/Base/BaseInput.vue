<script setup lang="ts">
import TextCaption from '@/components/Text/TextCaption.vue'
import { computed, onMounted, ref } from 'vue'

/* Props */
interface Props {
  modelValue: string
  width?: string
  label: string
  type?: 'text' | 'password'
  focus?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  type: 'text',
  focus: false
})

/* Emits */
interface Emits {
  (e: 'update:modelValue', value: string): void
}
const emits = defineEmits<Emits>()

/* Local State */
const inputRef = ref<HTMLInputElement>()
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

/* Hook */
onMounted(() => {
  if (props.focus) {
    inputRef.value?.focus()
  }
})
</script>

<template>
  <div class="base-input-wrapper">
    <TextCaption class="base-input-label">{{ label }}</TextCaption>
    <input ref="inputRef" v-model="modelValue" :type="type" class="base-input" />
  </div>
</template>

<style scoped>
.base-input-wrapper {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  width: v-bind(width);
}

.base-input-label {
  position: absolute;
  top: 4px;
  left: 8px;
  color: rgba(var(--gray));
  user-select: none;
}

.base-input {
  width: 100%;
  height: 44px;
  padding-top: 18px;
  padding-inline: 8px;
  font-size: 14px;
  border: none;
  border: solid 1px rgba(var(--gray-400));
  border-radius: 4px;
}

.base-input:focus {
  outline: none;
  border-color: rgba(var(--gray-600));
}
</style>

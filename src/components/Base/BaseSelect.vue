<script lang="ts">
export interface BaseSelectOption<TValue = string, TLabel = string> {
  value: TValue
  label: TLabel
}
</script>

<script setup lang="ts">
import BaseIcon from '@/components/Base/BaseIcon.vue'
import { computed } from 'vue'

/* Prop */
interface Props {
  modelValue: string | number | undefined
  options: BaseSelectOption[]
  placeholder?: string
  color?: string
  borderColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  color: 'var(--black)',
  borderColor: 'var(--black)'
})

/* Emit */
const emits = defineEmits(['update:modelValue'])

/* Local State */
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>

<template>
  <div class="base-select-wrapper">
    <select v-model="value" class="base-select-wrapper__select">
      <option v-if="placeholder" :value="undefined">{{ placeholder }}</option>
      <option v-for="{ value, label } in options" :key="value" :value="value">{{ label }}</option>
    </select>
    <BaseIcon name="expand_more" class="base-select-wrapper__icon" />
  </div>
</template>

<style scoped>
.base-select-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: solid 1px rgba(v-bind(borderColor));
  border-radius: 30px;
}

.base-select-wrapper__select {
  z-index: 10;
  position: relative;
  width: 100%;
  height: 100%;
  padding-inline: 10px 20px;
  background-color: transparent;
  color: rgba(v-bind(color));
  font-weight: 550;
  appearance: none;
  border: none;
  border-radius: inherit;
}
.base-select-wrapper__select:focus {
  outline: none;
}

.base-select-wrapper__icon {
  position: absolute;
  right: 4px;
}
</style>

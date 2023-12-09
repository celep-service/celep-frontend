<script lang="ts">
export interface BaseSelectOption {
  value: string
  label: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

/* Prop */
interface Props {
  modelValue: string | number | undefined
  options: BaseSelectOption[]
  placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {})

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
  <div class="base-select">
    <select v-model="value">
      <option v-if="placeholder" :value="undefined">{{ placeholder }}</option>
      <option v-for="{ value, label } in options" :key="value" :value="value">{{ label }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.base-select {
  border: solid 1px black;
  border-radius: 30px;

  select {
    font-weight: 550;
    padding: 8px;
    padding-right: 4px;
    border: none;
    border-radius: inherit;
    border-right: 8px solid transparent;

    &:focus {
      outline: none;
    }
  }
}
</style>

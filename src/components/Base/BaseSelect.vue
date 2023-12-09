<script lang="ts">
export interface BaseSelectOption {
  value: string
  label: string
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
    <BaseIcon name="expand_more" class="base-select__icon" />
  </div>
</template>

<style scoped lang="scss">
.base-select {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: solid 1px black;
  border-radius: 30px;

  select {
    z-index: 10;
    position: relative;
    width: 100%;
    height: 100%;
    padding-inline: 10px 20px;
    color: black;
    background-color: transparent;
    font-weight: 550;
    appearance: none;
    border: none;
    border-radius: inherit;

    &:focus {
      outline: none;
    }
  }

  &__icon {
    position: absolute;
    right: 4px;
  }
}
</style>

<script lang="ts">
export interface BaseRadioGroupRadio<TLabel = string, TValue = string | number> {
  label: TLabel
  value: TValue
}
</script>

<script setup lang="ts">
import TextCaption from '@/components/Text/TextCaption.vue'
import { computed } from 'vue'

/* Prop */
interface Props {
  modelValue: string | number
  caption: string
  radios: BaseRadioGroupRadio[]
}
const props = withDefaults(defineProps<Props>(), {})

/* Emit */
interface Emits {
  (e: 'update:modelValue', value: string | number): void
}
const emits = defineEmits<Emits>()

/* Local State */
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>

<template>
  <div class="base-radio-group">
    <TextCaption class="base-radio-group__caption">{{ caption }}</TextCaption>
    <label v-for="radio in radios" :key="radio.value" class="base-radio-group__label">
      {{ radio.label }}
      <input v-model="modelValue" type="radio" :name="caption" :value="radio.value" />
    </label>
  </div>
</template>

<style scoped lang="scss">
.base-radio-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 8px;
  padding-top: 26px;
  border: solid 1px rgba(var(--gray-400));
  border-radius: 4px;

  &__caption {
    position: absolute;
    top: 4px;
    left: 8px;
    color: rgba(var(--gray));
    user-select: none;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }
}
</style>

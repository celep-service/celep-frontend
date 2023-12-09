<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

/* Prop */
interface Props {
  type: 'filled' | 'outlined'
  text: string
  textColor?: string
  borderColor?: string
  backgroundColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'inherit',
  borderColor: 'inherit',
  textColor: 'inherit'
})

/* Local State */
const baseChipStyle = computed<CSSProperties>(() => ({
  color: `rgba(${props.textColor})`,
  backgroundColor: props.type === 'outlined' ? undefined : `rgba(${props.backgroundColor})`,
  border: props.type === 'filled' ? undefined : `solid 1px rgba(${props.borderColor})`
}))
</script>

<template>
  <div class="base-chip" :style="baseChipStyle">{{ text }}</div>
</template>

<style lang="scss">
.base-chip {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  padding-inline: 10px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
}
</style>

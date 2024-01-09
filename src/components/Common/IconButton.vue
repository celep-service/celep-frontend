<script setup lang="ts">
import BaseButton, { type BaseButtonProps } from '@/components/Base/BaseButton.vue'
import BaseIcon, { type BaseIconProps } from '@/components/Base/BaseIcon.vue'
import { computed } from 'vue'

/* Prop */
interface Props {
  buttonOption?: BaseButtonProps
  iconOption: BaseIconProps
}
const props = defineProps<Props>()

/* Local State */
const buttonType = computed(() => props.buttonOption?.type ?? 'text')
</script>

<template>
  <BaseButton v-bind="{ ...props.buttonOption, type: buttonType }">
    <BaseIcon v-bind="props.iconOption" />
  </BaseButton>
</template>

<style scoped lang="scss"></style>

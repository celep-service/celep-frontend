<script setup lang="ts">
interface Props {
  weight?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  weight: 400
})
</script>

<template>
  <div class="text-heading1">
    <slot></slot>
  </div>
</template>

<style scoped>
.text-heading1 {
  font-size: 32px;
  line-height: 38px;
  letter-spacing: -0.04em;
  font-weight: v-bind(weight);
}
</style>

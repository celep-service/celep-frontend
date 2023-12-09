<script setup lang="ts">
import { computed } from 'vue'

/* Prop */
interface Props {
  shape?: 'rectangle' | 'circle'
  width?: string
  height: string
}
const props = withDefaults(defineProps<Props>(), {
  shape: 'rectangle',
  width: '100%'
})

/* Local State */
const borderRadius = computed(() => (props.shape === 'rectangle' ? '0' : '50%'))
</script>

<template>
  <div class="base-skeleton"></div>
</template>

<style scoped>
.base-skeleton {
  display: inline-block;
  width: v-bind(width);
  height: v-bind(height);
  background-color: rgba(var(--gray-100));
  border-radius: v-bind(borderRadius);
}
</style>

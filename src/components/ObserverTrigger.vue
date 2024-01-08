<script setup lang="ts">
import { onMounted, ref } from 'vue'

/* Emits */
interface Emits {
  (e: 'triggerIntersected'): void
}
const emits = defineEmits<Emits>()

/* Local State */
const triggerRef = ref<HTMLDivElement>()

/* Event Handler */

/* Hook */
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        emits('triggerIntersected')
      }
    },
    {
      root: null,
      threshold: 1.0
    }
  )

  if (triggerRef.value) {
    observer.observe(triggerRef.value)
  }
})
/* Watch */
</script>

<template>
  <div ref="triggerRef" class="observer-trigger"></div>
</template>

<style scoped lang="scss">
.observer-trigger {
  height: 10px;
}
</style>

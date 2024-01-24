<script setup lang="ts">
import ClothesSelectListItem from '@/features/Clothes/components/ClothesSelectListItem.vue'
import type { ClothesTemplate } from '@/model/Clothes'

/* Prop */
interface Props {
  clothesList: ClothesTemplate[]
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="clothes-select-list">
    <ClothesSelectListItem v-for="clothes in clothesList" :key="clothes.id" v-bind="clothes" />
  </div>
</template>

<style scoped lang="scss">
.clothes-select-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
}
</style>

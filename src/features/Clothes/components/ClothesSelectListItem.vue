<script setup lang="ts">
import BaseChip from '@/components/Base/BaseChip.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import { CLOTHES_CATEGORY_MAP, type ClothesTemplate } from '@/model/Clothes'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed } from 'vue'

/* Prop */
type Props = ClothesTemplate
const props = withDefaults(defineProps<Props>(), {})

/* Pinia */
const { checkedClothesList } = storeToRefs(useCreatePostStore())

/* Local State */
const isChecked = computed(() => checkedClothesList.value?.includes(props))
const checkboxId = uuidv4()
const categoryColor = computed(() => {
  switch (props.clothesCategory) {
    case 'ACCESSORY':
      return 'var(--sky)'
    case 'BAG':
      return 'var(--green)'
    case 'BOTTOM':
      return 'var(--indigo)'
    case 'OUTER':
      return 'var(--rose)'
    case 'SHOES':
      return 'var(--amber)'
    case 'TOP':
      return 'var(--blue)'
    default:
      return ''
  }
})
const clothesCategory = computed(() => CLOTHES_CATEGORY_MAP.get(props.clothesCategory) as string)
const fullName = computed(() => `${props.brand} - ${props.name}`)
</script>

<template>
  <label
    :for="checkboxId"
    class="clothes-select-list-item"
    :class="{ 'clothes-select-list-item--checked': isChecked }"
  >
    <input
      v-model="checkedClothesList"
      :value="props"
      type="checkbox"
      :id="checkboxId"
      class="clothes-select-list-item__checkbox"
    />
    <img :src="imageUrl" class="clothes-select-list-item__image" />
    <BaseChip
      type="outlined"
      :text="clothesCategory"
      :border-color="categoryColor"
      :text-color="categoryColor"
      class="clothes-select-list-item__category-chip"
    />
    <TextBody2 weight="500">{{ fullName }}</TextBody2>
  </label>
</template>

<style scoped lang="scss">
.clothes-select-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-bottom: solid 1px rgba(var(--gray-100));

  &--checked {
    background-color: rgba(var(--gray-50));
  }

  &__checkbox {
    width: 14px;
    aspect-ratio: 1;
  }

  &__image {
    width: 80px;
  }

  &__category-chip {
    word-break: keep-all;
  }
}
</style>

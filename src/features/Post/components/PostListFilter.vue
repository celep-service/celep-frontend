<script setup lang="ts">
import type { BaseSelectOption } from '@/components/Base/BaseSelect.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import type { CelebCategoryCode } from '@/model/Celeb'
import type { GenderCode } from '@/model/Gender'
import { computed } from 'vue'

/* Constant */
const GENDER_OPTIONS: BaseSelectOption[] = [
  {
    value: 'MALE',
    label: '남성'
  },
  {
    value: 'FEMALE',
    label: '여성'
  }
]
const CELEB_CATEGORY_OPTIONS: BaseSelectOption[] = [
  {
    value: 'TALENT',
    label: '탤런트'
  },
  {
    value: 'MODEL',
    label: '모델'
  },
  {
    value: 'SINGER',
    label: '가수'
  },
  {
    value: 'ACTOR',
    label: '배우'
  },
  {
    value: 'INFLUENCER',
    label: '인플루언서'
  },
  {
    value: 'ETC',
    label: '기타'
  }
]

/* Prop */
interface Props {
  gender: GenderCode
  celebCategory?: CelebCategoryCode
}
const props = withDefaults(defineProps<Props>(), {})

/* Emit */
const emits = defineEmits(['update:gender', 'update:celebCategory'])

/* Local State */
const genderModelValue = computed({
  get() {
    return props.gender
  },
  set(value) {
    emits('update:gender', value)
  }
})
const celebCategoryModelValue = computed({
  get() {
    return props.celebCategory
  },
  set(value) {
    emits('update:celebCategory', value)
  }
})
</script>

<template>
  <div class="post-list-filter">
    <BaseSelect v-model="genderModelValue" :options="GENDER_OPTIONS" />
    <BaseSelect
      v-model="celebCategoryModelValue"
      :options="CELEB_CATEGORY_OPTIONS"
      placeholder="셀럽 선택"
    />
  </div>
</template>

<style scoped lang="scss">
.post-list-filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 10px 6px;
}
</style>

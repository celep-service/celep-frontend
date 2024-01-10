<script setup lang="ts">
import TextBody2 from '@/components/Text/TextBody2.vue';
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue';

/* Prop */
interface Props {
  modelValue?: number
  id: number
  name: string
  imageUrl: string
}
const props = withDefaults(defineProps<Props>(), {})

/* Emits */
interface Emits {
  (e: 'update:modelValue', value?: number): void
}
const emits = defineEmits<Emits>()

/* Local State */
const radioId = uuidv4()
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
const isChecked = computed(() => modelValue.value === props.id)
</script>

<template>
  <label
    :for="radioId"
    class="celeb-select-profile-card"
    :class="{ 'celeb-select-profile-card--checked': isChecked }"
  >
    <div class="celeb-select-profile-card__avatar-wrapper">
      <img class="celeb-select-profile-card__avatar" :src="imageUrl" />
    </div>

    <TextBody2 weight="500" class="celeb-select-profile-card__celeb-name">{{ name }}</TextBody2>

    <input
      type="radio"
      name="celeb-select-profile-card"
      :id="radioId"
      :value="id"
      v-model="modelValue"
      class="celeb-select-profile-card__avatar-radio"
    />
  </label>
</template>

<style scoped lang="scss">
.celeb-select-profile-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  max-width: 100px;
  padding: 14px;
  border: solid 1px rgba(var(--gray-200));
  border-radius: 8px;

  &--checked {
    border-color: rgba(var(--blue));
  }

  &__avatar-wrapper {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: rgba(var(--gray-300));
    overflow: hidden;
  }

  &__avatar {
    width: 100%;
    height: 100%;
  }

  &__celeb-name {
    line-height: 1;
    text-align: center;
  }

  &__avatar-radio {
    display: none;
  }
}
</style>

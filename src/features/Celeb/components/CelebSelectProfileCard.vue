<script setup lang="ts">
import TextBody2 from '@/components/Text/TextBody2.vue'
import { v4 as uuidv4 } from 'uuid'
import { computed, type CSSProperties } from 'vue'

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
const avatarStyle = computed<CSSProperties>(() => ({
  backgroundImage: `url(${props.imageUrl})`,
  backgroundColor: props.imageUrl ?? 'rgba(var(--gray-300))'
}))
</script>

<template>
  <label
    :for="radioId"
    class="celeb-select-profile-card"
    :class="{ 'celeb-select-profile-card--checked': isChecked }"
  >
    <div class="celeb-select-profile-card__avatar-wrapper">
      <div class="celeb-select-profile-card__avatar" :style="avatarStyle"></div>
    </div>

    <TextBody2 weight="550" class="celeb-select-profile-card__celeb-name">{{ name }}</TextBody2>

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
  padding: 8px;

  &--checked {
    .celeb-select-profile-card__avatar-wrapper {
      border-color: rgba(var(--blue));
    }

    .celeb-select-profile-card__celeb-name {
      color: rgba(var(--blue));
      font-weight: 650;
    }
  }

  &__avatar-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: solid 2px rgba(var(--white));
  }

  &__avatar {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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

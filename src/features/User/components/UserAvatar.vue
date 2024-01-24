<script setup lang="ts">
import BaseIcon from '@/components/Base/BaseIcon.vue'
import { computed } from 'vue'

/* Prop */
interface Props {
  imageUrl?: string
  iconSize?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  iconSize: '16'
})

/* Local State */
const fullImageUrl = computed(() => `url(${props.imageUrl})`)
</script>

<template>
  <div class="user-avatar">
    <div
      v-if="imageUrl"
      :style="{ backgroundImage: fullImageUrl }"
      class="user-avatar__image-avatar"
    ></div>

    <div v-else class="user-avatar__default-avatar">
      <BaseIcon name="person" :opsz="props.iconSize" fill="1" class="user-avatar__default-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-avatar {
  width: 24px;
  aspect-ratio: 1;
  border-radius: 50%;

  &__image-avatar {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__default-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: rgba(var(--gray-300));
  }

  &__default-icon {
    color: rgba(var(--white));
    margin-bottom: 1px;
  }
}
</style>

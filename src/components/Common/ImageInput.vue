<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue'

/* Props */
interface Props {
  file?: File
  imagePreviewUrl?: string
}
const props = withDefaults(defineProps<Props>(), {})

/* Emits */
interface Emits {
  (e: 'update:file', value?: File): void
  (e: 'update:imagePreviewUrl', value?: string): void
}
const emits = defineEmits<Emits>()

/* Local State */
const imageInputId = uuidv4()
const fileModelValue = computed({
  get() {
    return props.file
  },
  set(value) {
    emits('update:file', value)
  }
})
const imagePreviewUrlModelValue = computed({
  get() {
    return props.imagePreviewUrl
  },
  set(value) {
    emits('update:imagePreviewUrl', value)
  }
})

/* Event Handler */
const handleImageChange = (event: Event) => {
  const reader = new FileReader()
  const imageFile = (event.target as HTMLInputElement).files![0]

  fileModelValue.value = imageFile

  reader.onload = (event) => {
    imagePreviewUrlModelValue.value = event.target!.result as string
  }

  reader.readAsDataURL(imageFile)
}
</script>

<template>
  <label :id="imageInputId" class="image-input">
    <div v-if="!imagePreviewUrlModelValue" class="image-input__upload-instruction-wrapper">
      <slot></slot>
    </div>

    <div
      v-else
      :style="{ backgroundImage: `url(${imagePreviewUrlModelValue})` }"
      class="image-input__preview-image"
    ></div>

    <input @change="handleImageChange" type="file" :id="imageInputId" accept="image/*" hidden />
  </label>
</template>

<style scoped lang="scss">
.image-input {
  position: relative;
  width: 160px;
  aspect-ratio: 1;
  border-radius: 8px;

  &__upload-instruction-wrapper {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  &__preview-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: inherit;
  }
}
</style>

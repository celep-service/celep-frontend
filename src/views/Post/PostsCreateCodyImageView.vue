<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import ImageInput from '@/components/Common/ImageInput.vue'
import TextBody1 from '@/components/Text/TextBody1.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

/* Router */
const router = useRouter()

/* Pinia */
const { codyImageFile, codyImagePreviewUrl } = storeToRefs(useCreatePostStore())
const { resetAllState, validateCodyImage } = useCreatePostStore()

/* Event Handler */
const handleClickGoToPreviousButton = () => {
  router.push({ name: 'posts/create/title' })
}
const handleClickInputCompleteButton = () => {
  if (validateCodyImage()) {
    router.push({ name: 'posts/create/clothes' })
  }
}
</script>

<template>
  <ViewContainer class="posts-create-cody-image-view">
    <template #app-bar>
      <AppBar type="close" title="코디 사진" :on-close="resetAllState" />
    </template>

    <main class="posts-create-cody-image-view__main">
      <TextHeading3 weight="550" class="posts-create-cody-image-view__title">
        코디 사진을 선택해 주세요
        <br />
        (정방형 사진)
      </TextHeading3>

      <ImageInput
        v-model:file="codyImageFile"
        v-model:image-preview-url="codyImagePreviewUrl"
        class="posts-create-cody-image-view__image-input"
      >
        <div class="posts-create-cody-image-view__image-upload-instruction">
          <BaseIcon name="add_photo_alternate" opsz="60" wght="200" />
          <TextBody1 weight="500">사진 업로드</TextBody1>
        </div>
      </ImageInput>

      <div class="posts-create-cody-image-view__buttons-wrapper">
        <BaseButton
          @click="handleClickGoToPreviousButton"
          type="outlined"
          textColor="var(--gray-400)"
          class="posts-create-cody-image-view__button"
        >
          이전으로
        </BaseButton>
        <BaseButton
          @click="handleClickInputCompleteButton"
          class="posts-create-cody-image-view__button"
        >
          다음으로
        </BaseButton>
      </div>
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-cody-image-view {
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    margin-top: 60px;
    text-align: center;
    line-height: 26px;
    color: rgba(var(--zinc-800));
  }

  &__image-input {
    margin-top: 50px;
  }

  &__image-upload-instruction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    color: rgba(var(--gray-300));
    border: solid 2px rgba(var(--gray-300));
    border-radius: inherit;
  }

  &__buttons-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 80vw;
    margin-top: 80px;
  }

  &__button {
    flex: 1;
    max-width: 130px;
  }
}
</style>

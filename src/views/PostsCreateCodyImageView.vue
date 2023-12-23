<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import TextBody1 from '@/components/Text/TextBody1.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useToastMessageStore from '@/composables/useToastMessageStore'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

/* Router */
const router = useRouter()

/* Pinia */
const { codyImagePreviewUrl } = storeToRefs(useCreatePostStore())
const { resetAllState } = useCreatePostStore()
const { showToastMessage } = useToastMessageStore()

/* Helper Function */
const validate = () => {
  if (!codyImagePreviewUrl.value) {
    showToastMessage('코디 사진을 선택해 주세요.', 'Warning')
    return false
  }

  return true
}

/* Event Handler */
const handleImageChange = (event: Event) => {
  const reader = new FileReader()

  reader.onload = (event) => {
    codyImagePreviewUrl.value = event.target!.result as string
  }

  reader.readAsDataURL((event.target as HTMLInputElement).files![0])
}
const handleClickGoToPreviousButton = () => {
  router.push({ name: 'posts/create/title' })
}
const handleClickInputCompleteButton = () => {
  if (validate()) {
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
      </TextHeading3>

      <label id="image-file" class="posts-create-cody-image-view__image-upload-wrapper">
        <div v-if="!codyImagePreviewUrl" class="posts-create-cody-image-view__image-upload">
          <BaseIcon name="add_photo_alternate" opsz="60" wght="200" />
          <TextBody1 weight="500">사진 업로드</TextBody1>
        </div>

        <div
          v-else
          :style="{ backgroundImage: `url(${codyImagePreviewUrl})` }"
          class="posts-create-cody-image-view__image"
        ></div>

        <input @change="handleImageChange" type="file" id="image-file" accept="image/*" hidden />
      </label>

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
          입력완료
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

  &__image-upload-wrapper {
    width: 160px;
    aspect-ratio: 1;
    margin-top: 50px;
  }

  &__image-upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    border: solid 2px rgba(var(--gray-300));
    border-radius: 8px;
    color: rgba(var(--gray-300));
  }

  &__image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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

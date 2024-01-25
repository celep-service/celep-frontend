<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import { FirebaseStorageUploadError } from '@/error'
import ClothesSelectListContainer from '@/features/Clothes/components/ClothesSelectListContainer.vue'
import useCreatePostMutation from '@/features/Post/composables/useCreatePostMutation'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import uploadFile from '@/firebase/uploadFile'
import { getDownloadURL } from 'firebase/storage'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

/* Router */
const router = useRouter()

/* Pinia */
const { codyImageFile, uploadedCodyImageUrl, payload } = storeToRefs(useCreatePostStore())
const { resetAllState, validateAll } = useCreatePostStore()
const { showAlertDialog } = useAlertDialogStore()

/* Vue Query */
const { mutateAsync, isLoading: isLoadingCreatePost } = useCreatePostMutation()

/* Local State */
const isLoadingUploadFile = ref(false)
const isLoading = computed(() => isLoadingUploadFile.value || isLoadingCreatePost.value)

/* Event Handler */
const handleClickGoToPreviousButton = () => {
  router.push({ name: 'posts/create/cody-image' })
}
const handleClickInputCompleteButton = async () => {
  if (!validateAll()) return

  try {
    isLoadingUploadFile.value = true

    const codyImageFileName = uuidv4()
    const uploadedFile = await uploadFile(codyImageFile.value!, codyImageFileName)

    uploadedCodyImageUrl.value = await getDownloadURL(uploadedFile.ref)
    isLoadingUploadFile.value = false

    await mutateAsync(payload.value)
  } catch (error) {
    if (error instanceof FirebaseStorageUploadError) {
      showAlertDialog('[이미지 업로드 에러] 관리자에게 문의해 주세요.')
      isLoadingUploadFile.value = false
    }
  }
}
</script>

<template>
  <ViewContainer class="posts-create-clothes-view">
    <template #app-bar>
      <AppBar type="close" title="의류/악세사리" :on-close="resetAllState" />
    </template>

    <main class="posts-create-clothes-view__main">
      <TextHeading3 weight="550" class="posts-create-clothes-view__title">
        의류나 악세사리를
        <br />
        선택해 주세요
      </TextHeading3>

      <ClothesSelectListContainer />

      <div class="posts-create-clothes-view__buttons-wrapper">
        <BaseButton
          @click="handleClickGoToPreviousButton"
          type="outlined"
          textColor="var(--gray-400)"
          class="posts-create-clothes-view__button"
        >
          이전으로
        </BaseButton>
        <BaseButton
          @click="handleClickInputCompleteButton"
          class="posts-create-clothes-view__button"
          :is-loading="isLoading"
        >
          입력완료
        </BaseButton>
      </div>
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-clothes-view {
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

  &__buttons-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 80vw;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  &__button {
    flex: 1;
    max-width: 130px;
  }
}
</style>

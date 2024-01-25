<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseModal from '@/components/Base/BaseModal.vue'
import BaseSelect, { type BaseSelectOption } from '@/components/Base/BaseSelect.vue'
import ImageInput from '@/components/Common/ImageInput.vue'
import TextBody1 from '@/components/Text/TextBody1.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import TextCaption from '@/components/Text/TextCaption.vue'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import { FirebaseStorageUploadError } from '@/error'
import useCreateCelebMutation from '@/features/Celeb/composables/useCreateCelebMutation'
import uploadFile from '@/firebase/uploadFile'
import type { ApiErrorResponse } from '@/model/Api'
import type { CelebCategory, CelebCategoryCode, CreateCelebRequest } from '@/model/Celeb'
import axios from 'axios'
import { getDownloadURL } from 'firebase/storage'
import { computed, reactive, ref, watch } from 'vue'

/* Constant */
const CELEB_CATEGORY_OPTIONS: BaseSelectOption<CelebCategoryCode, CelebCategory>[] = [
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
  open: boolean
}
const props = withDefaults(defineProps<Props>(), {})

/* Emit */
interface Emits {
  (e: 'update:open', value: boolean): void
}
const emits = defineEmits<Emits>()

/* Router */

/* Pinia */
const { showErrorAlertDialog } = useAlertDialogStore()

/* Local State */
const openModelValue = computed({
  get() {
    return props.open
  },
  set(value) {
    emits('update:open', value)
  }
})
const celebName = ref<string>()
const celebImageFile = ref<File>()
const celebImagePreviewUrl = ref<string>()
const uploadedCelebImageUrl = ref<string>()
const celebCategory = ref<CelebCategoryCode>()
const requestData = computed<CreateCelebRequest>(() => ({
  payload: {
    name: celebName.value!,
    imageUrl: uploadedCelebImageUrl.value!,
    celebCategory: celebCategory.value!
  }
}))
const isLoadingUploadCelebImage = ref(false)
const isLoading = computed(() => isLoadingUploadCelebImage.value || isLoadingCreateCeleb.value)
interface ValidationError {
  field?: 'name' | 'imageUrl' | 'celebCategory'
  message?: string
}
const validationError = reactive<ValidationError>({ field: undefined, message: undefined })
const serverErrorMessage = ref<string>()

/* Vue Query */
const {
  mutateAsync,
  isLoading: isLoadingCreateCeleb,
  isError: isErrorCreateCeleb,
  error: createCelebError
} = useCreateCelebMutation()

/* Helper Function */
const closeModal = () => {
  openModelValue.value = false
}
const validate = () => {
  if (!celebImageFile.value) {
    validationError.field = 'imageUrl'
    validationError.message = '셀럽 사진을 추가해 주세요.'
    return false
  }

  if (!celebName.value) {
    validationError.field = 'name'
    validationError.message = '셀럽 이름을 입력해 주세요.'
    return false
  }

  if (!celebCategory.value) {
    validationError.field = 'celebCategory'
    validationError.message = '셀럽의 분야를 선택해 주세요.'
    return false
  }

  return true
}

/* Event Handler */
const handleClickCreateButton = async () => {
  if (!validate()) return

  try {
    isLoadingUploadCelebImage.value = true
    const uploadedFile = await uploadFile(celebImageFile.value!)
    uploadedCelebImageUrl.value = await getDownloadURL(uploadedFile.ref)

    await mutateAsync(requestData.value)

    closeModal()
  } catch (error) {
    if (error instanceof FirebaseStorageUploadError) {
      showErrorAlertDialog('[이미지 업로드 에러] 관리자에게 문의해 주세요.')
    }
  } finally {
    isLoadingUploadCelebImage.value = false
  }
}

/* Watch */
watch(isErrorCreateCeleb, (isErrorCreateCeleb) => {
  if (!isErrorCreateCeleb) return

  if (axios.isAxiosError<ApiErrorResponse>(createCelebError.value)) {
    serverErrorMessage.value = createCelebError.value.response?.data.message
  }
})
</script>

<template>
  <BaseModal v-model:open="openModelValue" title="셀럽 추가" class="celeb-create-modal">
    <div class="celeb-create-modal__content">
      <div class="celeb-create-modal__celeb-image-input-wrapper">
        <ImageInput
          v-model:file="celebImageFile"
          v-model:image-preview-url="celebImagePreviewUrl"
          class="celeb-create-modal__celeb-image-input"
        >
          <div class="celeb-create-modal__celeb-image-upload-instruction">
            <BaseIcon name="person" opsz="60" wght="200" />
            <TextBody1 weight="500">사진 업로드</TextBody1>
            <BaseIcon
              name="photo_camera"
              class="celeb-create-modal__celeb-image-upload-camera-icon"
            />
          </div>
        </ImageInput>
        <TextBody2
          v-if="validationError.field === 'imageUrl'"
          class="celeb-create-modal__error-message"
        >
          {{ validationError.message }}
        </TextBody2>
      </div>

      <div class="celeb-create-modal__celeb-name-input-wrapper">
        <BaseInput v-model="celebName" label="셀럽 이름" :focus="true" />
        <TextBody2
          v-if="validationError.field === 'name'"
          class="celeb-create-modal__error-message"
        >
          {{ validationError.message }}
        </TextBody2>
      </div>

      <div class="celeb-create-modal__celeb-category-select-wrapper">
        <TextCaption class="celeb-create-modal__celeb-category-label">분야</TextCaption>
        <BaseSelect
          v-model="celebCategory"
          :options="CELEB_CATEGORY_OPTIONS"
          placeholder="선택"
          border-color="var(--gray-400)"
          class="celeb-create-modal__celeb-category-select"
        />
        <TextBody2
          v-if="validationError.field === 'celebCategory'"
          class="celeb-create-modal__error-message"
        >
          {{ validationError.message }}
        </TextBody2>
      </div>

      <TextBody2 v-if="serverErrorMessage" class="celeb-create-modal__error-message">
        {{ serverErrorMessage }}
      </TextBody2>

      <BaseButton
        @click="handleClickCreateButton"
        backgroundColor="var(--save)"
        class="celeb-create-modal__create-button"
        :is-loading="isLoading"
      >
        <BaseIcon name="add" opsz="18" wght="500" />
        추가하기
      </BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.celeb-create-modal {
  max-width: 500px;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  &__error-message {
    color: rgba(var(--red));
    font-weight: 500;
    width: fit-content;
  }

  &__celeb-image-input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-block: 20px;
  }

  &__celeb-image-input {
    width: 150px;
    border-radius: 50%;
  }

  &__celeb-image-upload-instruction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: rgba(var(--gray-300));
    border: solid 1px rgba(var(--gray-300));
    border-radius: inherit;
  }

  &__celeb-image-upload-camera-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    aspect-ratio: 1;
    color: rgba(var(--white));
    background-color: rgba(var(--blue));
    border-radius: 50%;
  }

  &__celeb-name-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  &__celeb-category-select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  &__celeb-category-label {
    margin-left: 4px;
    color: rgba(var(--gray));
  }

  &__celeb-category-select {
    border-radius: 4px;
  }

  &__create-button {
    margin-top: 20px;
    margin-left: auto;
  }
}
</style>

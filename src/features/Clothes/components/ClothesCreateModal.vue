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
import useCreateClothesMutation from '@/features/Clothes/composables/useCreateClothesMutation'
import uploadFile from '@/firebase/uploadFile'
import type { ApiErrorResponse } from '@/model/Api'
import type { ClothesCategory, ClothesCategoryCode, CreateClothesRequest } from '@/model/Clothes'
import type { Gender } from '@/model/Gender'
import axios from 'axios'
import { getDownloadURL } from 'firebase/storage'
import { computed, reactive, ref, watch } from 'vue'

/* Constant */
const CLOTHES_CATEGORY_OPTIONS: BaseSelectOption<ClothesCategoryCode, ClothesCategory>[] = [
  { label: '가방', value: 'BAG' },
  { label: '상의', value: 'TOP' },
  { label: '신발', value: 'SHOES' },
  { label: '아우터', value: 'OUTER' },
  { label: '악세사리', value: 'ACCESSORY' },
  { label: '하의', value: 'BOTTOM' }
]
const GENDER_OPTIONS: BaseSelectOption<Gender, Gender>[] = [
  {
    value: '남성',
    label: '남성'
  },
  {
    value: '여성',
    label: '여성'
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
const clothesName = ref<string>()
const clothesImageFile = ref<File>()
const clothesImagePreviewUrl = ref<string>()
const uploadedClothesImageUrl = ref<string>()
const clothesCategory = ref<ClothesCategoryCode>('TOP')
const clothesBrand = ref<string>()
const clothesGender = ref<Gender>('남성')
const clothesSellUrl = ref<string>()
const requestData = computed<CreateClothesRequest>(() => ({
  payload: {
    name: clothesName.value!,
    clothesCategory: clothesCategory.value!,
    brand: clothesBrand.value,
    gender: clothesGender.value!,
    imageUrl: uploadedClothesImageUrl.value!,
    sellUrl: clothesSellUrl.value
  }
}))
const isLoadingUploadClothesImage = ref(false)
const isLoading = computed(() => isLoadingUploadClothesImage.value || isLoadingCreateClothes.value)
interface ValidationError {
  field?: 'name' | 'imageUrl' | 'clothesCategory' | 'gender'
  message?: string
}
const validationError = reactive<ValidationError>({ field: undefined, message: undefined })
const serverErrorMessage = ref<string>()

/* Vue Query */
const {
  mutateAsync,
  isLoading: isLoadingCreateClothes,
  isError: isErrorCreateClothes,
  error: createClothesError
} = useCreateClothesMutation()

/* Helper Function */
const closeModal = () => {
  openModelValue.value = false
}
const validate = () => {
  if (!clothesImageFile.value) {
    validationError.field = 'imageUrl'
    validationError.message = '사진을 추가해 주세요.'
    return false
  }

  if (!clothesName.value) {
    validationError.field = 'name'
    validationError.message = '이름을 입력해 주세요.'
    return false
  }

  if (!clothesCategory.value) {
    validationError.field = 'clothesCategory'
    validationError.message = '카테고리를 선택해 주세요.'
    return false
  }

  if (!clothesGender.value) {
    validationError.field = 'gender'
    validationError.message = '성별을 선택해 주세요.'
    return false
  }

  return true
}

/* Event Handler */
const handleClickCreateButton = async () => {
  if (!validate()) return

  try {
    isLoadingUploadClothesImage.value = true
    const uploadedFile = await uploadFile(clothesImageFile.value!)
    uploadedClothesImageUrl.value = await getDownloadURL(uploadedFile.ref)

    await mutateAsync(requestData.value)

    closeModal()
  } catch (error) {
    if (error instanceof FirebaseStorageUploadError) {
      showErrorAlertDialog('[이미지 업로드 에러] 관리자에게 문의해 주세요.')
    }
  } finally {
    isLoadingUploadClothesImage.value = false
  }
}

/* Watch */
watch(isErrorCreateClothes, (isErrorCreateClothes) => {
  if (!isErrorCreateClothes) return

  if (axios.isAxiosError<ApiErrorResponse>(createClothesError.value)) {
    serverErrorMessage.value = createClothesError.value.response?.data.message
  }
})
</script>

<template>
  <BaseModal v-model:open="openModelValue" title="의류/악세사리 추가" class="clothes-create-modal">
    <div class="clothes-create-modal__content">
      <div class="clothes-create-modal__clothes-image-input-wrapper">
        <ImageInput
          v-model:file="clothesImageFile"
          v-model:image-preview-url="clothesImagePreviewUrl"
          class="clothes-create-modal__clothes-image-input"
        >
          <div class="clothes-create-modal__clothes-image-upload-instruction">
            <BaseIcon name="add_photo_alternate" opsz="60" wght="200" />
            <TextBody1 weight="500">사진 업로드</TextBody1>
          </div>
        </ImageInput>
        <TextBody2
          v-if="validationError.field === 'imageUrl'"
          class="clothes-create-modal__error-message"
        >
          {{ validationError.message }}
        </TextBody2>
      </div>

      <div class="clothes-create-modal__clothes-name-input-wrapper">
        <BaseInput v-model="clothesName" label="이름" :focus="true" />
        <TextBody2
          v-if="validationError.field === 'name'"
          class="clothes-create-modal__error-message"
        >
          {{ validationError.message }}
        </TextBody2>
      </div>

      <div class="clothes-create-modal__select-wrapper">
        <TextCaption class="clothes-create-modal__select-label">카테고리</TextCaption>
        <BaseSelect
          v-model="clothesCategory"
          :options="CLOTHES_CATEGORY_OPTIONS"
          border-color="var(--gray-400)"
          class="clothes-create-modal__select"
        />
        <TextBody2
          v-if="validationError.field === 'clothesCategory'"
          class="clothes-create-modal__error-message"
        >
          {{ validationError.message }}
        </TextBody2>
      </div>

      <BaseInput v-model="clothesBrand" label="브랜드(선택)" />

      <div class="clothes-create-modal__select-wrapper">
        <TextCaption class="clothes-create-modal__select-label">성별</TextCaption>
        <BaseSelect
          v-model="clothesGender"
          :options="GENDER_OPTIONS"
          border-color="var(--gray-400)"
          class="clothes-create-modal__select"
        />
        <TextBody2
          v-if="validationError.field === 'gender'"
          class="clothes-create-modal__error-message"
        >
          {{ validationError.message }}
        </TextBody2>
      </div>

      <BaseInput v-model="clothesSellUrl" label="구매 링크(선택)" />

      <TextBody2 v-if="serverErrorMessage" class="clothes-create-modal__error-message">
        {{ serverErrorMessage }}
      </TextBody2>

      <BaseButton
        @click="handleClickCreateButton"
        backgroundColor="var(--save)"
        class="clothes-create-modal__create-button"
        :is-loading="isLoading"
      >
        <BaseIcon name="add" opsz="18" wght="500" />
        추가하기
      </BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.clothes-create-modal {
  max-width: 500px;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__error-message {
    color: rgba(var(--red));
    font-weight: 500;
    width: fit-content;
  }

  &__clothes-image-input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-block: 20px;
  }

  &__clothes-image-input {
    width: 150px;
  }

  &__clothes-image-upload-instruction {
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

  &__clothes-image-upload-camera-icon {
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

  &__clothes-name-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  &__select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  &__select-label {
    margin-left: 4px;
    color: rgba(var(--gray));
  }

  &__select {
    border-radius: 4px;
  }

  &__create-button {
    margin-top: 10px;
    margin-left: auto;
  }
}
</style>

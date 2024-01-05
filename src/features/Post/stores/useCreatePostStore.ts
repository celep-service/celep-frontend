import useToastMessageStore from '@/composables/useToastMessageStore'
import type { ClothesTemplate } from '@/model/Clothes'
import type { GenderCode } from '@/model/Gender'
import type { CreatePostRequest } from '@/model/Post'
import { isEmptyArray } from '@/utils/array'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/* Pinia */
const { showToastMessage } = useToastMessageStore()

const useCreatePostStore = defineStore('createPost', () => {
  /* State */
  const celebId = ref<number>()
  const celebNameSearchKeyword = ref<string>()
  const gender = ref<GenderCode>('MALE')
  const title = ref<string>()
  const codyImageFile = ref<File>()
  const codyImagePreviewUrl = ref<string>()
  const uploadedCodyImageUrl = ref<string>()
  const checkedClothesList = ref<ClothesTemplate[]>([])
  const clothesNameSearchKeyword = ref<string>()

  /* Getter */
  const payload = computed<CreatePostRequest>(() => ({
    payload: {
      celebId: celebId.value!,
      clothesIdList: checkedClothesList.value.map((clothes) => clothes.id),
      gender: gender.value!,
      imageUrl: uploadedCodyImageUrl.value!,
      title: title.value!
    }
  }))

  /* Action
  - Reset
  */
  const resetCelebId = () => {
    celebId.value = undefined
  }
  const resetCelebNameSearchKeyword = () => {
    celebNameSearchKeyword.value = undefined
  }
  const resetGender = () => {
    gender.value = 'MALE'
  }
  const resetTitle = () => {
    title.value = undefined
  }
  const resetCodyImage = () => {
    codyImageFile.value = undefined
    codyImagePreviewUrl.value = undefined
    uploadedCodyImageUrl.value = undefined
  }
  const resetCheckedClothesIdList = () => {
    checkedClothesList.value = []
  }
  const resetClothesNameSearchKeyword = () => {
    clothesNameSearchKeyword.value = undefined
  }
  const resetAllState = () => {
    resetCelebId()
    resetCelebNameSearchKeyword()
    resetGender()
    resetTitle()
    resetCodyImage()
    resetCheckedClothesIdList()
    resetClothesNameSearchKeyword()
  }
  /* Action
  - Validate
  */
  const validateCelebId = () => {
    if (!celebId.value) {
      showToastMessage('셀럽을 선택해 주세요.', 'Warning')
      return false
    }
    return true
  }
  const validateGender = () => {
    if (!gender.value) {
      showToastMessage('성별을 선택해 주세요.', 'Warning')
      return false
    }
    return true
  }
  const validateTitle = () => {
    if (!title.value) {
      showToastMessage('코디 제목을 입력해 주세요.', 'Warning')
      return false
    }
    return true
  }
  const validateCodyImage = () => {
    if (!codyImagePreviewUrl.value || !codyImageFile.value) {
      showToastMessage('코디 사진을 선택해 주세요.', 'Warning')
      return false
    }
    return true
  }
  const validateCheckedClothesList = () => {
    if (isEmptyArray(checkedClothesList.value)) {
      showToastMessage('의류나 악세사리를 선택해 주세요.', 'Warning')
      return false
    }
    return true
  }
  const validateAll = () => {
    if (
      validateCelebId() &&
      validateGender() &&
      validateTitle() &&
      validateCodyImage() &&
      validateCheckedClothesList()
    ) {
      return true
    }
    return false
  }

  return {
    celebId,
    celebNameSearchKeyword,
    gender,
    title,
    codyImageFile,
    codyImagePreviewUrl,
    uploadedCodyImageUrl,
    checkedClothesList,
    clothesNameSearchKeyword,
    payload,
    resetCelebId,
    resetAllState,
    validateCelebId,
    validateGender,
    validateTitle,
    validateCodyImage,
    validateCheckedClothesList,
    validateAll
  }
})

export default useCreatePostStore

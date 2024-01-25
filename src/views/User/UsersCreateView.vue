<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseRadioGroup, { type BaseRadioGroupRadio } from '@/components/Base/BaseRadioGroup.vue'
import ImageInput from '@/components/Common/ImageInput.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import useToastMessageStore from '@/composables/useToastMessageStore'
import { USER_VALIDATE_MESSAGE } from '@/constants/validate'
import { FirebaseStorageUploadError } from '@/error'
import useCreateUserMutation from '@/features/User/composables/useCreateUserMutation'
import useFetchLoggedInUserQuery from '@/features/User/composables/useFetchLoggedInUserQuery'
import useLoginUserMutation from '@/features/User/composables/useLoginUserMutation'
import useUserStore from '@/features/User/stores/useUserStore'
import uploadFile from '@/firebase/uploadFile'
import type { ApiErrorResponse } from '@/model/Api'
import type { GenderCode } from '@/model/Gender'
import type { CreateUserRequest } from '@/model/User'
import router from '@/router'
import { isValidEmail } from '@/utils/validate'
import axios from 'axios'
import { getDownloadURL } from 'firebase/storage'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

/* Constant */
const RADIOS: BaseRadioGroupRadio[] = [
  {
    label: '남성',
    value: 'MALE'
  },
  {
    label: '여성',
    value: 'FEMALE'
  }
]

/* Pinia */
const { showErrorAlertDialog } = useAlertDialogStore()
const { showAlertDialog } = useAlertDialogStore()
const { showToastMessage } = useToastMessageStore()
const { user } = storeToRefs(useUserStore())

/* Local State */
const isLoadingUploadProfileImage = ref(false)
const profileImageFile = ref<File>()
const profileImagePreviewUrl = ref<string>()
const uploadedProfileImageUrl = ref<string>()
const email = ref('')
const name = ref('')
const gender = ref<GenderCode>('MALE')
const password = ref('')
const confirmPassword = ref('')
const requestData = computed<CreateUserRequest>(() => ({
  payload: {
    email: email.value,
    name: name.value,
    password: password.value,
    gender: gender.value,
    userProfileImage: uploadedProfileImageUrl.value
  }
}))
const warningMessage = ref<string>()
const isLoading = computed(
  () =>
    isLoadingUploadProfileImage.value ||
    isLoadingCreateUser.value ||
    isLoadingLoginUser.value ||
    (isSuccessLoginUser.value && isLoadingFetchLoggedInUser.value)
)

/* Vue Query */
const {
  mutateAsync: createUserMutateAsync,
  isLoading: isLoadingCreateUser,
  isSuccess: isSuccessCreateUser
} = useCreateUserMutation((error) => {
  if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
    warningMessage.value = error.response.data.message
  }
})
const {
  mutateAsync: loginMutateAsync,
  isLoading: isLoadingLoginUser,
  isSuccess: isSuccessLoginUser
} = useLoginUserMutation((error) => {
  if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
    showErrorAlertDialog(error)
  }
})
const { data: loggedInUserData, isLoading: isLoadingFetchLoggedInUser } =
  useFetchLoggedInUserQuery(isSuccessLoginUser)

/* Helper Function */
const validate = () => {
  if (!isValidEmail(email.value)) {
    warningMessage.value = USER_VALIDATE_MESSAGE.IS_INVALID_EMAIL
    return false
  }

  if (!name.value) {
    warningMessage.value = USER_VALIDATE_MESSAGE.EMPTY_NAME
    return false
  }

  if (!password.value || !confirmPassword.value) {
    warningMessage.value = USER_VALIDATE_MESSAGE.EMPTY_PASSWORD
    return false
  }

  if (password.value !== confirmPassword.value) {
    warningMessage.value = USER_VALIDATE_MESSAGE.CONFIRM_PASSWORD_DIFFERENT
    return false
  }

  return true
}

/* Event Handler */
const handleClickCreateUserButton = async () => {
  if (!validate()) return

  try {
    if (profileImageFile.value) {
      isLoadingUploadProfileImage.value = true
      const uploadedFile = await uploadFile(profileImageFile.value!)
      uploadedProfileImageUrl.value = await getDownloadURL(uploadedFile.ref)
    }

    await createUserMutateAsync(requestData.value)

    if (isSuccessCreateUser.value) {
      const { email, password } = requestData.value.payload
      await loginMutateAsync({ email, password })
    }
  } catch (error) {
    if (error instanceof FirebaseStorageUploadError) {
      showAlertDialog('[이미지 업로드 에러] 관리자에게 문의해 주세요.')
    }
  } finally {
    isLoadingUploadProfileImage.value = false
  }
}

/* Watch */
/*
로그인 성공 이후, 로그인한 유저의 API를 가져오는데 성공했을 경우 로직
*/
watch(loggedInUserData, (loggedInUserData) => {
  if (!loggedInUserData) return

  // 유저 스토어에 로그인된 유저의 정보를 저장
  user.value = loggedInUserData.data

  router.push({ name: 'home' })
  showToastMessage('로그인 되었습니다.', 'Success')
})
</script>

<template>
  <ViewContainer class="users-create-view">
    <template #app-bar>
      <AppBar type="back" title="회원가입" />
    </template>

    <main class="users-create-view__main">
      <form class="users-create-view__form">
        <ImageInput
          v-model:file="profileImageFile"
          v-model:image-preview-url="profileImagePreviewUrl"
          class="users-create-view__profile-image-input"
        >
          <div class="users-create-view__image-upload-instruction">
            <BaseIcon name="person" opsz="70" wght="200" />
            <BaseIcon name="photo_camera" class="users-create-view__image-upload-camera-icon" />
          </div>
        </ImageInput>
        <BaseInput v-model="email" type="email" label="이메일" :focus="true" />
        <BaseInput v-model="name" label="이름" />
        <BaseRadioGroup v-model="gender" caption="성별" :radios="RADIOS" />
        <BaseInput v-model="password" label="비밀번호" type="password" />
        <BaseInput v-model="confirmPassword" label="비밀번호 확인" type="password" />

        <BaseButton
          @click.prevent="handleClickCreateUserButton"
          :is-loading="isLoading"
          class="users-create-view__login-button"
        >
          가입하기
        </BaseButton>

        <TextBody2 v-if="warningMessage" class="users-create-view__warning-message">
          {{ warningMessage }}
        </TextBody2>
      </form>

      <TextBody2 class="users-create-view__login-message">
        계정이 있으신가요?
        <RouterLink :to="{ name: 'login' }" class="users-create-view__login-link">
          로그인
        </RouterLink>
      </TextBody2>
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.users-create-view {
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 200px;
  }

  &__profile-image-input {
    width: 120px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  &__image-upload-instruction {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--gray-100));
    border-radius: inherit;
  }

  &__image-upload-camera-icon {
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    aspect-ratio: 1;
    color: rgba(var(--white));
    background-color: rgba(var(--blue));
    border-radius: 50%;
  }

  &__login-button {
    width: 100%;
    margin-top: 20px;
  }

  &__warning-message {
    color: rgba(var(--red));
    width: fit-content;
  }

  &__login-message {
    margin-top: 30px;
  }

  &__login-link {
    margin-left: 2px;
    color: rgba(var(--blue-600));
    font-weight: 500;
  }
}
</style>

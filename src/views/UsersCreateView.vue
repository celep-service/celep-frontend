<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseRadioGroup, { type BaseRadioGroupRadio } from '@/components/Base/BaseRadioGroup.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useAlertDialogStore from '@/composables/useAlertDialogStore'
import { VALIDATE_MESSAGE } from '@/constants/validate'
import useCreateUserMutation from '@/features/User/composables/useCreateUserMutation'
import useLoginUserMutation from '@/features/User/composables/useLoginUserMutation'
import type { ApiErrorResponse } from '@/model/Api'
import type { GenderCode } from '@/model/Gender'
import type { CreateUserRequest } from '@/model/User'
import { isValidEmail } from '@/utils/validate'
import axios from 'axios'
import { computed, ref } from 'vue'

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

/* Local State */
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
    gender: gender.value
  }
}))
const warningMessage = ref<string>()

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
const { mutateAsync: loginMutateAsync } = useLoginUserMutation((error) => {
  if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
    showErrorAlertDialog(error)
  }
})

/* Helper Function */
const validate = () => {
  if (!isValidEmail(email.value)) {
    warningMessage.value = VALIDATE_MESSAGE.IS_INVALID_EMAIL
    return false
  }

  if (!name.value) {
    warningMessage.value = VALIDATE_MESSAGE.EMPTY_NAME
    return false
  }

  if (!password.value || !confirmPassword.value) {
    warningMessage.value = VALIDATE_MESSAGE.EMPTY_PASSWORD
    return false
  }

  if (password.value !== confirmPassword.value) {
    warningMessage.value = VALIDATE_MESSAGE.CONFIRM_PASSWORD_DIFFERENT
    return false
  }

  return true
}

/* Event Handler */
const handleClickCreateUserButton = async () => {
  const _requestData = requestData.value

  if (!validate()) return

  await createUserMutateAsync(_requestData)

  if (isSuccessCreateUser.value) {
    const { email, password } = _requestData.payload
    loginMutateAsync({ email, password })
  }
}
</script>

<template>
  <ViewContainer class="users-create-view">
    <template #app-bar>
      <AppBar type="back" title="회원가입" />
    </template>

    <main class="users-create-view__main">
      <form class="users-create-view__form">
        <BaseInput v-model="email" type="email" label="이메일" :focus="true" />
        <BaseInput v-model="name" label="이름" />
        <BaseRadioGroup v-model="gender" caption="성별" :radios="RADIOS" />
        <BaseInput v-model="password" label="비밀번호" type="password" />
        <BaseInput v-model="confirmPassword" label="비밀번호 확인" type="password" />

        <BaseButton
          @click.prevent="handleClickCreateUserButton"
          :is-loading="isLoadingCreateUser"
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

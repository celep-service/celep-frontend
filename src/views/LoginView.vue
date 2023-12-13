<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import TextHero from '@/components/Text/TextHero.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useLoginUserMutation from '@/features/User/composables/useLoginUserMutation'
import type { ApiErrorResponse } from '@/model/Api'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

/* Router */
const router = useRouter()

/* Local State */
const email = ref('')
const password = ref('')
const requestData = computed(() => ({
  email: email.value,
  password: password.value
}))
const warningMessage = ref<string>()

/* Vue Query */
const { mutate, isLoading } = useLoginUserMutation((error) => {
  if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
    warningMessage.value = error.response.data.message
  }
})

/* Helper Function */
const validate = () => {
  const emailPatternRegex = /^.+@.+\..+$/
  if (!emailPatternRegex.test(email.value)) {
    warningMessage.value = '이메일을 형식에 맞게 입력해 주세요.'
    return false
  }

  if (!password.value) {
    warningMessage.value = '비밀번호를 입력해 주세요.'
    return false
  }

  return true
}

/* Event Handler */
const handleClickGuestLink = () => {
  router.push({ name: 'home' })
}
const handleClickLoginButton = () => {
  if (validate()) {
    mutate(requestData.value)
  }
}
</script>

<template>
  <ViewContainer class="login-view">
    <main class="login-view__main">
      <TextHero weight="650" class="login-view__logo">celep</TextHero>

      <form class="login-view__form">
        <BaseInput v-model="email" label="이메일" :focus="true" />
        <BaseInput v-model="password" label="비밀번호" type="password" />
        <TextBody2 @click="handleClickGuestLink" weight="500" class="login-view__guest-link">
          게스트로 이용하기
        </TextBody2>
        <BaseButton
          @click.prevent="handleClickLoginButton"
          :is-loading="isLoading"
          class="login-view__login-button"
        >
          로그인
        </BaseButton>

        <TextBody2 v-if="warningMessage" class="login-view__warning-message">
          {{ warningMessage }}
        </TextBody2>
      </form>

      <TextBody2 class="login-view__user-create-message">
        계정이 없으신가요?
        <RouterLink :to="{ name: 'users/create' }" class="login-view__user-create-link">
          가입하기
        </RouterLink>
      </TextBody2>
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.login-view {
  padding-top: 0;

  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__logo {
    margin-bottom: 40px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 200px;
  }

  &__guest-link {
    margin-left: auto;
    color: rgba(var(--blue-400));
    cursor: pointer;
  }

  &__login-button {
    width: 100%;
    margin-top: 20px;
  }

  &__warning-message {
    color: rgba(var(--red));
    width: fit-content;
  }

  &__user-create-message {
    margin-top: 30px;
  }

  &__user-create-link {
    margin-left: 2px;
    color: rgba(var(--blue-600));
    font-weight: 500;
  }
}
</style>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseRadioGroup, { type BaseRadioGroupRadio } from '@/components/Base/BaseRadioGroup.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import type { Gender, GenderCode } from '@/model/Gender'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

/* Constant */
const GENDER_RADIOS: BaseRadioGroupRadio<Gender, GenderCode>[] = [
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' }
]

/* Router */
const router = useRouter()

/* Pinia */
const { gender } = storeToRefs(useCreatePostStore())
const { resetAllState, validateGender } = useCreatePostStore()

/* Event Handler */
const handleClickGoToPreviousButton = () => {
  router.push({ name: 'posts/create/celeb' })
}
const handleClickInputCompleteButton = () => {
  if (validateGender()) {
    router.push({ name: 'posts/create/title' })
  }
}
</script>

<template>
  <ViewContainer class="posts-create-gender-view">
    <template #app-bar>
      <AppBar type="close" title="성별" :on-close="resetAllState" />
    </template>

    <main class="posts-create-gender-view__main">
      <TextHeading3 weight="550" class="posts-create-gender-view__title">
        코디에 맞는 성별을
        <br />
        선택해 주세요
      </TextHeading3>

      <BaseRadioGroup
        v-model="gender"
        caption="성별"
        :radios="GENDER_RADIOS"
        class="posts-create-gender-view__radio-group"
      />

      <div class="posts-create-gender-view__buttons-wrapper">
        <BaseButton
          @click="handleClickGoToPreviousButton"
          type="outlined"
          textColor="var(--gray-400)"
          class="posts-create-gender-view__button"
        >
          이전으로
        </BaseButton>
        <BaseButton
          @click="handleClickInputCompleteButton"
          class="posts-create-gender-view__button"
        >
          다음으로
        </BaseButton>
      </div>
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-gender-view {
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

  &__radio-group {
    width: 200px;
    margin-top: 50px;
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

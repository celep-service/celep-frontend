<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

/* Router */
const router = useRouter()

/* Pinia */
const { title } = storeToRefs(useCreatePostStore())
const { resetAllState, validateTitle } = useCreatePostStore()

/* Event Handler */
const handleClickGoToPreviousButton = () => {
  router.push({ name: 'posts/create/gender' })
}
const handleClickInputCompleteButton = () => {
  if (validateTitle()) {
    router.push({ name: 'posts/create/cody-image' })
  }
}
</script>

<template>
  <ViewContainer class="posts-create-title-view">
    <template #app-bar>
      <AppBar type="close" title="코디 제목" :on-close="resetAllState" />
    </template>

    <main class="posts-create-title-view__main">
      <TextHeading3 weight="550" class="posts-create-title-view__title">
        코디 제목을 입력해 주세요
      </TextHeading3>

      <BaseInput
        v-model="title"
        label="코디 제목"
        :focus="true"
        class="posts-create-title-view__input"
      />

      <div class="posts-create-title-view__buttons-wrapper">
        <BaseButton
          @click="handleClickGoToPreviousButton"
          type="outlined"
          textColor="var(--gray-400)"
          class="posts-create-title-view__button"
        >
          이전으로
        </BaseButton>
        <BaseButton @click="handleClickInputCompleteButton" class="posts-create-title-view__button">
          다음으로
        </BaseButton>
      </div>
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-title-view {
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

  &__input {
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

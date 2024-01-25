<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import CelebProfileCardsContainer from '@/features/Celeb/components/CelebSelectProfileCardsContainer.vue'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import { useRouter } from 'vue-router'

/* Router */
const router = useRouter()

/* Pinia */
const { resetAllState, validateCelebId } = useCreatePostStore()

/* Event Handler */
const handleClickSelectCompleteButton = () => {
  if (validateCelebId()) {
    router.push({ name: 'posts/create/gender' })
  }
}
</script>

<template>
  <ViewContainer class="posts-create-celeb-view">
    <template #app-bar>
      <AppBar type="close" title="셀럽 선택" :onClose="resetAllState" />
    </template>

    <main class="posts-create-celeb-view__main">
      <TextHeading3 weight="550" class="posts-create-celeb-view__title">
        코디에 맞는 셀럽을
        <br />
        선택해 주세요
      </TextHeading3>

      <CelebProfileCardsContainer />

      <BaseButton
        @click="handleClickSelectCompleteButton"
        class="posts-create-celeb-view__select-complete-button"
      >
        선택완료
      </BaseButton>
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-create-celeb-view {
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

  &__select-complete-button {
    width: 40vw;
    max-width: 130px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: 20px;
  }
}
</style>

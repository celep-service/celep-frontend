<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import useToastMessageStore from '@/composables/useToastMessageStore'
import ClothesSelectListContainer from '@/features/Clothes/components/ClothesSelectListContainer.vue'
import useCreatePostStore from '@/features/Post/stores/useCreatePostStore'
import { isEmptyArray } from '@/utils/array'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

/* Router */
const router = useRouter()

/* Pinia */
const { checkedClothesList } = storeToRefs(useCreatePostStore())
const { resetAllState } = useCreatePostStore()
const { showToastMessage } = useToastMessageStore()

/* Helper Function */
const validate = () => {
  if (isEmptyArray(checkedClothesList.value)) {
    showToastMessage('의류나 악세사리를 선택해 주세요.', 'Warning')
    return false
  }

  return true
}

/* Event Handler */
const handleClickGoToPreviousButton = () => {
  router.push({ name: 'posts/create/cody-image' })
}
const handleClickInputCompleteButton = () => {
  if (validate()) {
    // TODO: payload validate, Firebase Storage Image Upload, CreatePostMutate 로직 추가
    return
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

<script setup lang="ts">
import BaseInput from '@/components/Base/BaseInput.vue'
import IconButton from '@/components/Common/IconButton.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import PostListContainer from '@/features/Post/components/PostListContainer.vue'
import type { PostsRequest } from '@/model/Post'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

/* Local State */
const search = ref<string>()
const requestData = computed<PostsRequest>(() => ({
  queryParams: {
    search: search.value
  }
}))

/* Router */
const router = useRouter()

/* Helper Function */
const goToHomeView = () => {
  router.push({ name: 'home' })
}

const goToPreviousView = () => {
  const previousUrl = router.options.history.state.back
  if (previousUrl?.toString().startsWith('/splash')) {
    goToHomeView()
    return
  }

  router.back()
}

/* Event Handler */
const handleClickBackButton = () => {
  goToPreviousView()
}
</script>

<template>
  <ViewContainer class="posts-search-view">
    <template #app-bar>
      <div class="posts-search-view__app-bar">
        <IconButton
          @click="handleClickBackButton"
          :icon-option="{
            name: 'arrow_back_ios_new',
            wght: '500',
            opsz: '20'
          }"
          class="posts-search-view__back-button"
        />

        <BaseInput
          v-model="search"
          label="코디명 검색"
          :focus="true"
          :debounce="true"
          class="posts-search-view__search-input"
        />
      </div>
    </template>

    <main class="posts-search-view__main">
      <PostListContainer :posts-request-data="requestData" />
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.posts-search-view {
  &__main {
    display: flex;
    flex-direction: column;
  }

  &__app-bar {
    z-index: 1000;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--app-bar-height);
    background-color: rgba(var(--white));
    border-bottom: solid 1px rgba(var(--gray-200));
  }

  &__search-input{
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>

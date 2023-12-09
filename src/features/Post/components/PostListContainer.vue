<script setup lang="ts">
import AppSpinner from '@/components/Common/AppSpinner.vue'
import ObserverTrigger from '@/components/ObserverTrigger.vue'
import PostList from '@/features/Post/components/PostList.vue'
import PostListFilter from '@/features/Post/components/PostListFilter.vue'
import PostListSkeleton from '@/features/Post/components/PostListSkeleton.vue'
import useFetchPostsInfiniteQuery from '@/features/Post/composables/useFetchPostsInfiniteQuery'
import type { CelebCategoryCode } from '@/model/Celeb'
import type { GenderCode } from '@/model/Gender'
import type { PostsRequest } from '@/model/Post'
import { computed, ref } from 'vue'

/* Prop */
interface Props {
  postsRequest?: PostsRequest
}
const props = withDefaults(defineProps<Props>(), {})

/* Local State */
const gender = ref<GenderCode>('MALE')
const celebCategory = ref<CelebCategoryCode>()
const requestData = computed<PostsRequest>(() => ({
  queryParams: {
    ...props.postsRequest?.queryParams,
    gender: gender.value,
    celebCategory: celebCategory.value
  }
}))
const hasContent = computed(() => data.value?.pages[0].data.content.length !== 0)

/* Vue Query */
const { data, fetchNextPage, isFetchingNextPage } = useFetchPostsInfiniteQuery(requestData)
</script>

<template>
  <div class="post-list-container">
    <PostListFilter v-model:gender="gender" v-model:celebCategory="celebCategory" />

    <template v-if="data">
      <template v-if="hasContent">
        <PostList
          v-for="page in data.pages"
          :key="page.data.pageable.pageNumber"
          :posts="page.data.content"
        />

        <ObserverTrigger @triggerIntersected="fetchNextPage" />

        <div v-if="isFetchingNextPage" class="post-list-container__spinner-wrapper">
          <AppSpinner />
        </div>
      </template>

      <div v-else class="post-list-container__empty-message">코디가 존재하지 않습니다.</div>
    </template>

    <PostListSkeleton v-else />
  </div>
</template>

<style scoped lang="scss">
.post-list-container {
  display: flex;
  flex-direction: column;

  &__spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }

  &__empty-message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
  }
}
</style>

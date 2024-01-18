<script setup lang="ts">
import BaseIcon from '@/components/Base/BaseIcon.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import PostListItemSwiper from '@/features/Post/components/PostListItemSwiper.vue'
import type { PostTemplate } from '@/model/Post'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

/* Prop */
interface Props {
  post: PostTemplate
}
const props = withDefaults(defineProps<Props>(), {})

/* Router */
const route = useRoute()
const queryParamPostId = Number(route.query.postId)

/* Local State */
const postListItemRef = ref<HTMLDivElement>()

/* Hook */
onMounted(() => {
  if (props.post.id !== queryParamPostId) return

  postListItemRef.value!.scrollIntoView()
})
</script>

<template>
  <div ref="postListItemRef" class="post-list-item">
    <div class="post-list-item__user-info-wrapper">
      <div class="post-list-item__user-avatar">
        <BaseIcon name="person" opsz="18" fill="1" class="post-list-item__user-avatar-icon" />
      </div>
      <TextBody2 weight="500">{{ post.userDto.name }}</TextBody2>
    </div>

    <PostListItemSwiper
      :post-id="post.id"
      :is-post-bookmarked="post.isBookmarked"
      :post-bookmark-count="post.bookmarkCount"
      :post-title="post.title"
      :post-image-url="post.imageUrl"
      :celeb-name="post.celeb.name"
      :clothesList="post.codiesDtoList.map((codiesDto) => codiesDto.clothesDto)"
    />
    <!-- TODO: 댓글 기능 추가 
      <div class="post-list-item__comment-info-wrapper">
        <BaseIcon name="comment" opsz="14" wght="600" class="post-list-item__comment-icon" />
        <TextBody1 weight="500">댓글 {{ post.commentCount }}</TextBody1>
      </div>
    -->
  </div>
</template>

<style scoped lang="scss">
.post-list-item {
  display: flex;
  flex-direction: column;

  &__user-info-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
    padding: 12px;
  }

  &__user-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    width: 24px;
    border-radius: 50%;
    background-color: rgba(var(--gray-300));
  }

  &__user-avatar-icon {
    color: rgba(var(--white));
  }

  &__comment-info-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
    padding: 12px;
  }
}
</style>

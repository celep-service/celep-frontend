<script setup lang="ts">
import BaseIcon from '@/components/Base/BaseIcon.vue'
import TextBody1 from '@/components/Text/TextBody1.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import PostListItemSwiper from '@/features/Post/components/PostListItemSwiper.vue'
import type { PostTemplate } from '@/model/Post'

/* Prop */
interface Props {
  post: PostTemplate
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="post-list-item">
    <div class="post-list-item__user-info-wrapper">
      <div class="post-list-item__user-avatar">
        <BaseIcon name="person" opsz="18" fill="1" class="post-list-item__user-avatar-icon" />
      </div>
      <TextBody2 weight="500">{{ post.userDto.name }}</TextBody2>
    </div>

    <PostListItemSwiper
      :post-title="post.title"
      :post-image-url="post.imageUrl"
      :celeb-name="post.celeb.name"
      :clothesList="post.codiesDtoList.map(({ clothes }) => clothes)"
    />

    <div class="post-list-item__comment-info-wrapper">
      <BaseIcon name="comment" opsz="14" wght="600" class="post-list-item__comment-icon" />
      <TextBody1 weight="500">댓글 {{ post.commentCount }}</TextBody1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-list-item {
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px rgba(var(--gray-100));

  &:nth-last-child(1) {
    border-bottom: none;
  }

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

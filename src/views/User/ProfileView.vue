<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import TextBody1 from '@/components/Text/TextBody1.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import TextCaption from '@/components/Text/TextCaption.vue'
import ViewContainer from '@/components/ViewContainer.vue'
import MyPostsGridContainer from '@/features/Post/components/MyPostsGridContainer.vue'
import UserAvatar from '@/features/User/components/UserAvatar.vue'
import useUserStore from '@/features/User/stores/useUserStore'
import { GENDER_MAP } from '@/model/Gender'
import { storeToRefs } from 'pinia'

/* Pinia */
const { user } = storeToRefs(useUserStore())
</script>

<template>
  <ViewContainer class="profile-view">
    <template #app-bar>
      <AppBar />
    </template>

    <main class="profile-view__main">
      <div class="profile-view__user-info-container">
        <UserAvatar
          :image-url="user!.userProfileImage"
          icon-size="30"
          class="profile-view__user-avatar"
        />
        <div class="profile-view__user-text-info">
          <TextBody2 weight="550">{{ user!.name }}</TextBody2>
          <TextCaption class="profile-view__user-gender">
            {{ GENDER_MAP.get(user!.gender) }}
          </TextCaption>
        </div>
      </div>

      <TextBody1 weight="650" class="profile-view__title">내가 추가한 코디</TextBody1>

      <MyPostsGridContainer />
    </main>
  </ViewContainer>
</template>

<style scoped lang="scss">
.profile-view {
  &__main {
    display: flex;
    flex-direction: column;
  }

  &__user-info-container {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    padding: 20px;
    border-bottom: solid 1px rgba(var(--gray-300));
  }

  &__user-avatar {
    width: 60px;
  }

  &__user-text-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  }

  &__user-gender {
    color: rgba(var(--gray));
  }

  &__title{
    padding: 20px 14px;
  }
}
</style>

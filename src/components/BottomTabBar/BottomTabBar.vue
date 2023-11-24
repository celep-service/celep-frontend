<script setup lang="ts">
import BottomTabBarNavigation, {
  type BottomTabBarNavigationProps
} from '@/components/BottomTabBar/BottomTabBarNavigation.vue'

/* Constant */
const NAVIGATIONS: BottomTabBarNavigationProps[] = [
  {
    iconName: 'home',
    routeName: 'home',
    text: '홈'
  },
  {
    iconName: 'search',
    routeName: 'posts/search',
    text: '검색'
  },
  {
    iconName: 'add_box',
    routeName: 'posts/create',
    text: '코디 추가'
  },
  {
    iconName: 'bookmark',
    routeName: 'bookmarks',
    text: '북마크'
  },
  {
    iconName: 'person',
    routeName: 'profile',
    text: '마이'
  }
]
</script>

<template>
  <div class="bottom-tab-bar">
    <BottomTabBarNavigation
      v-for="{ iconName, text, routeName } in NAVIGATIONS"
      :key="routeName"
      :icon-name="iconName"
      :text="text"
      :route-name="routeName"
    />
  </div>
</template>

<style scoped lang="scss">
.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: var(--bottom-tab-bar-height);
  padding-inline: 20px;
  background-color: rgba(var(--white));
  border-top: solid 1px rgba(var(--gray-300));
}
</style>

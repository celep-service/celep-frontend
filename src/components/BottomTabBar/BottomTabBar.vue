<script setup lang="ts">
import BottomTabBarNavigation, {
  type BottomTabBarNavigationProps
} from '@/components/BottomTabBar/BottomTabBarNavigation.vue'

/* Constant */
const NAVIGATIONS: BottomTabBarNavigationProps[] = [
  {
    iconName: 'home',
    routeName: 'home',
  },
  {
    iconName: 'search',
    routeName: 'posts/search',
  },
  {
    iconName: 'add_box',
    routeName: 'posts/create/celeb',
  },
  {
    iconName: 'bookmark',
    routeName: 'bookmarks',
  },
  {
    iconName: 'person',
    routeName: 'profile',
  }
]
</script>

<template>
  <div class="bottom-tab-bar">
    <BottomTabBarNavigation
      v-for="{ iconName, routeName } in NAVIGATIONS"
      :key="routeName"
      :icon-name="iconName"
      :route-name="routeName"
    />
  </div>
</template>

<style scoped lang="scss">
.bottom-tab-bar {
  z-index: 1000;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: var(--bottom-tab-bar-height);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: rgba(var(--white));
  border-top: solid 1px rgba(var(--gray-300));
}
</style>

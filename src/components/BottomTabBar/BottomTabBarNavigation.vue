<script lang="ts">
export interface BottomTabBarNavigationProps {
  iconName: string
  routeName: string
}
</script>

<script setup lang="ts">
import BaseIcon from '@/components/Base/BaseIcon.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Prop */
const props = withDefaults(defineProps<BottomTabBarNavigationProps>(), {})

/* Router */
const router = useRouter()
const route = useRoute()

/* Local State */
const isCurrentRoute = computed(() => route.name === props.routeName)
const iconBottom = computed(() => (props.iconName === 'home' ? '1px' : '0'))

/* Event Handler */
const handleClickNavigation = () => {
  if (route.name === 'home' && props.routeName === 'home') {
    document.querySelector('.view-container__main-wrapper')!.scrollTo(0, 0)
    return
  }

  router.push({
    name: props.routeName
  })
}
</script>

<template>
  <div @click="handleClickNavigation" class="bottom-tab-bar-navigation">
    <BaseIcon
      :name="iconName"
      opsz="26"
      wght="250"
      :fill="Number(isCurrentRoute)"
      class="bottom-tab-bar-navigation__icon"
    />
  </div>
</template>

<style lang="scss">
.bottom-tab-bar-navigation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;
}

.bottom-tab-bar-navigation__icon {
  position: relative;
  bottom: v-bind(iconBottom);
}
</style>

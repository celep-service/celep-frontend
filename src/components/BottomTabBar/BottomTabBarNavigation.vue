<script lang="ts">
export interface BottomTabBarNavigationProps {
  iconName: string
  text: string
  routeName: string
}
</script>

<script setup lang="ts">
import BaseIcon from '@/components/Base/BaseIcon.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Prop */
const props = withDefaults(defineProps<BottomTabBarNavigationProps>(), {})

/* Router */
const router = useRouter()
const route = useRoute()

/* Local State */
const isCurrentRoute = computed(() => route.name === props.routeName)

/* Event Handler */
const handleClickNavigation = () => {
  router.push({
    name: props.routeName
  })
}
</script>

<template>
  <div @click="handleClickNavigation" class="bottom-tab-bar-navigation">
    <BaseIcon :name="iconName" opsz="26" wght="250" :fill="Number(isCurrentRoute)" />
    <TextBody2 weight="500">{{ text }}</TextBody2>
  </div>
</template>

<style scoped lang="scss">
.bottom-tab-bar-navigation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding-inline: 10px;
}
</style>

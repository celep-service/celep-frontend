<script setup lang="ts">
import TextHero from '@/components/Text/TextHero.vue'
import { ACCESS_TOKEN_KEY } from '@/constants/jwt'
import useFetchLoggedInUserQuery from '@/features/User/composables/useFetchLoggedInUserQuery'
import useUserStore from '@/features/User/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

/* Router */
const router = useRouter()
const route = useRoute()
const redirectRoute = route.query.redirectRoute

/* Pinia */
const { user } = storeToRefs(useUserStore())

/* Vue Query */
const { data: loggedInUserData } = useFetchLoggedInUserQuery(!!accessToken)

/* Helper Function */
const redirectToRoute = () => {
  if (typeof redirectRoute !== 'string') return

  setTimeout(() => {
    router.push({ name: redirectRoute })
  }, 1500)
}

/* Hook */
onMounted(() => {
  if (accessToken) return

  redirectToRoute()
})

/* Watch */
watch(loggedInUserData, (loggedInUserData) => {
  if (!loggedInUserData) return

  user.value = loggedInUserData.data

  redirectToRoute()
})
</script>

<template>
  <main class="splash-view">
    <TextHero weight="650">celep</TextHero>
  </main>
</template>

<style scoped lang="scss">
.splash-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
}
</style>

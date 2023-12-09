<script setup lang="ts">
import IconButton from '@/components/Common/IconButton.vue'
import TextHeading2 from '@/components/Text/TextHeading2.vue'
import TextHeading3 from '@/components/Text/TextHeading3.vue'
import useConfirmDialogStore from '@/stores/useConfirmDialogStore'
import { useRouter } from 'vue-router'

/* Prop */
interface Props {
  type?: 'logo' | 'back' | 'close'
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'logo'
})

/* Router */
const router = useRouter()

/* Pinia */
const { showConfirmDialog } = useConfirmDialogStore()

/* Helper Function */
const goToHomeView = () => {
  router.push({ name: 'home' })
}

const goToPreviousView = () => {
  router.back()
}

/* Event Handler */
const handleClickLogo = () => {
  goToHomeView()
}

const handleClickBackButton = () => {
  goToPreviousView()
}

const handleClickCloseButton = () => {
  showConfirmDialog('정말 닫으시겠습니까?', goToPreviousView)
}
</script>

<template>
  <header class="app-bar">
    <TextHeading2
      v-if="props.type === 'logo'"
      @click="handleClickLogo"
      weight="650"
      class="app-bar__logo"
    >
      celep
    </TextHeading2>

    <IconButton
      v-if="props.type === 'back'"
      @click="handleClickBackButton"
      name="arrow_back_ios_new"
      wght="500"
      opsz="20"
      class="app-bar__back-button"
    />

    <TextHeading3 v-if="props.title && props.type !== 'logo'" weight="600" class="app-bar__title">
      {{ props.title }}
    </TextHeading3>

    <IconButton
      v-if="props.type === 'close'"
      @click="handleClickCloseButton"
      name="close"
      wght="500"
      opsz="24"
      class="app-bar__close-button"
    />
  </header>
</template>

<style scoped lang="scss">
.app-bar {
  z-index: 1000;
  position: relative;
  display: flex;
  align-items: center;
  flex-basis: 60px;
  background-color: rgba(var(--white));
  border-bottom: solid 1px rgba(var(--gray-200));

  &__logo {
    padding: 8px 12px;
    letter-spacing: -0.02em;
  }

  &__back-button {
    position: absolute;
    left: 4px;
  }

  &__title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  &__close-button {
    position: absolute;
    right: 4px;
  }
}
</style>

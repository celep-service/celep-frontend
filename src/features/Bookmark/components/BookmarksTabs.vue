<script setup lang="ts">
import TextBody2 from '@/components/Text/TextBody2.vue'
import type { BookmarkType } from '@/model/Bookmark'
import { computed } from 'vue'

/* Constant */
interface BookmarksTab {
  type: BookmarkType
  text: string
}
const BOOKMARKS_TABS: ReadonlyArray<BookmarksTab> = [
  { type: 'post', text: '북마크한 코디' },
  { type: 'clothes', text: '북마크한 옷/악세사리' }
]

/* Prop */
interface Props {
  modelValue?: BookmarkType
}
const props = withDefaults(defineProps<Props>(), {})

/* Emits */
interface Emits {
  (e: 'update:modelValue', value?: BookmarkType): void
}
const emits = defineEmits<Emits>()

/* Local State */
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>

<template>
  <div class="bookmarks-tabs">
    <label
      v-for="tab in BOOKMARKS_TABS"
      :key="tab.type"
      class="bookmarks-tabs__tab"
      :class="{ 'bookmarks-tabs__tab--active': modelValue === tab.type }"
    >
      <TextBody2 weight="550">{{ tab.text }}</TextBody2>
      <input
        v-model="modelValue"
        type="radio"
        name="bookmarks-tabs"
        :value="tab.type"
        class="bookmarks-tabs__radio"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
.bookmarks-tabs {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  &__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 60px;
    color: rgba(var(--gray-300));
    border-bottom: solid 2px rgba(var(--gray-300));
  }

  &__tab--active {
    color: rgba(var(--black));
    border-bottom-color: rgba(var(--black));
  }

  &__radio {
    display: none;
  }
}
</style>

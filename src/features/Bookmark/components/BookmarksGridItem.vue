<script setup lang="ts">
import IconButton from '@/components/Common/IconButton.vue'
import useToggleBookmarkMutation from '@/features/Bookmark/composables/useToggleBookmarkMutation'
import type { BookmarkTemplate, BookmarkType } from '@/model/Bookmark'
import useConfirmDialogStore from '@/stores/useConfirmDialogStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

/* Prop */
interface Props {
  bookmark: BookmarkTemplate
  bookmarkType: BookmarkType
  page: number
}
const props = withDefaults(defineProps<Props>(), {})

/* Router */
const router = useRouter()

/* Pinia */
const { showConfirmDialog } = useConfirmDialogStore()

/* Local State */
const backgroundImageUrlString = computed(() => `url(${props.bookmark.imageUrl})`)

/* Vue Query */
const { mutate: toggleBookmarkMutate, isLoading: isLoadingToggleBookmark } =
  useToggleBookmarkMutation()

/* Event Handler */
const handleClickItem = () => {
  if (props.bookmarkType !== 'post') return

  router.push({ name: 'bookmarks/posts', query: { postId: props.bookmark.id } })
}
const handleClickBookmarkButton = () => {
  showConfirmDialog('북마크에서 삭제하시겠습니까?', () =>
    toggleBookmarkMutate({ routeParams: { id: props.bookmark.id, type: props.bookmarkType } })
  )
}
</script>

<template>
  <div
    @click="handleClickItem"
    class="bookmarks-grid-item"
    :style="{ backgroundImage: backgroundImageUrlString }"
  >
    <IconButton
      @click.stop="handleClickBookmarkButton()"
      :icon-option="{ name: 'bookmark', opsz: 20, fill: 1 }"
      :button-option="{
        type: 'filled',
        backgroundColor: 'transparent',
        textColor: 'var(--yellow-300)',
        isLoading: isLoadingToggleBookmark
      }"
      class="bookmarks-grid-item__bookmark-button"
    />
  </div>
</template>

<style scoped lang="scss">
.bookmarks-grid-item {
  position: relative;
  aspect-ratio: 1;
  background-color: rgba(var(--gray-100));
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &__bookmark-button {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 4px;
    padding-bottom: 8px;
  }
}
</style>

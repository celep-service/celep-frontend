<script setup lang="ts">
import useToggleBookmarkMutation from '@/features/Bookmark/composables/useToggleBookmarkMutation'
import type { BookmarkType } from '@/model/Bookmark'
import type { ClothesTemplate } from '@/model/Clothes'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'
import BaseChip from '../../../components/Base/BaseChip.vue'
import IconButton from '../../../components/Common/IconButton.vue'
import TextBody2 from '../../../components/Text/TextBody2.vue'

/* Prop */
interface Props {
  postId: number
  isPostBookmarked?: boolean
  postBookmarkCount: number
  postTitle: string
  postImageUrl: string
  celebName: string
  clothesList: ClothesTemplate[]
}
const props = withDefaults(defineProps<Props>(), {})

/* Local State */
interface DataTemplate {
  type: BookmarkType
  id: number
  isBookmarked?: boolean
  bookmarkCount: number
  title: string
  imageUrl: string
  chipText: string
  sellUrl?: string
}
const postData = computed<DataTemplate>(() => ({
  type: 'post',
  id: props.postId,
  title: props.postTitle,
  isBookmarked: props.isPostBookmarked,
  bookmarkCount: props.postBookmarkCount,
  imageUrl: props.postImageUrl,
  chipText: props.celebName
}))
const clothesListData = computed<DataTemplate[]>(() =>
  props.clothesList.map((clothes) => ({
    type: 'clothes',
    id: clothes.id,
    isBookmarked: clothes.isBookmarked,
    bookmarkCount: clothes.bookmarkCount!,
    title: clothes.name,
    imageUrl: clothes.imageUrl,
    chipText: clothes.brand,
    sellUrl: clothes.sellUrl
  }))
)
const data = computed(() => [postData.value, ...clothesListData.value])

/* Vue Query */
const { mutate: toggleBookmarkMutate, isLoading: isLoadingToggleBookmark } =
  useToggleBookmarkMutation()

/* Helper Function */
const convertBackgroundImageUrlString = (url: string) => {
  return `url(${url})`
}

/* Event Handler */
const handleClickBookmarkButton = (id: number, type: BookmarkType) => {
  toggleBookmarkMutate({ routeParams: { id, type } })
}
</script>

<template>
  <Swiper :pagination="true" :modules="[Pagination]" class="post-list-item-swiper">
    <SwiperSlide v-for="item in data" :key="item.id">
      <div class="post-list-item-swiper__content-wrapper">
        <div
          :style="{ backgroundImage: convertBackgroundImageUrlString(item.imageUrl) }"
          class="post-list-item-swiper__cody-image"
        >
          <a v-if="item.sellUrl" :href="item.sellUrl" target="_blank">
            <IconButton
              :iconOption="{
                name: 'shopping_bag'
              }"
              :buttonOption="{
                type: 'filled',
                backgroundColor: 'var(--black) / 0.8',
                textColor: 'var(--white)'
              }"
              class="post-list-item-swiper__sell-button"
            />
          </a>
        </div>

        <div class="post-list-item-swiper__info-wrapper">
          <div class="post-list-item-swiper__full-name">
            <div class="post-list-item-swiper__bookmark-wrapper">
              <IconButton
                @click="handleClickBookmarkButton(item.id, item.type)"
                :icon-option="{
                  name: 'bookmark',
                  opsz: '24',
                  wght: '220',
                  fill: item.isBookmarked!
                }"
                :button-option="{
                  isLoading: isLoadingToggleBookmark
                }"
                class="post-list-item-swiper__bookmark-button"
                :class="{ 'post-list-item-swiper__bookmark-button--bookmarked': item.isBookmarked }"
              />
              <TextBody2>{{ item.bookmarkCount }}</TextBody2>
            </div>
            <BaseChip
              :type="item.type === 'post' ? 'filled' : 'outlined'"
              backgroundColor="var(--indigo-100)"
              :textColor="item.type === 'post' ? 'var(--indigo-700)' : 'var(--gray-600)'"
              borderColor="var(--gray-400)"
              :text="item.chipText"
              class="post-list-item-swiper__chip"
            />
            <TextBody2 weight="500" class="post-list-item-swiper__name">{{ item.title }}</TextBody2>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss">
.post-list-item-swiper {
  .swiper-wrapper {
    align-items: flex-end;
  }
}
</style>

<style scoped lang="scss">
.post-list-item-swiper {
  width: 100vw;
  padding-bottom: 32px;

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  &__cody-image {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    margin: 0 auto;
    background-color: rgba(var(--gray-200));
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__sell-button {
    position: absolute;
    bottom: 10px;
    right: 10px;

    &:hover {
      background-color: rgba(var(--black) / 0.6);
    }
  }

  &__info-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__full-name {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-inline: 4px;
  }

  &__bookmark-wrapper {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }

  &__bookmark-button {
    padding-inline: 2px;

    &--bookmarked {
      color: rgba(var(--yellow-300));
    }
  }

  &__chip {
    word-break: keep-all;
    text-align: center;
    height: fit-content;
    padding-block: 6px;
    line-height: 1.2;
  }

  &__name {
    word-break: keep-all;
  }

  &__purchase-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px;
    background-color: rgba(var(--blue));
    color: rgba(var(--white));
  }
}
</style>

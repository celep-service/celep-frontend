<script setup lang="ts">
import BaseChip from '@/components/Base/BaseChip.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import IconButton from '@/components/Common/IconButton.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import useToggleBookmarkMutation from '@/features/Bookmark/composables/useToggleBookmarkMutation'
import type { ToggleBookmarkType } from '@/model/Bookmark'
import type { ClothesTemplate } from '@/model/Clothes'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

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
  type: ToggleBookmarkType
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
    bookmarkCount: clothes.bookmarkCount,
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
const handleClickBookmarkButton = (id: number, type: ToggleBookmarkType) => {
  toggleBookmarkMutate({ routeParams: { id, type } })
}
</script>

<template>
  <Swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :pagination="{
      clickable: true
    }"
    :modules="[Pagination]"
    class="post-list-item-swiper"
  >
    <SwiperSlide v-for="item in data" :key="item.id">
      <div
        :style="{ backgroundImage: convertBackgroundImageUrlString(item.imageUrl) }"
        class="post-list-item-swiper__cody-image"
      ></div>

      <div class="post-list-item-swiper__info-wrapper">
        <div class="post-list-item-swiper__full-name">
          <div class="post-list-item-swiper__bookmark-wrapper">
            <IconButton
              @click="handleClickBookmarkButton(item.id, item.type)"
              :icon-option="{
                name: 'bookmark',
                opsz: '24',
                wght: '220'
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
            type="outlined"
            textColor="var(--gray-600)"
            borderColor="var(--gray-400)"
            :text="item.chipText"
            class="post-list-item-swiper__chip"
          />
          <TextBody2 weight="500" class="post-list-item-swiper__name">{{ item.title }}</TextBody2>
        </div>

        <a
          v-if="item.sellUrl"
          class="post-list-item-swiper__purchase-button"
          :href="item.sellUrl"
          target="_blank"
        >
          <TextBody2 weight="500">구매하러 가기</TextBody2>
          <BaseIcon name="chevron_right" opsz="24" />
        </a>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss">
.post-list-item-swiper {
  .swiper-pagination {
    position: static;
    padding-block: 8px;
  }
}
</style>

<style scoped lang="scss">
.post-list-item-swiper {
  /* Local Variable */
  $image-width: 200px;
  $image-margin-inline: calc((100vw - $image-width) / 2);
  $slide-padding-inline: 20px;
  $slide-width: calc($image-width + 2 * $slide-padding-inline);
  $slide-margin-inline: calc((100vw - $slide-width) / 2);

  width: 100%;

  .swiper-wrapper {
    position: relative;
  }

  .swiper-slide {
    width: $slide-width;
    padding-inline: $slide-padding-inline;

    &:not(.swiper-slide-active) {
      .post-list-item-swiper__cody-image {
        opacity: 0.2;
      }

      .post-list-item-swiper__info-wrapper {
        display: none;
      }

      .post-list-item-swiper__purchase-button {
        display: none;
      }
    }
  }

  &__cody-image {
    width: $image-width;
    aspect-ratio: 1;
    background-color: rgba(var(--gray-200));
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__info-wrapper {
    position: relative;
    right: $image-margin-inline;
    display: flex;
    flex-direction: column;
    width: 100vw;
  }

  &__full-name {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 8px;
  }

  &__bookmark-wrapper {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }

  &__bookmark-button {
    padding-inline: 2px;
  }

  &__bookmark-button--bookmarked {
    color: rgba(var(--yellow));
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

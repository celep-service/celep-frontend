<script setup lang="ts">
import BaseChip from '@/components/Base/BaseChip.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import type { ClothesTemplate } from '@/model/Clothes'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

/* Prop */
interface Props {
  postTitle: string
  postImageUrl: string
  celebName: string
  clothesList: ClothesTemplate[]
}
const props = withDefaults(defineProps<Props>(), {})

/* Local State */
interface DataTemplate {
  id?: number
  title: string
  imageUrl: string
  chipText: string
  sellUrl?: string
}
const codyData = computed<DataTemplate>(() => ({
  title: props.postTitle,
  imageUrl: props.postImageUrl,
  chipText: props.celebName
}))
const clothesListData = computed<DataTemplate[]>(() =>
  props.clothesList.map((clothes) => ({
    id: clothes.id,
    title: clothes.name,
    imageUrl: clothes.imageUrl,
    chipText: clothes.brand,
    sellUrl: clothes.sellUrl
  }))
)
const data = computed(() => [codyData.value, ...clothesListData.value])

/* Helper Function */
const convertBackgroundImageUrlString = (url: string) => {
  return `url(${url})`
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
  width: 100%;

  .swiper-wrapper {
    position: relative;
    right: calc(50vw - 110px);
    padding-left: calc(50vw - 110px);
  }

  .swiper-slide {
    width: 240px;
    padding-inline: 20px;
    transition: opacity ease 0.5s;

    &:not(.swiper-slide-active) {
      .post-list-item-swiper__cody-image {
        opacity: 0.2;
      }

      .post-list-item-swiper__info-wrapper {
        opacity: 0;
      }

      .post-list-item-swiper__purchase-button {
        display: none;
      }
    }
  }

  &__cody-image {
    width: 200px;
    height: 200px;
    background-color: rgba(var(--gray-200));
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__info-wrapper {
    position: relative;
    transform: translateX(calc(100px - 50vw));
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

  .swiper-pagination {
    position: static;
    padding-block: 8px;
  }
}
</style>

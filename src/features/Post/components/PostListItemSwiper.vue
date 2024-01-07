<script setup lang="ts">
import BaseChip from '@/components/Base/BaseChip.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import type { ClothesTemplate } from '@/model/Clothes'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

/* Prop */
interface Props {
  postTitle: string
  postImageUrl: string
  celebName: string
  clothesList: ClothesTemplate[]
}
const props = withDefaults(defineProps<Props>(), {})

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
    <SwiperSlide>
      <div
        :style="{ backgroundImage: convertBackgroundImageUrlString(postImageUrl) }"
        class="post-list-item-swiper__cody-image"
      ></div>
      <div class="post-list-item-swiper__info-wrapper">
        <div class="post-list-item-swiper__full-name">
          <BaseChip
            type="outlined"
            textColor="var(--indigo-600)"
            borderColor="var(--indigo-400)"
            :text="celebName"
            class="post-list-item-swiper__chip"
          />
          <TextBody2 weight="500" class="post-list-item-swiper__name">{{ postTitle }}</TextBody2>
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide v-for="clothes in clothesList" :key="clothes.id">
      <div
        :style="{ backgroundImage: convertBackgroundImageUrlString(clothes.imageUrl) }"
        class="post-list-item-swiper__cody-image"
      ></div>
      <div class="post-list-item-swiper__info-wrapper">
        <div class="post-list-item-swiper__full-name">
          <BaseChip
            type="outlined"
            textColor="var(--gray-600)"
            borderColor="var(--gray-400)"
            :text="clothes.brand"
            class="post-list-item-swiper__chip"
          />
          <TextBody2 weight="500" class="post-list-item-swiper__name">{{ clothes.name }}</TextBody2>
        </div>
        <a
          v-if="clothes.sellUrl"
          class="post-list-item-swiper__purchase-button"
          :href="clothes.sellUrl"
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

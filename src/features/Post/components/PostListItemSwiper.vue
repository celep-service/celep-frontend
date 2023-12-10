<script setup lang="ts">
import BaseChip from '@/components/Base/BaseChip.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import TextBody1 from '@/components/Text/TextBody1.vue'
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
      <img :src="postImageUrl" />
      <div class="post-list-item-swiper__info-wrapper">
        <div class="post-list-item-swiper__title">
          <BaseChip
            type="outlined"
            textColor="var(--indigo-600)"
            borderColor="var(--indigo-400)"
            :text="celebName"
          />
          <TextBody1 weight="500">{{ postTitle }}</TextBody1>
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide v-for="clothes in clothesList" :key="clothes.id">
      <img :src="clothes.imageUrl" />
      <div class="post-list-item-swiper__info-wrapper">
        <div class="post-list-item-swiper__title">
          <BaseChip
            type="outlined"
            textColor="var(--gray-600)"
            borderColor="var(--gray-400)"
            :text="clothes.brand"
          />
          <TextBody1 weight="500">{{ clothes.name }}</TextBody1>
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

    &:first-child {
      /* padding-left: calc(50vw - 100px); */
      /* position: relative; */
      /* right: calc(50vw - 120px); */
    }

    &:not(.swiper-slide-active) {
      opacity: 0.2;

      .post-list-item-swiper__purchase-button {
        display: none;
      }
    }

    > img {
      width: 200px;
      height: 200px;
      background-color: rgba(var(--gray-200));
    }
  }

  &__info-wrapper {
    position: relative;
    transform: translateX(calc(100px - 50vw));
    display: flex;
    flex-direction: column;
    width: 100vw;
  }

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding-block: 8px;
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

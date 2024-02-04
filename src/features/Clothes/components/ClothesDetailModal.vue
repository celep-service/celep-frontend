<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseChip from '@/components/Base/BaseChip.vue'
import BaseIcon from '@/components/Base/BaseIcon.vue'
import BaseModal from '@/components/Base/BaseModal.vue'
import TextBody2 from '@/components/Text/TextBody2.vue'
import type { ClothesTemplate } from '@/model/Clothes'
import { computed } from 'vue'

/* Prop */
interface Props {
  open: boolean
  clothes: ClothesTemplate
}
const props = withDefaults(defineProps<Props>(), {})

/* Emit */
interface Emits {
  (e: 'update:open', value: boolean): void
}
const emits = defineEmits<Emits>()

/* Local State */
const openModelValue = computed({
  get() {
    return props.open
  },
  set(value) {
    emits('update:open', value)
  }
})
const backgroundImageUrlString = computed(() => `url(${props.clothes.imageUrl})`)
</script>

<template>
  <BaseModal v-model:open="openModelValue" title="상세 정보" class="clothes-detail-modal">
    <div class="clothes-detail-modal__content">
      <div
        class="clothes-detail-modal__image"
        :style="{ backgroundImage: backgroundImageUrlString }"
      ></div>

      <div class="clothes-detail-modal__full-name">
        <BaseChip
          type="outlined"
          textColor="var(--gray-600)"
          borderColor="var(--gray-400)"
          :text="clothes.brand ?? '노브랜드'"
          class="clothes-detail-modal__chip"
        />
        <TextBody2 weight="500" class="clothes-detail-modal__name">{{ clothes.name }}</TextBody2>
      </div>

      <a
        v-if="clothes.sellUrl"
        :href="clothes.sellUrl"
        target="_blank"
        class="clothes-detail-modal__sell-button-wrapper"
      >
        <BaseButton>
          <BaseIcon name="shopping_bag" />
          구매하러 가기
        </BaseButton>
      </a>
    </div>
  </BaseModal>
</template>

<style lang="scss">
.clothes-detail-modal {
  max-width: 500px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: fit-content;
    margin: 0 auto;
  }

  &__image {
    position: relative;
    width: 250px;
    aspect-ratio: 1;
    margin: 0 auto;
    background-color: rgba(var(--gray-100));
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__full-name {
    display: flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
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

  &__sell-button-wrapper {
    margin-top: 10px;

    > button {
      width: 100%;
    }
  }
}
</style>

<template>
  <Modal class="modal-review">
    <Swiper
      class="review"
      :slides-per-view="1"
      :loop="true"
      :modules="[Autoplay, Navigation, Pagination]"
      :navigation="true"
      :autoplay="autoplayOptions"
      :pagination="paginationOptions"
    >
      <SwiperSlide v-for="slide in list.fileList" :key="slide">
        <img
          :src="originalImage(slide)"
          :alt="`${slide.name} 썸내일`"
          @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
        />
      </SwiperSlide>
      <template #pagination>
        <div v-if="list?.fileList.length > 1" class="swiper-pagination" />
      </template>
    </Swiper>
  </Modal>
</template>
<script setup>
import { useSwiperSlider } from '~/composables/slider.js'
import { useExpertReviews } from '~/composables/expert/reviews.js'
const { originalImage } = useExpertReviews()
const props = defineProps({
  list: {
    type: Object,
    required: true
  }
})
const {
  Swiper,
  SwiperSlide,
  Autoplay,
  Pagination,
  Navigation,
  autoplayOptions,
  paginationOptions
} = useSwiperSlider(props.list)
</script>

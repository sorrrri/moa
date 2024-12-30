import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

export const useSwiperSlider = (list) => {
  const route = useRoute()
  const slidesPerView = ref()
  // Swiper Settings
  const autoplayOptions = ref({
    delay: 4000,
    disableOnInteraction: true,
    speed: 1000
  })
  const images = ref([])

  const paginationOptions = ref({
    el: '.swiper-pagination',
    clickable: true,
    renderBullet(index, className) {
      return `<span class="${className}">${index + 1}&nbsp; /&nbsp; ${list.fileList.length}</span>`
    }
  })

  if (route.name === 'main') {
    images.value = [
      { url: '/images/main/main_1.png' },
      { url: '/images/main/main_2.png' },
      { url: '/images/main/main_3.png' }
    ]
    autoplayOptions.value.speed = 4000
    autoplayOptions.value.delay = 4000
  }

  if (route.name === 'category') {
    slidesPerView.value = 4

    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 768) {
        slidesPerView.value = 1.5
      } else if (screenWidth < 1024) {
        slidesPerView.value = 2
      } else {
        slidesPerView.value = 4
      }
    }

    onMounted(() => {
      updateSlidesPerView()

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateSlidesPerView)
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateSlidesPerView)
    })
  }

  return {
    images,
    slidesPerView,
    Swiper,
    SwiperSlide,
    EffectFade,
    Autoplay,
    Navigation,
    Pagination,
    autoplayOptions,
    paginationOptions
  }
}

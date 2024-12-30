<template>
  <main class="content-category">
    <section class="section-main is-active">
      <div class="wrapper">
        <h1 :title="`category-${category?.code}`">{{ category?.name }}</h1>
        <p>{{ category?.description }}</p>
        <Search />
      </div>
    </section>
    <section>
      <div class="wrapper">
        <div class="articles">
          <article v-for="cate in category?.belowList" :key="cate.seq">
            <h2>{{ cate.name }}</h2>
            <Swiper
              :navigation="true"
              :slides-per-view="slidesPerView"
              :loop="cate.length > 4"
              :modules="[Autoplay, Navigation]"
            >
              <SwiperSlide v-for="list in cate.belowList" :key="list" @click="requestQuote(list)">
                <div>
                  <div class="image">
                    <img
                      :src="thumbnail(list)"
                      :alt="`${list.name} 썸내일`"
                      @error="(event) => (event.target.src = '/images/common/logo_gr.svg')"
                    />
                  </div>
                  {{ list.name }}
                </div>
              </SwiperSlide>
            </Swiper>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import Search from '~/components/Search.vue'
import { useCategoryPage } from '~/composables/expert/skills.js'
import { useSwiperSlider } from '~/composables/slider.js'
const { slidesPerView, Swiper, SwiperSlide, Navigation, Autoplay } = useSwiperSlider()
const { thumbnail, MOA_API_URL, category } = useCategoryPage()
import { useRequestQuotation } from '~/composables/client/quotation.js'
const { requestQuote } = useRequestQuotation()
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - ${category.value?.name} 전문가 찾기`,
  meta: [
    {
      name: 'description',
      content: `${category.value?.description}`
    },
    {
      property: 'og:title',
      content: `가비아커머스 - ${category.value?.name} 전문가 찾기`
    },
    {
      property: 'og:description',
      content: `${category.value?.description}`
    },
    {
      property: 'og:image',
      content: `${MOA_API_URL.value}/${category.value?.belowList[0].filePath}`
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/categrory/${category.value?.seq}`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://moa.gabiacns.com/categrory/${category.value?.seq}`
    }
  ]
})
</script>

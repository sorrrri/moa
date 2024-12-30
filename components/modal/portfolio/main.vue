<template>
  <Modal class="modal-portfolio">
    <Swiper
      class="portfolio"
      :slides-per-view="1"
      :loop="true"
      :modules="[Navigation, Pagination]"
      :navigation="true"
      :pagination="paginationOptions">
      <SwiperSlide v-for="slide in portfolio?.fileList" :key="slide">
        <img
          :src="originalImage(slide)"
          :alt="`${slide.name} 썸내일`"
          @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')" />
      </SwiperSlide>
      <div v-if="portfolio?.fileList.length > 1" class="swiper-pagination" slot="pagination"></div>
    </Swiper>
    <ul>
      <li class="information">
        <div class="image">
          <img
            v-if="expertThumbnail"
            :src="expertThumbnail"
            :alt="`${expertTitle} 썸내일`"
            @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')" />
        </div>
        <div>
          <h3>{{ expertTitle }}</h3>
          <div v-if="expert.certifyStatus == 9" class="authentication">사업자 인증</div>
          <div class="reviews">
            <span class="stars">
              <i
                v-for="star in 5"
                :key="star"
                :class="{
                full: star <= Math.floor(Number(expertScore)),
                half: star - 0.5 <= Number(expertScore) && Number(expertScore) <= star
              }" />
            </span>
            <div class="review">
              <strong>{{ expertScore }}</strong>
              <small> / 리뷰 {{ reviewsCount }}개</small>
            </div>
          </div>
        </div>
      </li>
      <li v-if="client && expert.status == 9 && route.path.includes('profile')">
        <div class="buttons">
          <button @click="openModal('quotationSkills')">견적 요청</button>
          <div>
            <button class="i-heart" :class="{ full: favoriteExpert }" @click="updateFavoriteExpert" />
            <!-- <button class="i-share" @click="openShareModal = !openShareModal" /> -->
          </div>
          <Transition name="fade">
            <div v-if="openShareModal" class="share">
              <div class="close" @click="openShareModal = false" />
              <h3>공유하기</h3>
              <ul>
                <li class="link">
                  <i class="i-link" title="링크복사" />
                </li>
                <li class="facebook">
                  <i class="i-facebook" title="페이스북" />
                </li>
                <li class="twitter">
                  <i class="i-twitter" title="트위터" />
                </li>
                <li class="kakaotalk">
                  <i class="i-kakaotalk" title="카카오톡" />
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </li>
      <li class="description">
        <div class="texts">
          <small>{{ portfolio.portfolioDate }}년</small>
          <h3>{{ portfolio.title }}</h3>
          <div class="skills">
            <span v-for="list in portfolio.categoryList" :key="list.seq">{{ list.name }}</span>
          </div>
        </div>
        <p>
          {{ portfolio.contents }}
        </p>
      </li>
    </ul>
  </Modal>
</template>
<script setup>
import { useExpertInformation } from '~/composables/expert/profile.js'
import { useExpertIntro } from '~/composables/expert/intro.js'
import { useExpertPortfolio } from '~/composables/expert/portfolio.js'
import { useExpertReviews } from '~/composables/expert/reviews.js'
import { useWishlist } from '~/composables/client/wishlist.js'
import { useSwiperSlider } from '~/composables/slider.js'
const { client, expertTitle, expertThumbnail } = useExpertIntro()
const { favoriteExpert, updateFavoriteExpert } = useWishlist()
const { expert } = useExpertInformation()
const { originalImage, openShareModal } = useExpertPortfolio()
const { expertScore, reviewsCount } = useExpertReviews()
import { useCustomModal } from '~/composables/modal/index.js'
const { openModal } = useCustomModal()
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  portfolio: {
    type: Object,
    required: true
  }
})
const { Swiper, SwiperSlide, Pagination, Navigation, paginationOptions } = useSwiperSlider(props.portfolio)
</script>
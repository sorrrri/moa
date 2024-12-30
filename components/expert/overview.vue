<template>
  <section class="section-profile">
    <div class="wrapper">
      <div class="image">
        <img
          :src="expertThumbnail"
          alt=""
          @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
        />
      </div>
      <div class="information">
        <div class="title">
          <h2>{{ expert.nickName }}</h2>
          <div v-if="expert.certifyStatus == 9" class="authentication">사업자 인증</div>
        </div>
        <div v-if="reviewsCount" class="score">
          <span class="stars">
            <i v-for="star in 5" :key="star" :class="starRating(star)" />
          </span>
          <small>
            <strong>{{ expertScore }}</strong>
            / 리뷰 {{ reviewsCount }}개
          </small>
        </div>
      </div>
      <div v-if="client && expert.status == 9" class="buttons">
        <button class="i-heart" :class="{ full: favoriteExpert }" @click="updateFavoriteExpert" />
        <button class="btn-black" @click="openModal('quotationSkills')">견적 요청</button>
      </div>
    </div>
  </section>
  <Teleport to="body">
    <Transition name="fade">
      <ModalQuotationSkills v-if="currentModal === 'quotationSkills'" />
    </Transition>
  </Teleport>
</template>

<script setup>
import ModalQuotationSkills from '~/components/modal/quotation/selectSkills.vue'
import { useExpertInformation } from '~/composables/expert/profile.js'
import { useExpertIntro } from '~/composables/expert/intro.js'
import { useExpertReviews } from '~/composables/expert/reviews.js'
import { useCustomModal } from '~/composables/modal/index.js'
import { useWishlist } from '~/composables/client/wishlist.js'
const { expert } = useExpertInformation()
const { client, expertThumbnail } = useExpertIntro()
const { favoriteExpert, updateFavoriteExpert } = useWishlist()
const { expertScore, reviewsCount, starRating } = useExpertReviews()
const { openModal, currentModal } = useCustomModal()
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

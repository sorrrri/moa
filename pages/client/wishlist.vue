<template>
  <main class="content-wishlist">
    <header>
      <h2>나의 찜리스트</h2>
    </header>
    <div class="wrapper">
      <div v-if="favoriteExperts.length > 0">
        <ul>
          <li
            v-for="(list, index) in favoriteExperts"
            :key="index"
            :class="{ disabled: list.expert.status != '9' }"
          >
            <router-link
              :to="
                list.expert.status === '9'
                  ? { name: 'expertProfile', params: { seq: list.expert.seq } }
                  : '#'
              "
            >
              <div class="image">
                <img
                  class="profile-image"
                  :src="thumbnail(list)"
                  alt=""
                  @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
                />
              </div>
              <div class="information">
                <div class="title">
                  <h3>
                    {{ list.expert.nickName ?? '-' }}
                    <div v-if="list.expert.businessCertify" class="authentication">사업자 인증</div>
                  </h3>
                  <div v-if="list.expert.status == 9" class="skills">
                    <span v-for="skill in list.expert.category" :key="skill.seq">
                      {{ skill.categoryName }}
                    </span>
                  </div>
                  <div v-else class="skills">
                    <span> 활동이 중지되었거나 해지한 전문가입니다. </span>
                  </div>
                </div>
                <div v-if="list.expert.status == 9" class="score">
                  <span class="stars">
                    <i
                      :key="index"
                      :class="{ full: Math.floor(Number(list.expert.avgScore > 0)) }"
                    />
                  </span>
                  <strong>{{ list.expert.avgScore ?? 0 }}</strong>
                </div>
              </div>
            </router-link>

            <button
              class="i-heart full"
              @click.prevent="openConfirmModal('removeFavoriteExpert', list)"
            />
          </li>
        </ul>
        <Pagination :title="'wishlist'" />
      </div>
      <div v-else class="no-content">
        <img src="/images/common/no_content.png" alt="" />
        <p>
          <span>찜한 전문가가 없습니다.</span>
        </p>
      </div>
    </div>
  </main>
  <Teleport to="body">
    <Transition name="fade">
      <ModalRemoveFavoriteExpert
        v-if="currentConfirmModal === 'removeFavoriteExpert'"
        :list="selectedConfirmList"
      />
    </Transition>
  </Teleport>
</template>

<script setup>
import ModalRemoveFavoriteExpert from '~/components/modal/confirm.vue'
import { useConfirmModal } from '~/composables/modal/index.js'
const { currentConfirmModal, openConfirmModal, selectedConfirmList } = useConfirmModal()
import { useWishlist } from '~/composables/client/wishlist.js'
const { thumbnail, favoriteExperts } = useWishlist()
import Pagination from '~/components/Pagination.vue'
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 클라이언트 찜리스트`,
  meta: [
    {
      name: 'description',
      content: `내가 찜한 전문가 리스트입니다.`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 클라이언트 찜리스트'
    },
    {
      property: 'og:description',
      content: '내가 찜한 전문가 리스트입니다.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: 'https://moa.gabiacns.com/client/wishlist'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/client/wishlist'
    }
  ]
})
</script>

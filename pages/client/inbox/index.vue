<template>
  <main class="content-client inbox main">
    <div class="wrapper">
      <header>
        <h2>요청하신 견적요청내역입니다.</h2>
      </header>
      <ul v-if="quotations.length > 0">
        <li v-for="list in quotations" :key="list">
          <div class="title">
            <h3>{{ list.categoryName }}</h3>
            <small>요청일 {{ list.registDate }}</small>
            <router-link
              :to="{
                name: 'clientQuotationDetails',
                params: { quoteSeq: list.seq }
              }"
            >
              <button>견적 확인하기</button>
            </router-link>
          </div>
          <div class="content">
            <div class="experts">
              <div v-if="list.estimateItemList.length > 0" class="images">
                <div v-for="quotation in list.estimateItemList" :key="quotation" class="image">
                  <img
                    :src="thumbnail(quotation)"
                    :alt="quotation.expert.nickName"
                    @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
                  />
                </div>
              </div>
              <div>
                <span class="tag" :class="quoteStatus(list).className">{{
                  quoteStatus(list)?.tag
                }}</span>
                <span v-html="quoteStatus(list)?.message" />
              </div>
            </div>
            <div class="tips">{{ quoteStatus(list)?.subMessage }}</div>
          </div>
        </li>
      </ul>
      <Pagination v-if="quotations.length > 0" :title="'clientInbox'" />
      <div v-else class="no-content">
        <img src="/images/common/no_content.png" alt="" />
        <p>
          <span>견적서 요청 내역이 없습니다.</span>
          <span>원하는 전문가를 찾아보세요</span>
        </p>
      </div>
    </div>
  </main>
</template>
<script setup>
import Pagination from '~/components/Pagination.vue'
import { useClientQuotation } from '~/composables/client/quotation.js'
const { quotations, thumbnail, quoteStatus } = useClientQuotation()
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 클라이언트 받은 견적`,
  meta: [
    {
      name: 'description',
      content: `내가 요청한 견적 리스트입니다.`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 클라이언트 받은 견적'
    },
    {
      property: 'og:description',
      content: '내가 요청한 견적 리스트입니다.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/client/inbox`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/client/inbox'
    }
  ]
})
</script>

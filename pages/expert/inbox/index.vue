<template>
  <main class="content-expert inbox">
    <header>
      <h2>클라이언트의 견적 요청을 확인해보세요</h2>
      <p>요청서는 최대 30일간 유지됩니다.</p>
    </header>
    <div class="wrapper">
      <div class="list">
        <h5>
          <strong>30일간</strong> 수신한 견적 요청은
          <strong class="blue">{{ quotations.total ?? 0 }}건</strong> 입니다.
        </h5>
        <div class="search-quotation" :class="{ 'is-active': isOpened }">
          <div>
            <h4 v-if="isMobile">상세조회</h4>
            <ul>
              <li>
                <small>요청 유형</small>
                <div class="inputs">
                  <div v-for="(list, index) in quoteType" :key="index" class="checkbox">
                    <input
                      :id="list.id"
                      v-model="options.inEstimateType"
                      :value="index"
                      type="checkbox"
                    />
                    <label :for="list.id">{{ list.label }}</label>
                  </div>
                </div>
              </li>
              <li>
                <small>견적 상태</small>
                <div class="inputs">
                  <div v-for="list in quoteStatus" :key="list.id" class="checkbox">
                    <input
                      :id="list.id"
                      v-model="options.inSendType"
                      :value="list.value"
                      type="checkbox"
                    />
                    <label :for="list.id">{{ list.label }}</label>
                  </div>
                </div>
              </li>
              <li>
                <small>키워드 검색</small>
                <div class="inputs">
                  <div class="selectbox">
                    <select v-model="options.keywordType">
                      <option value="clientId">클라이언트 ID</option>
                      <option value="categoryName">전문분야</option>
                      <option value="estimateDescription">견적내용</option>
                    </select>
                  </div>
                  <input
                    v-model="options.keyword"
                    type="search"
                    placeholder="검색어를 입력해주세요."
                    @keyup.enter="searchQuotations"
                  />
                </div>
              </li>
            </ul>
          </div>
          <button class="btn-search" @click="searchQuotations">검색</button>
        </div>
        <div v-if="quotations.total > 0">
          <h3>
            받은 견적 요청 <small>({{ quotations.total }}건)</small>
            <button v-if="isMobile" type="button" @click="openSearch">상세조회</button>
          </h3>
          <div v-if="isMobile" class="filters">
            <span v-for="(type, index) in options.inEstimateType" :key="index">
              {{ type == '0' ? '일반 요청' : '직접 요청' }}
            </span>
            <span v-for="(status, index) in options.inSendType" :key="index">
              {{ status == 'send' ? '견적 완료' : '견적 미발송' }}
            </span>
          </div>
          <ul>
            <li
              v-for="(list, index) in quotations.data"
              :key="index"
              :class="{ closed: list.estimate.status == 6 }"
            >
              <div class="content">
                <h2>
                  {{ list.estimate.category.name }}
                  <div class="tags">
                    <span v-if="isLessThanOneDay(list.estimate.registDate)" class="red">NEW</span>
                    <span v-if="list.estimate.type == 1" class="skyblue">직접 요청</span>
                    <span v-if="list.estimate.status == 6">사용자 요청 마감</span>
                  </div>
                </h2>
                <div>
                  <strong> {{ list.estimate.client.userId }}님 </strong>
                  <small class="date">요청일 {{ list.registDate }}</small>
                </div>
                <article>
                  <div
                    v-for="(desc, index) in splitDescription(list.estimate.description)"
                    :key="index"
                  >
                    <span class="question">{{ desc.question }}</span>
                    <span class="answer" v-html="breakLines(desc.answer)" />
                  </div>
                </article>
              </div>
              <router-link :to="`/expert/inbox/details/${list.seq}`">
                <button v-if="list.sendDate" class="btn-border">견적 완료</button>
                <button v-else-if="isExpired(list)" class="btn-border">기한 만료</button>
                <button v-else-if="list.estimate.status == 0" class="">확인하기</button>
              </router-link>
            </li>
          </ul>
          <Pagination :title="'expertInbox'" />
        </div>
        <div v-else class="no-content">
          <img src="/images/common/no_content.png" alt="" />
          <p>
            <span>등록된 요청서가 없습니다.</span>
          </p>
          <!-- <button>바로가기</button> -->
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import Pagination from '~/components/Pagination.vue'
import { useMobile } from '~/composables/subs.js'
const { isMobile } = useMobile()
import { useExpertQuotation } from '~/composables/expert/quotation.js'
const {
  quotations,
  isOpened,
  isExpired,
  quoteType,
  quoteStatus,
  options,
  breakLines,
  openSearch,
  isLessThanOneDay,
  splitDescription,
  searchQuotations
} = useExpertQuotation()
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 받은 요청`,
  meta: [
    {
      name: 'description',
      content: `클라이언트의 견적 요청을 확인해 보세요.`
    },
    {
      property: 'og:title',
      content: `가비아커머스 - 모아, 전문가 받은 요청`
    },
    {
      property: 'og:description',
      content: '클라이언트의 견적 요청을 확인해 보세요.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/inbox`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/expert/inbox'
    }
  ]
})
</script>

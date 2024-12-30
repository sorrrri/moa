<template>
  <main class="content-expert quotation">
    <section class="wrapper">
      <article class="request">
        <h3>요청 내용</h3>
        <div class="title">
          <h3>{{ quote?.estimate?.client.userId }}</h3>
          <div class="skill">{{ quote?.estimate?.category.name }}</div>
          <small class="date">요청일 {{ formatted(quote.registDate, 'slash') }}</small>
        </div>
        <ul>
          <li v-for="(desc, index) in splitDescription(quote?.estimate?.description)" :key="index">
            <div class="question">{{ desc.question }}</div>
            <div class="answer" v-html="breakLines(desc.answer)" />
          </li>
        </ul>
      </article>
      <form class="contact">
        <header v-if="!quote.sendDate && quote.estimate.status == 0" class="title">
          <h3>견적 보내기</h3>
          <button v-if="quote.sendDate === null" type="button" @click="openModal('favoriteQuotes')">
            + 자주쓰는 견적 조회
          </button>
        </header>
        <header v-else>
          <h3 v-if="quote.sendDate">견적 회신 완료</h3>
          <h3 v-else>만료된 견적</h3>
        </header>
        <ul class="inputs">
          <li>
            <div>견적 금액</div>
            <div>
              <input
                v-model.trim="inputs.price"
                placeholder="(숫자만) 총 견적 금액을 입력해주세요."
                pattern="\d+"
                type="number"
                :readonly="quote.sendDate || quote.estimate.status == 1"
                @input="onlyNumbers"
              />
              <Transition name="fade">
                <small v-if="inputs.price?.length == 0" class="caution">
                  견적 금액을 입력해주세요.
                </small>
              </Transition>
            </div>
          </li>
          <li>
            <div>견적 설명</div>
            <div>
              <textarea
                v-model="inputs.description"
                rows="10"
                placeholder="클라이언트와 원활한 거래를 위해 견적 설명과 연락처를 함께 남겨주세요.

[견적 설명] 
제공 가능 서비스 범위, 서비스 기간, 투입 인력 등 자유롭게 기입해주세요 

[연락처]
전화번호, 이메일 등 연결 가능한 연락처를 기입해주세요"
                :readonly="quote.sendDate || quote.estimate.status == 1"
              />
              <Transition name="fade">
                <small v-if="inputs.description?.length == 0" class="caution">
                  견적에 대한 설명을 적어주세요.
                </small>
              </Transition>
            </div>
          </li>
        </ul>
        <div v-if="!quote.sendDate && quote.estimate.status == 0" class="options">
          <template v-if="hasEnoughTokens">
            <div class="checkbox">
              <input id="saved" v-model="inputs.favorite" type="checkbox" />
              <label for="saved">해당 견적을 자주 쓰는 견적에 등록합니다.</label>
            </div>
            <button :disabled="!isValid" type="button" @click="sendQuoteResponse(quote.seq)">
              {{ quote.estimate.category.price }}토큰 견적보내기
            </button>
          </template>
          <template v-else>
            <div class="caution">
              <small>
                견적서 발송을 위해서 {{ quote.estimate.category.price - currentTokens }}토큰이 더
                필요합니다.
              </small>
              <p>
                현재 보유토큰 ({{ currentTokens }}토큰)
                <router-link to="/token/charge">토큰 충전하기</router-link>
              </p>
            </div>
          </template>
        </div>
        <div v-else class="options">
          <router-link to="/expert/inbox"> 목록으로 </router-link>
        </div>
      </form>
    </section>
  </main>
  <Teleport to="body">
    <Transition name="fade">
      <ModalFavoriteQuotes v-if="currentModal === 'favoriteQuotes'" />
    </Transition>
  </Teleport>
</template>

<script setup>
import { useFormatter } from '~/composables/subs.js'
import { useCustomModal } from '~/composables/modal/index.js'
import { useExpertQuotation, useResponseQuotation } from '~/composables/expert/quotation.js'
import { useTokens } from '~/composables/expert/token.js'
const { currentTokens } = useTokens()
const { breakLines, splitDescription } = useExpertQuotation()
const { isValid, quote, inputs, onlyNumbers, hasEnoughTokens, sendQuoteResponse } =
  useResponseQuotation()
const { openModal, currentModal } = useCustomModal()
const { formatted } = useFormatter()
import ModalFavoriteQuotes from '~/components/modal/quotation/favoriteQuotes.vue'
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 받은 요청 상세`,
  meta: [
    {
      name: 'description',
      content: `클라이언트의 견적 요청 내용입니다.`
    },
    {
      property: 'og:title',
      content: `가비아커머스 - 모아, 전문가 받은 요청 상세`
    },
    {
      property: 'og:description',
      content: '클라이언트의 견적 요청 내용입니다.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/inbox/details/${quote.value.seq}`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://moa.gabiacns.com/expert/inbox/details/${quote.value.seq}`
    }
  ]
})
</script>

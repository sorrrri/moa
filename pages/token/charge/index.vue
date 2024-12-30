<template>
  <main class="content-token charge small">
    <section>
      <header>
        <router-link to="/" class="logo" />
        <h2>토큰 충전하기</h2>
      </header>
      <h3>충전 토큰금액을 선택해주세요</h3>
      <ul v-if="goodsList">
        <li v-for="list in goodsList" :key="list.quantity">
          <input
            :id="`select-${list.quantity}토큰`"
            v-model="selectedToken"
            type="radio"
            name="selectChargeToken"
            :value="list.quantity"
          />

          <label :for="`select-${list.quantity}토큰`">
            <div>
              <strong>
                <span class="blue">{{ list.quantity }} 토큰</span>
                충전
              </strong>
              <div v-if="list.promotion_quantity" class="tag">
                <span class="blue">+{{ list.promotion_quantity }}</span>
                보상 토큰
              </div>
            </div>
            <strong class="price"> {{ formatPrice(list.pay_price) }}원 </strong>
          </label>
        </li>
      </ul>
      <div class="total">
        <strong>최종 결제 금액</strong>
        <strong>{{ formatPrice(selectedToken * 100) }}원</strong>
      </div>
      <div class="buttons">
        <button type="submit" @click="submitChargeTokens">결제하기</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useFormatter } from '~/composables/subs.js'
import { useChargeTokens } from '~/composables/expert/token.js'
const { submitChargeTokens, goodsList, selectedToken } = useChargeTokens()
const { formatPrice } = useFormatter()
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 토큰 충전`,
  meta: [
    {
      name: 'description',
      content: `충전할 토큰 금액을 선택해 주세요.`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 전문가 토큰 충전'
    },
    {
      property: 'og:description',
      content: '충전할 토큰 금액을 선택해 주세요.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/token/charge`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/token/charge'
    }
  ]
})
</script>

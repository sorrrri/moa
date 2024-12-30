<template>
  <main class="content-expert register small">
    <section>
      <header>
        <div class="logo" />
        <h2>모아에서 전문가가 되어보세요</h2>
      </header>
      <article>
        <div>
          <h3>본인 인증</h3>
          <button :disabled="isVerified" @click="verifyPhoneNumber">
            휴대폰 본인 인증 {{ isVerified ? '완료' : '' }}
          </button>
        </div>
        <div>
          <h3>약관동의 (필수)</h3>
          <div class="checkbox check-all">
            <input id="agreeAll" v-model="checkedAll" type="checkbox" />
            <label for="agreeAll">아래 약관에 모두 동의합니다.</label>
          </div>
          <div v-for="(list, index) in agreement" :key="index" class="checkbox">
            <input
              :id="`checkAgreement-${index}`"
              :key="index"
              v-model="selectList"
              :value="index"
              name="checkAgreement"
              type="checkbox"
            />
            <label :for="`checkAgreement-${index}`">
              <a :href="list.url" target="_blank">{{ list.title }}</a
              >에 동의합니다.
            </label>
          </div>
        </div>
      </article>
      <div class="buttons">
        <button type="button" @click="goBack">이전</button>
        <button type="button" :disabled="!isVerified || !checkedAll" @click="goToNextPage">
          다음
        </button>
      </div>
    </section>
  </main>
</template>
<script setup>
import { useVerification } from '~/composables/expert/verification.js'
const { goBack, agreement, isVerified, selectList, verifyPhoneNumber, checkedAll, goToNextPage } =
  useVerification()

import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 등록하기`,
  meta: [
    {
      name: 'description',
      content: `전문가 등록하기`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 전문가 등록하기'
    },
    {
      property: 'og:description',
      content: '전문가 등록하기'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_expert_intro.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/register`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/expert/register'
    }
  ]
})
</script>

<template>
  <main class="content-expert intro interactive">
    <section class="section-intro">
      <div class="images responsive">
        <img src="/images/subs/expert/intro.png" alt="" />
        <img src="/images/subs/expert/intro_s.png" alt="" />
      </div>
    </section>
    <section class="section-chance first">
      <div class="wrapper">
        <h1>
          <span> <strong>전문가 등록</strong>만으로도 </span>
          <span> <strong>클라이언트를 만날 수 있는 기회</strong>가 많아져요 </span>
        </h1>
      </div>
    </section>
    <section class="section-sticky">
      <div class="wrapper">
        <button class="btn-blue" :disabled="account.expertInfo" @click="goToRegister">
          전문가 등록하기
        </button>
      </div>
    </section>
    <section class="section-chance">
      <div class="wrapper">
        <div class="banner">
          <img src="/images/subs/expert/banner.png" alt="" />
          <div class="texts">
            <h3>
              <span>모아에서 신뢰받는 전문가가 되어</span>
              <span> <strong class="blue">비즈니스를 확장</strong>해보세요. </span>
              <img src="/images/subs/expert/highlight.png" alt="" />
            </h3>
            <p>
              <span>
                해외 진출이 필요한 <strong class="blue">70만명의 클라이언트</strong>들이
              </span>
              <span>전문가 여러분들을 기다리고 있어요.</span>
            </p>
          </div>
        </div>
        <h2>함께하면 이런 점이 좋아요</h2>
        <ul>
          <li>
            <img src="/images/subs/expert/advantage_1.png" alt="" />
            <div class="texts">
              <h3>클라이언트와 새로운 연결</h3>
              <p>
                <span class="highlight">많은 클라이언트들이 전문가님을 기다리고</span>
                <span>있습니다. 다양한 분야에서 전문성을 발휘하고</span>
                <span>수익 창출의 기회를 노리세요!</span>
              </p>
            </div>
          </li>
          <li>
            <img src="/images/subs/expert/advantage_2.png" alt="" />
            <div class="texts">
              <h3>보다 더 쉬운 견적 제시</h3>
              <p>
                <span>부담 없이 견적을 제시해보세요.</span>
                <span><strong class="highlight">간편한 제출 양식</strong>을 통해 빠르고 쉽게</span>
                <span>견적 제시가 가능합니다.</span>
              </p>
            </div>
          </li>
          <li>
            <img src="/images/subs/expert/advantage_3.png" alt="" />
            <div class="texts">
              <h3>한 곳에서 이뤄지는 효과적인 마케팅</h3>
              <p>
                <span>내 프로필을 여러 클라이언트들에게 노출시킬 </span>
                <span>수 있어요. 내 전문성을 효과적으로 어필하여 </span>
                <span class="highlight">마케팅에 들이는 시간과 비용을 줄여줍니다.</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-about">
      <div class="wrapper">
        <h2>
          <span>전문가,</span>
          <span>이렇게 활동해요</span>
        </h2>
        <ul>
          <li>
            <h3>전문가 등록하기</h3>
            <p>
              <span>전문 분야 선택하고, 필수 정보만</span>
              <span>기입하면 간편 등록 완료!</span>
            </p>
          </li>
          <li>
            <h3>클라이언트 요청 받기</h3>
            <p>
              <span>내 전문성이 필요한 클라이언트들의 </span>
              <span>견적 요청을 무료로 받아요.</span>
            </p>
          </li>
          <li>
            <h3>토큰으로 견적 보내기</h3>
            <p>
              <span>토큰을 충전하여 클라이언트에게</span>
              <span>맞춤 견적을 보낼 수 있어요.</span>
            </p>
          </li>
          <li>
            <h3>클라이언트와 거래하기</h3>
            <p>
              <span>클라이언트와 매칭 후</span>
              <span>자유롭게 거래를 시작해요.</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-faq">
      <div class="wrapper">
        <h2>자주 묻는 질문</h2>
        <ul class="accordion">
          <li
            v-for="(list, index) in FAQ"
            :key="list"
            :class="{ 'is-active': activeIndex === index }"
          >
            <div class="question" @click="toggleAnswer(index)">{{ list.question }}</div>
            <div class="answer">{{ list.answer }}</div>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-qna">
      <img src="/images/subs/expert/qna.png" alt="" />
      <div class="texts">
        <h3>전문가 활동에 대해 더 궁금한 점이 있다면?</h3>
        <a href="https://www.gabiacns.com/voc/moa" target="_blank">문의하기</a>
      </div>
    </section>
  </main>
</template>
<script setup>
import { useAccount } from '~/composables/account.js'
import { useExpertRegister } from '~/composables/expert/intro.js'
const { account } = useAccount()
const { FAQ, activeIndex, toggleAnswer, goToRegister } = useExpertRegister()
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아에서 신뢰받는 전문가가 되어주세요.`,
  meta: [
    {
      name: 'description',
      content: `전문가 등록만으로도 클라이언트를 만날 수 있는 기회가 많아집니다.`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아에서 신뢰받는 전문가가 되어주세요.'
    },
    {
      property: 'og:description',
      content: '전문가 등록만으로도 클라이언트를 만날 수 있는 기회가 많아집니다.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_expert_intro.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/intro`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/intro'
    }
  ]
})
</script>

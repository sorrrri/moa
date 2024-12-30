<template>
  <main class="content-expert done small">
    <section>
      <div class="logo" />
      <h2>전문가 신청이 완료되었습니다</h2>
      <img src="/images/subs/done.png" alt="" />
      <strong>
        <span>프로필, 포트폴리오 등록 시</span>
        <span>성사율 38% UP!</span>
      </strong>
      <p>
        <span>지금 바로 프로필을 등록하세요. 클라이언트와 연결이 쉬워집니다.</span>
      </p>
      <div class="buttons">
        <button type="button" @click="goToEditProfile">프로필 작성하러 가기</button>
      </div>
    </section>
  </main>
</template>
<script setup>
import { useExpertInformation } from '~/composables/expert/profile.js'
const { goToEditProfile } = useExpertInformation()
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 등록 완료`,
  meta: [
    {
      name: 'description',
      content: `전문가 신청이 완료되었습니다`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 전문가 등록 완료'
    },
    {
      property: 'og:description',
      content: '전문가 신청이 완료되었습니다'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_expert_intro.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/register/done`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/expert/register/done'
    }
  ]
})
</script>

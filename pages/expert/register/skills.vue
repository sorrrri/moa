<template>
  <main class="content-expert register small">
    <section>
      <Skills />
    </section>
  </main>
</template>

<script setup>
import Skills from '~/components/Skills.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: `가비아커머스 - 모아, 전문가 분야 선택`,
  meta: [
    {
      name: 'description',
      content: `전문가 영역 분야 선택하기`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 전문가 분야 선택'
    },
    {
      property: 'og:description',
      content: '전문가 영역 분야 선택하기'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_expert_intro.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/register/skills`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/expert/register/skills'
    }
  ]
})
</script>

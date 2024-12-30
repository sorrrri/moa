<template>
  <main class="content-expert profile">
    <Overview />
    <template v-if="expert.status == 9">
      <section class="section-tabs">
        <div class="wrapper">
          <ul class="tabs">
            <li
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{ 'is-active': activeIndex === index }"
            >
              <a
                :href="`#${tab.name}`"
                :class="{ 'is-active': activeIndex === index }"
                @click.prevent="scrollToAnchor(tab, index, 180)"
              >
                {{ tab.title }}
              </a>
            </li>
          </ul>
        </div>
      </section>
      <div class="tab-content information">
        <Intro />
        <Skills />
        <History />
        <Certification />
        <Portfolio />
        <Reviews />
        <Faq />
      </div>
    </template>
    <template v-else>
      <section class="section-tabs">
        <div class="wrapper blur">
          <ul class="tabs">
            <li
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{ 'is-active': activeIndex === index }"
            >
              <a :href="`#${tab.name}`">
                {{ tab.title }}
              </a>
            </li>
          </ul>
        </div>
      </section>
      <div class="blur tab-content information">
        <Skills />
        <div class="caution">활동이 중지되었거나 해지한 전문가입니다.</div>
      </div>
    </template>
  </main>
</template>

<script setup>
import { useExpertInformation, useExpertInformationTabs } from '~/composables/expert/profile.js'
const { MOA_API_URL, expert } = useExpertInformation()
const { scrollToAnchor, activeIndex, tabs } = useExpertInformationTabs()
import Overview from '~/components/expert/overview.vue'
import Intro from '~/components/expert/intro.vue'
import Certification from '~/components/expert/certification.vue'
import Portfolio from '~/components/expert/portfolio.vue'
import Skills from '~/components/expert/skills.vue'
import History from '~/components/expert/history.vue'
import Reviews from '~/components/expert/reviews.vue'
import Faq from '~/components/expert/faq.vue'
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아 ${expert.value.nickName || ''}`,
  meta: [
    {
      name: 'description',
      content:
        expert.value.introContents?.length > 80
          ? `${expert.value.introContents.slice(0, 80)}...`
          : ''
    },
    {
      property: 'og:title',
      content: `가비아커머스 - 모아 ${expert.value.nickName || ''}`
    },
    {
      property: 'og:description',
      content:
        expert.value.introContents?.length > 80
          ? `${expert.value.introContents.slice(0, 80)}...`
          : ''
    },
    {
      property: 'og:image',
      content: expert.value.profileImage
        ? `${MOA_API_URL.value}/${expert.value.profileImage?.filePath}`
        : 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/profile/${expert.value.seq}`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://moa.gabiacns.com/expert/profile/${expert.value.seq}`
    }
  ]
})
</script>

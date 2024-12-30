<template>
  <header class="header-sub">
    <router-link to="/" class="logo">
      <div class="title">해외 진출 <span>전문가 매칭 MOA</span></div>
    </router-link>
    <div />
    <nav>
      <button @click="goToMyProfile">내 프로필 바로가기</button>
      <button class="btn-save" type="button" @click="updateExpertProfile">저장</button>
      <SubMenus />
    </nav>
  </header>
  <main class="content-expert edit">
    <Aside />
    <section>
      <form>
        <div class="articles">
          <intro />
          <skills />
          <businessLicense />
          <history />
          <certification />
          <portfolio />
          <faq />
        </div>
      </form>
    </section>
  </main>
  <footer class="responsive">
    <strong>
      프로필 완성하면
      <span class="red">35토큰 지급</span>
    </strong>
    <div class="buttons">
      <button class="btn-save" type="button" @click="updateExpertProfile">저장</button>
    </div>
  </footer>
</template>
<script setup>
import { useExpertInformation } from '~/composables/expert/profile.js'
const { updateExpertProfile, goToMyProfile } = useExpertInformation()
import SubMenus from '~/layouts/subMenus.vue'
import Aside from '~/layouts/aside.vue'
import intro from '~/components/expert/edit/intro.vue'
import skills from '~/components/expert/skills.vue'
import businessLicense from '~/components/expert//edit/businessLicense.vue'
import history from '~/components/expert/edit/history.vue'
import certification from '~/components/expert/edit/certification.vue'
import faq from '~/components/expert/edit/faq.vue'
import portfolio from '~/components/expert/edit/portfolio.vue'
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 프로필 관리`,
  meta: [
    {
      name: 'description',
      content: `전문가 프로필을 관리해 주세요.`
    },
    {
      property: 'og:title',
      content: `가비아커머스 - 모아, 전문가 프로필 관리`
    },
    {
      property: 'og:description',
      content: '전문가 프로필을 관리해 주세요.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/edit`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://moa.gabiacns.com/expert/edit`
    }
  ]
})
</script>

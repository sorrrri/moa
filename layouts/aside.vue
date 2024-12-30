<template>
  <aside class="aside-edit">
    <article>
      <h2>프로필 관리</h2>
      <nav>
        <a
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ 'is-active': activeIndex === index }"
          :href="`#${tab.name}`"
          @click.prevent="scrollToAnchor(tab, index, isMobile ? 148 : 80)"
        >
          {{ tab.title }}
        </a>
      </nav>
    </article>
    <article>
      <div class="completeness">
        <img src="/images/subs/expert/ico_gt.png" alt="" />
        <h3>프로필 완성하면 <strong>35토큰 지급</strong></h3>
        <p>
          <span>프로필을 업데이트하고 </span>
          <span>클라이언트의 선택을 받아보세요!</span>
        </p>
        <div class="progress">
          <small>
            프로필 완성도
            <strong>{{ profileProgress }}%</strong>
          </small>
          <div class="bar" :class="{ red: profileProgress > 70 }">
            <span :style="`width: ${profileProgress}%`" />
          </div>
        </div>
      </div>
      <router-link to="/expert/terminate" class="delete">전문가 해지</router-link>
    </article>
  </aside>
</template>
<script setup>
import { useExpertInformation, useExpertInformationTabs } from '~/composables/expert/profile.js'
const { profileProgress } = useExpertInformation()
const { scrollToAnchor, activeIndex, tabs } = useExpertInformationTabs()
import { useMobile } from '~/composables/subs.js'
const { isMobile } = useMobile()
</script>

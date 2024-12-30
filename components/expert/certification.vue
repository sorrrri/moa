<template>
  <article v-if="certification?.length > 0" class="certification">
    <div class="title">
      <span>자격증</span>
      <span>및 인증 내역</span>
    </div>
    <div>
      <ul :class="{ gradation: isCollapsed }">
        <li>
          <div>인증명</div>
          <div>기관</div>
          <div>기간</div>
        </li>
        <li v-for="(list, index) in certification" :key="index">
          <div>{{ list.certificationName }}</div>
          <div>{{ list.authorityName }}</div>
          <div>{{ list.startDate }} ~ {{ list.endDate }}</div>
        </li>
      </ul>
      <button v-if="isCollapsed" class="expand-content" @click.prevent="showAll">더보기</button>
      <button v-if="isExpanded" class="collapse-content" @click="showPartly()">접기</button>
    </div>
  </article>
</template>

<script setup>
import { useExpertCertification } from '~/composables/expert/certification.js'
const { certification, showAll, isCollapsed, isExpanded, showPartly } = useExpertCertification()
</script>

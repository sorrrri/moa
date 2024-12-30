<template>
  <header v-if="isMobile && route.path !== '/'" class="header-mobile">
    <button class="btn-prev" onclick="history.back()" />
    <a href="https://moa.gabiacns.com" class="title">
      <strong>전문가 매칭 MOA</strong>
    </a>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import { useMobile } from '~/composables/subs.js'
const { isMobile } = useMobile()
</script>

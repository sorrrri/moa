<template>
  <header
    v-if="
      route.name !== 'error' &&
      !route.path.includes('register') &&
      !route.path.includes('charge') &&
      !route.path.includes('edit')
    "
    class="header-sub"
    :class="{ transparent: changeSubHeaderUI, category: route.name === 'category' }"
  >
    <router-link to="/" class="logo">
      <div class="title">해외 진출 전문가 매칭 플랫폼</div>
    </router-link>
    <Search />
    <SubMenus />
  </header>
</template>

<script setup>
import SubMenus from '~/layouts/subMenus.vue'
import Search from '~/components/Search.vue'
import { useChangeSubHeaderUI } from '~/composables/subs.js'
import { useRoute } from 'vue-router'
const route = useRoute()
const { changeSubHeaderUI } = useChangeSubHeaderUI()
</script>

<template>
  <nav
    v-if="
      !route.path.includes('edit') &&
      !route.path.includes('token') &&
      !route.path.includes('quotation') &&
      !route.path.includes('profile') &&
      !route.path.includes('register')
    "
    class="quick-menu responsive"
  >
    <menu class="menu-home" :class="{ 'is-active': isActive('/') }" @click="setActiveMenu('/')">
      홈
    </menu>
    <menu
      v-if="currentAccountType === 'expert'"
      class="menu-user"
      :class="{ 'is-active': isActive('/expert/edit') }"
      @click="setActiveMenu('/expert/edit')"
    >
      전문가 관리
    </menu>
    <menu
      v-else
      class="menu-search"
      :class="{ 'is-active': isActive('/search') }"
      @click="setActiveMenu('/search')"
    >
      검색
    </menu>
    <menu
      class="menu-inbox"
      :class="{
        'is-active':
          currentAccountType === 'expert' ? isActive('/expert/inbox') : isActive('/client/inbox')
      }"
      @click="
        currentAccountType === 'expert'
          ? setActiveMenu('/expert/inbox')
          : setActiveMenu('/client/inbox')
      "
    >
      받은 견적
    </menu>
    <menu
      v-if="currentAccountType === 'expert'"
      class="menu-token"
      :class="{ 'is-active': isActive('/token') }"
      @click="setActiveMenu('/token')"
    >
      토큰
    </menu>
    <menu
      v-else
      class="menu-wishlist"
      :class="{ 'is-active': isActive('/client/wishlist') }"
      @click="setActiveMenu('/client/wishlist')"
    >
      찜
    </menu>
    <menu v-if="isLoggedIn" class="menu-change" @click.prevent="changeUserRole">전환</menu>
    <menu v-else class="menu-user" @click="submitLogin">로그인</menu>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useActiveMenu } from '~/composables/subs.js'
import { useAccount, useUserRole } from '~/composables/account.js'
const route = useRoute()
const { submitLogin } = useAccount()
const { changeUserRole } = useUserRole()
const { setActiveMenu, isActive, isLoggedIn, currentAccountType } = useActiveMenu()
</script>

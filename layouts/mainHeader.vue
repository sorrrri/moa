<template>
  <header v-if="route.name !== 'error' && !route.path.includes('register')" class="header">
    <div class="links">
      <a href="https://www.gabiacns.com" class="logo">
        <img src="/images/common/logo.svg" alt="" />
      </a>
      <nav class="lnb" @mouseover="showSubs">
        <a href="https://shop.gabiacns.com/clickn">쇼핑몰 창업</a>
        <a href="https://editor.gabiacns.com/">AI 에디터</a>
        <a href="https://custom.gabiacns.com/website">제작·운영 의뢰</a>
        <a href="https://market.gabiacns.com/esellers">오픈마켓 판매</a>
        <a href="https://global.gabiacns.com">해외 진출</a>
        <a href="https://ads.gabiacns.com">광고·마케팅</a>
      </nav>
      <nav class="gnb">
        <div v-if="account.receivedData?.user_id">
          <span> {{ account.username }}님 </span>
          <button @click="submitLogout">로그아웃</button>
        </div>
        <button v-else @click="submitLogin">로그인</button>
        <a href="https://www.gabiacns.com/customer">고객센터</a>
      </nav>
    </div>
    <div class="hamburg-menu responsive" @click="toggleAsideMenus" />
    <div class="subs" :class="{ 'is-active': asideMenus || subMenus }" @mouseleave="hideSubs">
      <header class="responsive">
        <router-link class="logo" to="/">
          <img src="/images/common/logo.svg" alt="" />
        </router-link>
        <button class="close responsive" />
      </header>
      <ul class="wrapper">
        <li class="">
          <menu class="responsive">쇼핑몰 창업</menu>
          <div>
            <a href="https://shop.gabiacns.com/clickn">초간편 쇼핑몰</a>
            <a href="https://shop.gabiacns.com/cloud">클라우드 쇼핑몰</a>
            <a href="https://shop.gabiacns.com/license">독립 쇼핑몰</a>
            <a href="https://shop.gabiacns.com/frelocate">쇼핑몰 이전</a>
          </div>
        </li>
        <li>
          <menu class="responsive">AI 에디터</menu>
          <div>
            <a href="https://editor.gabiacns.com/">상품 상세 생성</a>
          </div>
        </li>
        <li>
          <menu class="responsive">제작·운영 의뢰</menu>
          <div>
            <a href="https://custom.gabiacns.com/website">쇼핑몰</a>
            <a href="https://custom.gabiacns.com/selling">운영 대행</a>
          </div>
        </li>
        <li>
          <menu class="responsive">오픈마켓 판매</menu>
          <div>
            <a href="https://market.gabiacns.com/esellers" data-badge="event">쇼핑몰 통합관리</a>
          </div>
        </li>
        <li>
          <menu class="responsive">
            <span data-badge="new"> 해외 진출 </span>
          </menu>
          <div>
            <a href="https://global.gabiacns.com" class="responsive">전체보기</a>
            <a href="https://global.gabiacns.com/amazon">아마존 입점</a>
            <a href="https://global.gabiacns.com/alibaba">알리바바 입점</a>
            <a href="https://global.gabiacns.com/globalmall">해외몰 구축</a>
            <a href="https://moa.gabiacns.com" data-badge="new">전문가 매칭</a>
          </div>
        </li>
        <li>
          <menu class="responsive">광고·마케팅</menu>
          <div>
            <a href="https://ads.gabiacns.com" class="responsive">전체보기</a>
            <a href="https://ads.gabiacns.com/agency" data-badge="event">온라인 광고</a>
            <a href="https://ads.gabiacns.com/sns">SNS 마케팅</a>
          </div>
        </li>
      </ul>
      <hr class="responsive" />
      <div class="external-links responsive">
        <nav>
          <a href="https://www.gabiacns.com/cms/notice">새소식</a>
          <a href="https://www.gabiacns.com/cms/event">이벤트</a>
          <a href="https://www.gabiacns.com/customer/faq">FAQ</a>
          <a href="https://www.gabiacns.com/government-benefit">바우처</a>
          <a href="https://www.gabiacns.com/cms/library">라이브러리</a>
        </nav>
      </div>
      <footer class="responsive">
        <nav v-if="account.userId">
          <router-link to="/" @click="submitLogout">로그아웃</router-link>
        </nav>
        <nav v-else>
          <router-link to="/" @click="submitLogin">로그인</router-link>
          <router-link to="/expert/register">회원가입</router-link>
        </nav>
      </footer>
    </div>
  </header>
  <SubHeader />
  <MobileHeader />
</template>

<script setup>
import { useRoute } from 'vue-router'
import SubHeader from './subHeader.vue'
import MobileHeader from './mobileHeader.vue'
import { useAccount } from '~/composables/account.js'
import { useSubMenus } from '~/composables/subs.js'
const route = useRoute()
const { account, submitLogin, submitLogout } = useAccount()
const { asideMenus, showSubs, hideSubs, subMenus, toggleAsideMenus } = useSubMenus()
</script>

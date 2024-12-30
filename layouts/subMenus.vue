<template>
  <!-- 전문가 상태 -->
  <nav v-if="isExpert && !route.path.includes('edit')">
    <router-link to="/expert/inbox">
      <button>받은 요청</button>
    </router-link>
    <button
      v-if="after"
      class="ico-notification"
      :class="{ 'is-active': subNotiMenus }"
      @click="subNotiMenus = !subNotiMenus"
    />
    <button
      v-if="account.lastLoginType"
      class="ico-more"
      :class="{ 'is-active': subUserMenus }"
      @click="subUserMenus = !subUserMenus"
    />
  </nav>
  <!-- 클라이언트 상태 -->
  <nav v-if="isClient || (isNotExpert && account.clientSeq)">
    <router-link to="/client/inbox">
      <button>받은 견적</button>
    </router-link>
    <button
      v-if="after"
      class="ico-notification"
      :class="{ 'is-active': subNotiMenus }"
      @click="subNotiMenus = !subNotiMenus"
    />
    <button
      v-if="account.lastLoginType"
      class="ico-more"
      :class="{ 'is-active': subUserMenus }"
      @click="subUserMenus = !subUserMenus"
    />
  </nav>
  <!-- 전문가 등록 전 -->
  <nav v-else-if="isNotExpert">
    <router-link to="/intro">
      <button>전문가 등록</button>
    </router-link>
  </nav>

  <div v-if="subNotiMenus" class="sub-menus notification">
    <ul class="tabs">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'is-active': activeIndex === index }"
        @click="handleChangeTab(index)"
      >
        {{ tab.title }}
        <span v-if="tab.count" class="count">{{ tab.count }}</span>
      </li>
    </ul>
    <article v-if="activeIndex === 0">
      <small>최근 30일 동안의 알림만 보관되며, 이후 자동 삭제됩니다.</small>
      <div>알림 내역이 없습니다.</div>
    </article>
    <article v-if="activeIndex === 1">
      <small>최근 30일 동안의 알림만 보관되며, 이후 자동 삭제됩니다.</small>
      <ul>
        <li class="date">1일 전</li>
        <li class="more">
          <strong>록시땅글로벌이 해외진출 전문 분야 견적을 보냈습니다</strong>
          <small>견적내용을 확인해보세요</small>
        </li>
      </ul>
    </article>
    <article v-if="activeIndex === 2" class="settings">
      <ul>
        <li>
          <div class="content">
            <strong>알림 설정</strong>
          </div>
          <small>카카오톡 알림</small>
        </li>
        <li>
          <div class="content">
            <strong>수신함</strong>
            <small>견적서 도착 알림</small>
          </div>
          <div class="toggle-switch">
            <input id="n_inbox" type="checkbox" />
            <label for="n_inbox" />
          </div>
        </li>
        <li>
          <div class="content">
            <strong>대화</strong>
            <small>대화 메시지 알림</small>
          </div>
          <div class="toggle-switch">
            <input id="n_chat" type="checkbox" />
            <label for="n_chat" />
          </div>
        </li>
        <li>
          <div class="content">
            <strong>리뷰, 프로필</strong>
            <small>리뷰 및 프로필 관리팁 알림</small>
          </div>
          <div class="toggle-switch">
            <input id="n_reviews_profile" type="checkbox" />
            <label for="n_reviews_profile" />
          </div>
        </li>
        <li>
          <div class="content">
            <strong>전문가 매칭 MOA 새소식</strong>
            <small>프로모션, 업데이트 등 소식 알림</small>
          </div>
          <div class="toggle-switch">
            <input id="n_news" type="checkbox" />
            <label for="n_news" />
          </div>
        </li>
      </ul>
    </article>
  </div>

  <div v-if="subUserMenus" class="sub-menus user">
    <ul v-if="isExpert">
      <li class="account">
        <router-link
          :to="{ name: 'expertProfile', params: { seq: account.expertSeq } }"
          class="account"
        >
          <strong>{{ account.username }}</strong> 전문가님
        </router-link>
      </li>
      <li>
        <router-link to="/expert/inbox">받은 요청</router-link>
      </li>
      <li>
        <router-link to="/expert/edit">프로필 관리</router-link>
      </li>
      <li>
        <router-link to="/token">토큰 관리</router-link>
      </li>
    </ul>
    <ul v-else-if="isClient || (isNotExpert && account.clientSeq)">
      <li class="account">
        <strong>{{ account.username }}</strong
        >님
      </li>
      <li>
        <router-link to="/client/inbox">받은 견적</router-link>
      </li>
      <li>
        <router-link to="/client/wishlist">찜리스트</router-link>
      </li>
    </ul>
    <div v-if="isExpert && account.clientSeq" @click.prevent="changeUserRole">
      클라이언트로 전환
    </div>
    <div v-else-if="isClient && account.expertInfo?.status == 9" @click.prevent="changeUserRole">
      전문가로 전환
    </div>
    <div v-else-if="isClient && isNotExpert" @click.prevent="changeUserRole">전문가 등록</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useSubMenus } from '~/composables/subs.js'
import { useUserRole } from '~/composables/account.js'
const { after, notification, subNotiMenus, subUserMenus } = useSubMenus()
const { account, isExpert, isNotExpert, isClient, changeUserRole } = useUserRole()
const route = useRoute()
</script>

<template>
  <main class="content-token main">
    <header>
      <h2>토큰 관리</h2>
      <p>토큰 충전 및 사용내역을 확인할 수 있습니다.</p>
    </header>
    <div class="wrapper">
      <section>
        <header>
          <div class="selectbox">
            <select id="" v-model="selectedYear" name="" @change="fetchTokenList">
              <option v-for="(list, index) in years" :key="index" :value="list">
                {{ list }}년
              </option>
            </select>
          </div>
        </header>
        <aside>
          <div class="profile">
            <div class="image">
              <img
                :src="expertThumbnail"
                alt=""
                @error="(event) => (event.target.src = '/images/common/no_thumbnail2.png')"
              />
            </div>
            <div class="token">
              <div>{{ account.expertInfo.nickName }}님</div>
              <div>보유 토큰</div>
              <strong class="blue">{{ tokenTotal.totalToken }}</strong>
            </div>
          </div>
          <div class="details">
            <span>
              충전 <strong>{{ tokenTotal.totalChargeToken }}</strong>
            </span>
            <span>
              보상 <strong>{{ tokenTotal.totalRewardToken }}</strong>
            </span>
          </div>
          <div class="buttons">
            <div class="button">
              <button class="btn-charge" @click="goToTokenCharge">충전하기</button>
            </div>
          </div>
        </aside>
        <article>
          <ul v-if="tokenInfo">
            <li
              v-for="list in tokenInfo"
              :key="list"
              @click="openModal(`${list.type}TokenDetails`, list)"
            >
              <div>
                <strong v-if="list.description != 'string' && list.description">
                  {{ list.description }}
                </strong>
                <strong v-else-if="list.type === 'charge'">토큰 충전</strong>
                <strong v-else-if="list.type === 'reward'">보상 토큰 충전</strong>
                <strong v-else-if="list.type === 'passive'">수동 충전</strong>
                <strong v-else-if="list.type === 'send'">토큰 사용 - 견적 발송</strong>
                <strong v-else-if="list.type === 'refund'">토큰 환불</strong>
                <strong v-else-if="list.type === 'profile'">프로필 완성 보상금</strong>
                <small>{{ list.procDate }}</small>
              </div>
              <div class="blue">
                <strong v-if="list.type === 'send'">
                  - {{ Math.abs(list.chargeToken + list.rewardToken) }}
                </strong>
                <strong v-else-if="list.type === 'reward'">
                  +
                  {{ Math.abs(list.rewardToken + list.chargeToken) }}
                </strong>
                <span v-else-if="list.chargeToken === 0" />
                <strong v-else> + {{ list.chargeToken }} </strong>
                <small
                  v-if="
                    (list.type === 'passive' && list.rewardToken !== 0) ||
                    (list.type === 'profile' && list.rewardToken > 0) ||
                    (list.type === 'charge' && list.rewardToken > 0)
                  "
                >
                  <template v-if="list.rewardToken < 0">
                    - {{ Math.abs(list.rewardToken) }}
                  </template>
                  <template v-else> + {{ list.rewardToken }} </template>
                  <span>보상 토큰</span>
                </small>
              </div>
            </li>
          </ul>
          <Pagination :title="'token'" />
        </article>
      </section>
    </div>
  </main>
  <Teleport to="body">
    <Transition name="fade">
      <ModalRewardTokenDetails v-if="currentModal === 'rewardTokenDetails'" :list="selectedList" />
    </Transition>
    <Transition name="fade">
      <ModalTokenCharged v-if="currentModal === 'chargeTokenDetails'" :list="selectedList" />
    </Transition>
    <Transition name="fade">
      <ModalTokenUsed v-if="currentModal === 'sendTokenDetails'" :list="selectedList" />
    </Transition>
    <Transition name="fade">
      <ModalTokenRefund v-if="currentModal === 'refundToken'" :list="selectedList" />
    </Transition>
    <Transition name="fade">
      <ModalTokenRefundDetails v-if="currentModal === 'refundTokenDetails'" :list="selectedList" />
    </Transition>
    <Transition name="fade">
      <ModalProfileTokenDetails
        v-if="currentModal === 'profileTokenDetails'"
        :list="selectedList"
      />
    </Transition>
    <Transition name="fade">
      <ModalPassiveTokenDetails
        v-if="currentModal === 'passiveTokenDetails'"
        :list="selectedList"
      />
    </Transition>
  </Teleport>
</template>
<script setup>
import Pagination from '~/components/Pagination.vue'
import ModalTokenCharged from '~/components/modal/token/charged.vue'
import ModalTokenUsed from '~/components/modal/token/used.vue'
import ModalTokenRefund from '~/components/modal/token/refund/index.vue'
import ModalTokenRefundDetails from '~/components/modal/token/refund/details.vue'
import ModalRewardTokenDetails from '~/components/modal/token/reward.vue'
import ModalProfileTokenDetails from '~/components/modal/token/profile.vue'
import ModalPassiveTokenDetails from '~/components/modal/token/passive.vue'
import { useAccount } from '~/composables/account.js'
import { useExpertIntro } from '~/composables/expert/intro.js'
import { useTokens } from '~/composables/expert/token.js'
const { account } = useAccount()
const { expertThumbnail } = useExpertIntro()
const { fetchTokenList, goToTokenCharge, tokenTotal, years, selectedYear, tokenInfo } = useTokens()
import { useCustomModal } from '~/composables/modal/index.js'
const { openModal, selectedList, currentModal } = useCustomModal()
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 토큰 관리`,
  meta: [
    {
      name: 'description',
      content: `토큰 충전 및 사용 내역을 확인할 수 있습니다.`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 전문가 토큰 관리'
    },
    {
      property: 'og:description',
      content: '토큰 충전 및 사용 내역을 확인할 수 있습니다.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/token`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com/token'
    }
  ]
})
</script>

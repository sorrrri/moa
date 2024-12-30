<template>
  <main class="content-terminate small">
    <section>
      <header>
        <h2>전문가 해지</h2>
      </header>
      <div class="list">
        <h3>'모아'를 떠나는 이유를 알려주세요.</h3>
        <ul>
          <li v-for="(label, index) in reasons" :key="index">
            <div class="checkbox">
              <input
                :id="`check-${index}`"
                v-model="termination.reasons"
                type="checkbox"
                :value="index"
              />
              <label :for="`check-${index}`">{{ label }}</label>
            </div>
          </li>
        </ul>
      </div>
      <div class="list">
        <h3>본인 인증</h3>
        <p>전문가 등록 시 인증한 번호로 본인 인증을 진행해주세요.</p>
        <button class="btn-auth" :disabled="isVerified" @click="verifyPhoneNumber">
          휴대폰 본인 인증 {{ isVerified ? '완료' : '' }}
        </button>
      </div>
      <div class="list">
        <div class="checkbox">
          <input id="confirmed" v-model="termination.checked" type="checkbox" value="info" />
          <label for="confirmed">전문가 활동을 종료하기 위한 해지를 확인하였습니다.</label>
        </div>
        <div class="checkbox">
          <input id="confirmed2" v-model="termination.checked" type="checkbox" value="waring" />
          <label for="confirmed2">주의사항을 모두 확인하였습니다.</label>
        </div>
      </div>
      <div class="refund-account">
        <div class="title">
          <strong>환불 계좌</strong
          ><small>카드 취소가 불가할 경우 입금받을 환불 계좌를 입력해주세요.</small>
        </div>
        <div class="inputs">
          <div class="selectbox">
            <select v-model="termination.bankCode">
              <option v-for="(name, code) in bankList" :key="code" :value="code">
                {{ name }}
              </option>
            </select>
          </div>
          <input v-model.trim="termination.bankName" type="text" placeholder="환불 계좌 소유자" />
          <input
            v-model.trim="termination.bankNumber"
            maxlength="20"
            type="text"
            placeholder="환불 계좌번호"
          />
        </div>
      </div>
      <button
        class="btn-blue"
        type="button"
        :disabled="!isValid || !isVerified"
        @click.prevent="openConfirmModal('termination', termination)"
      >
        전문가 해지
      </button>
    </section>
    <section class="section-caution">
      <div class="wrapper">
        <ul>
          <li>
            직접 등록하신 전문가 프로필 정보 및 포트폴리오, 고객 댓글은 전문가 해지 후 복구가
            불가합니다.
          </li>
          <li>전문가 해지 후 재가입 가능합니다.</li>
          <li>
            해지 후 회원님의 정보는 전자상거래 소비자보호법에 의거한 가비아커머스 개인정보처리방침에
            따라 관리됩니다.
          </li>
          <li>
            현재 보유 중인 쿠폰 및 무상지급된 토큰은 모두 자동 소멸되며, 해지 후 재가입하더라도 이미
            소멸되었기 때문에 양도되지 않습니다.
          </li>
          <li>전문가 리뷰는 해지 시 자동 삭제됩니다.</li>
          <li>
            충전 토큰이 있을 경우, 토큰 환불을 통해 정산이 완료된 이후 해지를 신청하셔야 합니다.<br />*
            무상으로 지급된 보상 토큰은 해지와 함께 자동 소멸됩니다.
          </li>
        </ul>
      </div>
    </section>
  </main>
  <Teleport to="body">
    <Transition name="fade">
      <ModalExpertTermination
        v-if="currentConfirmModal === 'termination'"
        :list="selectedConfirmList"
      />
    </Transition>
  </Teleport>
</template>

<script setup>
import ModalExpertTermination from '~/components/modal/confirm.vue'
import { useConfirmModal } from '~/composables/modal/index.js'
import { useExpertTerminate } from '~/composables/expert/terminate.js'
import { useVerification } from '~/composables/expert/verification.js'
const { isValid, termination, reasons, bankList } = useExpertTerminate()
const { currentConfirmModal, openConfirmModal, selectedConfirmList } = useConfirmModal()
const { isVerified, verifyPhoneNumber } = useVerification()

import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 전문가 해지`,
  meta: [
    {
      name: 'description',
      content: `전문가를 해지합니다.`
    },
    {
      property: 'og:title',
      content: `가비아커머스 - 모아, 전문가 해지`
    },
    {
      property: 'og:description',
      content: `전문가를 해지합니다.`
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/expert/terminate`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://moa.gabiacns.com/expert/terminate`
    }
  ]
})
</script>

<template>
  <article class="authentication">
    <div>사업자 정보</div>
    <div v-if="expert.certifyStatus == 9">
      <button class="btn-add" type="button" @click="openModal('businessLicense')">변경하기</button>
      <div>
        <div class="authentication">사업자 인증 완료</div>
        <div class="number">
          <span>{{ businessLicense.number }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <button
        v-if="businessLicense.number"
        class="btn-add"
        type="button"
        @click="openModal('businessLicense')"
      >
        변경하기
      </button>
      <button v-else class="btn-add" type="button" @click="openModal('businessLicense')">
        등록하기
      </button>
      <small>
        사업자등록증 인증이 완료되면 프로필에 사업자인증 마크가 노출되어 신뢰도가 높아집니다.
      </small>
      <div
        v-if="expert.certifyStatus == 1 || (expert.certifyStatus == null && businessLicense.number)"
      >
        <div v-if="expert.certifyStatus == 1" class="authentication">사업자 인증 대기중</div>
        <div class="number">
          <span>{{ businessLicense.number }}</span>
          <!-- <button class="x" /> -->
        </div>
      </div>
    </div>
  </article>
  <Teleport to="body">
    <Transition name="fade">
      <ModalBusiness v-if="currentModal === 'businessLicense'" />
    </Transition>
  </Teleport>
</template>

<script setup>
import ModalBusiness from '~/components/modal/businessLicense.vue'
import { useBusinessLicense } from '~/composables/expert/businessLicense.js'
import { useCustomModal } from '~/composables/modal/index.js'
import { useExpertInformation } from '~/composables/expert/profile.js'
const { businessLicense } = useBusinessLicense()
const { openModal, currentModal } = useCustomModal()
const { expert } = useExpertInformation()
</script>

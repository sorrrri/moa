<template>
  <Transition name="fade">
    <div
      v-if="confirmModal"
      class="modal confirm"
      tabindex="0"
      @keydown.enter="confirmSubmit(list)"
    >
      <div class="dialog">
        <p v-html="confirmMessage" />
        <footer class="buttons">
          <button @click="closeConfirmModal">취소</button>
          <button
            v-if="currentConfirmModal === 'changeUserRoleExpert' && account.expertInfo?.status == 9"
            class="btn-submit"
            @click="confirmSubmit"
          >
            전문가로 전환
          </button>
          <button v-else-if="currentConfirmModal === 'changeUserRoleExpert'" @click="goToIntro">
            전문가 등록하기
          </button>
          <button
            v-else-if="currentConfirmModal === 'changeUserRoleClient' && account.clientSeq"
            class="btn-submit"
            @click="confirmSubmit"
          >
            클라이언트로 전환
          </button>
          <button v-else class="btn-submit" @click="confirmSubmit(list)">확인</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useUserRole } from '~/composables/account.js'
import { useConfirmModal } from '~/composables/modal/index.js'

const { account, goToIntro } = useUserRole()
const { currentConfirmModal, confirmModal, confirmMessage, closeConfirmModal, confirmSubmit } =
  useConfirmModal()
defineProps({
  list: { type: Object, default: () => ({}) }
})
</script>

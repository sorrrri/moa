<template>
  <Modal class="modal-token">
    <header>
      <h3>보상 토큰 충전</h3>
      <p>미수신 견적서에 의한 보상 토큰 충전 내역입니다.</p>
    </header>
    <section>
      <div class="list">
        <h4>충전 내역</h4>
        <ul>
          <li>
            <div>보상</div>
            <div class="token" :class="{ negative: tokenAmount < 0 }">
              {{ formattedTokenAmount }}
            </div>
          </li>
          <li>
            <div>합계</div>
            <div class="blue token">{{ totalAmount }}</div>
          </li>
        </ul>
      </div>
      <p>해당 건 충전이 정상적으로 처리되었습니다.</p>
    </section>
  </Modal>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  list: {
    type: Object,
    required: true
  }
})

const tokenAmount = computed(() => {
  const amount = Math.abs(props.list.chargeToken + (props.list.rewardToken || 0))
  return props.list.type === 'send' ? -amount : amount
})

const totalAmount = computed(() => {
  return tokenAmount.value
})

const formattedTokenAmount = computed(() => {
  return `${tokenAmount.value >= 0 ? '' : '-'}${Math.abs(tokenAmount.value)}`
})
</script>

<template>
  <Modal class="modal-token">
    <header>
      <h3>토큰 충전</h3>
      <p>{{ list.payMethodName }} 충전 내역입니다.</p>
    </header>
    <section>
      <div class="list">
        <h4>충전 내역</h4>
        <ul>
          <li>
            <div>충전</div>
            <div class="token">{{ list.chargeToken }}</div>
          </li>
          <li>
            <div>보상</div>
            <div class="token">{{ list.rewardToken }}</div>
          </li>
          <li>
            <div>합계</div>
            <div class="blue token">{{ list.chargeToken + list.rewardToken }}</div>
          </li>
        </ul>
      </div>
      <div class="list">
        <h4>결제 내역</h4>
        <ul>
          <li>
            <div>결제 금액</div>
            <div v-if="list.totalPrice">{{ formatPrice(list.totalPrice) }} 원</div>
          </li>
          <li>
            <div>결제 일자</div>
            <div>{{ list.payDate }}</div>
          </li>
          <li>
            <div>결제 수단</div>
            <div>{{ list.payMethodName }}</div>
          </li>
        </ul>
      </div>
      <p>해당 건 충전이 정상적으로 처리되었습니다.</p>
    </section>
  </Modal>
</template>

<script setup>
defineProps({
  list: {
    type: Object,
    required: true
  }
})
import { useFormatter } from '~/composables/subs.js'
const { formatPrice } = useFormatter()
</script>

<template>
  <Modal class="modal-token">
    <header>
      <h3>토큰 환불</h3>
      <p>환불 내역입니다.</p>
    </header>
    <section>
      <div class="list">
        <h4>환불 내역</h4>
        <ul>
          <li>
            <div>환불 금액</div>
            <div class="blue price">
              {{ formatPrice(list.totalPrice) }}
            </div>
          </li>
          <li>
            <div>환불 일자</div>
            <div>{{ list.payDate }}</div>
          </li>
          <li>
            <div>환불 수단</div>
            <div>{{ list.payMethodName }}</div>
          </li>
        </ul>
        <ul>
          <li>
            <div>결제 금액</div>
            <div class="price">
              {{ formatPrice(list.totalPrice) }}
            </div>
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
      <div class="list">
        <h4>토큰 관리</h4>
        <ul>
          <li>
            <div>토큰</div>
            <div class="token">{{ list.chargeToken }}</div>
          </li>
          <li>
            <div>보상 토큰</div>
            <div class="token">-{{ list.rewardToken }}</div>
          </li>
        </ul>
      </div>
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

<template>
  <Modal id="tokenUsed" class="modal-token">
    <header>
      <h3>토큰 사용</h3>
      <p>보상 토큰보다 충전 토큰이 먼저 사용됩니다.</p>
    </header>
    <section>
      <div class="list">
        <h4>사용 내역</h4>
        <ul>
          <li>
            <div>사용 일자</div>
            <div>{{ formatted(list.procDate, 'hyphen') }}</div>
          </li>
          <!-- <li>
            <div>클라이언트</div>
            <div>{{ list.estimateItemInfo.estimate.client.userId }}</div>
          </li> -->
          <li>
            <div>제공 서비스</div>
            <div>{{ list.estimateItemInfo.estimate.category.name }}</div>
          </li>
          <li>
            <div>충전 토큰 사용</div>
            <div class="blue token">{{ list.chargeToken }}</div>
          </li>
          <li>
            <div>보상 토큰 사용</div>
            <div class="blue token">{{ list.rewardToken }}</div>
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
const { formatPrice, formatted } = useFormatter()
</script>

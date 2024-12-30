<template>
  <Modal class="modal-token form">
    <header>
      <h3>환불 하기</h3>
    </header>
    <section>
      <div class="list">
        <h4>잔여 토큰</h4>
        <ul>
          <li>
            <div>충전</div>
            <div class="token">{{ tokenTotal.chargeToken }}</div>
          </li>
          <li>
            <div>보상</div>
            <div class="token">{{ tokenTotal.rewardToken }}</div>
          </li>
        </ul>
      </div>
      <div class="list">
        <h4>환불 가능 토큰</h4>
        <ul>
          <li>
            <div>충전</div>
            <div class="token">{{ tokenTotal.chargeToken }}</div>
          </li>
          <li>
            <div>보상 토큰</div>
            <div class="token">-{{ tokenTotal.rewardToken }}</div>
          </li>
        </ul>
      </div>
      <div class="list expected">
        <ul>
          <li>
            <h4>환불 예상 금액</h4>
            <div class="blue price">{{ formatPrice(tokenTotal.chargeToken * 100) }}</div>
          </li>
        </ul>
      </div>
      <div class="refund-account">
        <div class="title">
          <strong>환불 계좌</strong>
          <small>카드 취소가 불가할 경우 입금받을 환불 계좌를 입력해주세요.</small>
        </div>
        <div class="inputs">
          <div class="selectbox">
            <select id="" name="">
              <option value="">환불은행</option>
            </select>
          </div>
          <input type="text" placeholder="환불 계좌 소유판" />
          <input type="text" placeholder="환불 계좌번호" />
        </div>
      </div>
      <ul class="caution">
        <li>
          <div>
            환불은 수동으로 진행되며 담당자가 확인 후 환불 처리됩니다.<br />
            영업일 기준 <strong>3~5일 정도 소요</strong>될 수 있습니다.
          </div>
        </li>
        <li>
          원결제 하신 카드로 취소가 진행되나 카드취소 진행이 불가한 경우 등록하신 계좌로 환불이
          진행됩니다.
        </li>
        <li>보상토큰은 환불되지 않습니다.</li>
      </ul>
    </section>
    <footer>
      <button @click="openModal('tokenRefundDone')">환불하기</button>
    </footer>
  </Modal>
  <!--   <Teleport to="body">
    <Transition name="fade">
      <ModalTokenRefundDone v-if="tokenRefundDone" @close="closeModal('tokenRefundDone')" />
    </Transition>
  </Teleport> -->
</template>

<script setup>
import { useTokens } from '~/composables/expert/token.js'
import { useCustomModal } from '~/composables/modal/index.js'
import { useFormatter } from '~/composables/subs.js'
const { tokenTotal } = useTokens()
const { openModal, closeModal, tokenRefundDone } = useCustomModal()
const { formatPrice } = useFormatter()
</script>

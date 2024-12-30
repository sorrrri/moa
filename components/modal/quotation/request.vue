<template>
  <Modal class="modal-quotation">
    <header>
      <h3>견적요청하기</h3>
      <div class="progress">
        <div class="bar">
          <span :style="`width: ${requestPercent}`" />
        </div>
        <div v-if="requestSkill.askList?.length > 0">
          {{ requestPercent }}
        </div>
        <div v-else class="percent">0</div>
      </div>
    </header>
    <div class="sections">
      <div ref="wrapper" class="wrapper">
        <section
          v-for="(question, index) in requestSkill.askList"
          :key="index"
          :class="{ active: index === count }"
        >
          <h3>{{ question.contents }}</h3>
          <article class="request">
            <ul>
              <li v-for="answer in question.replyList" :key="answer">
                <template v-if="question.type === answer.type">
                  <div
                    v-if="question.type === 'input' && question.replyList.length === 1"
                    :class="`${answer.type}`"
                  >
                    <textarea
                      :id="`check-${answer.seq}`"
                      :name="`request-${index}`"
                      :data-ask="question.contents"
                      :placeholder="answer.contents"
                      rows="15"
                    />
                  </div>
                  <div v-else :class="`${answer.type}`">
                    <input
                      :id="`check-${answer.seq}`"
                      :name="`request-${index}`"
                      :type="answer.type === 'input' ? 'text' : answer.type"
                      :data-ask="question.contents"
                      :data-reply="answer.contents"
                      :placeholder="answer.contents"
                    />
                    <label v-if="answer.type !== 'input'" :for="`check-${answer.seq}`">
                      {{ answer.contents }}
                    </label>
                  </div>
                </template>
                <template v-else>
                  <div class="etc" :class="`${question.type}`">
                    <input
                      :id="`check-${answer.seq}`"
                      :name="`request-${index}`"
                      :type="question.type"
                      :data-ask="question.contents"
                      :data-reply="answer.contents"
                      :placeholder="answer.contents"
                    />
                    <label :for="`check-${answer.seq}`">
                      <input
                        :id="`check-${answer.seq}-inner`"
                        :name="`request-${index}-inner`"
                        type="text"
                        :placeholder="answer.contents"
                      />
                    </label>
                  </div>
                </template>
              </li>
            </ul>
          </article>
        </section>
        <section
          v-if="needsVerification && count > 0"
          class="phone"
          :class="{
            active: count === requestSkill?.askList?.length
          }"
        >
          <h3>
            <span>견적 수신 시 알림을 받을 수 있는</span>
            <span>연락처를 입력해주세요.</span>
          </h3>
          <article class="phone">
            <div class="inputs">
              <h4>휴대전화 번호</h4>
              <div class="input">
                <input
                  v-model="verify.phoneNumber"
                  maxlength="13"
                  type="text"
                  @input="formatPhoneNumber($event)"
                />
                <button
                  :disabled="verify.phoneNumber.length < 12 || verify.status === 'success'"
                  @click="sendVerifyCode"
                >
                  인증요청
                </button>
              </div>
              <div class="input">
                <input v-model="verify.code" type="number" max-length="4" />
                <button
                  :disabled="!verify.code || (verify.status !== 'inProgress' && verify.phoneNumber)"
                  @click="verifySmsCode"
                >
                  인증확인
                </button>
              </div>
            </div>
            <div class="inputs">
              <h4>약관동의 (필수)</h4>
              <div class="checkbox check-all">
                <input id="agreeAll" v-model="checkedAll" type="checkbox" />
                <label for="agreeAll">아래 약관에 모두 동의합니다.</label>
              </div>
              <div v-for="(list, index) in agreement" :key="index" class="checkbox">
                <input
                  :id="`checkAgreement-${index}`"
                  :key="index"
                  v-model="selectList"
                  :value="index"
                  name="checkAgreement"
                  type="checkbox"
                />
                <label :for="`checkAgreement-${index}`">
                  <a :href="list.url" target="_blank">{{ list.title }}</a
                  >에 동의합니다.
                </label>
              </div>
            </div>
          </article>
        </section>
        <section
          class="done"
          :class="{
            active: count === requestSkill?.askList?.length + 1
          }"
        >
          <h3><span class="blue">견적 요청이 완료</span>되었습니다.</h3>
          <div class="inbox">
            <h4>요청하신 내용을 전문가에게 전달 중입니다.</h4>
            <img src="/images/subs/client/inbox.png" alt="" />
          </div>
          <div class="note">
            견적안이 수신되면
            <span class="blue">알림톡</span>
            으로 안내 드립니다.
          </div>
        </section>
      </div>
    </div>

    <footer class="buttons">
      <button v-if="requestSkill?.askList?.length > count" :disabled="count <= 0" @click="prevStep">
        이전
      </button>
      <button
        v-if="requestSkill?.askList?.length > count"
        :disabled="count >= requestSkill?.askList.length"
        @click="nextStep"
      >
        다음
      </button>
      <button
        v-if="needsVerification === true && requestSkill?.askList?.length === count"
        :disabled="verify.status !== 'success' || !checkedAll"
        @click="submitQuoteRequest"
      >
        무료 견적 받기
      </button>
      <button
        v-if="(needsVerification === false && requestSkill?.askList?.length) === count"
        @click.prevent="goClientInbox"
      >
        수신함 가기
      </button>
    </footer>
  </Modal>
</template>

<script setup>
import { useVerification, useSMSVerification } from '~/composables/expert/verification.js'
const { agreement, selectList, checkedAll } = useVerification()
import { useRequestQuotation } from '~/composables/client/quotation.js'
const {
  requestPercent,
  requestSkill,
  count,
  needsVerification,
  wrapper,
  submitQuoteRequest,
  goClientInbox,
  prevStep,
  nextStep
} = useRequestQuotation()
const { verify, sendVerifyCode, verifySmsCode } = useSMSVerification()
import { useFormatter } from '~/composables/subs.js'
const { formatPhoneNumber } = useFormatter()
</script>

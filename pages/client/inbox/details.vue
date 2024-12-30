<template>
  <main class="content-client inbox details">
    <div class="wrapper">
      <header>
        <div>
          <h2>{{ details.category.name }}</h2>
          <div class="request">
            <small
              >요청일
              {{ format(details.registDate, 'yyyy/MM/dd hh:mm:ss a') }}
            </small>
            <router-link to="/client/inbox">
              <button @click.prevent="openModal('myQuotation', details)">내 견적 요청 정보</button>
            </router-link>
          </div>
        </div>
        <button
          v-if="details.status == 0"
          class="btn-stop"
          @click="openConfirmModal('stopQuotations', details)"
        >
          견적 그만받기
        </button>
      </header>
      <h5 :class="quoteStatus(details).className">
        <span class="tag">{{ quoteStatus(details).tag }}</span>
        <strong v-html="quoteStatus(details).message" />
        <small>{{ quoteStatus(details).subMessage }}</small>
      </h5>
      <div class="list">
        <h3>견적 수신함</h3>
        <template v-if="details.estimateItemList.length > 0">
          <ul>
            <li v-for="(list, index) in details.estimateItemList" :key="index">
              <div class="content">
                <div class="image">
                  <img
                    :src="
                      list.expert.profileImage?.filePath
                        ? `${MOA_API_URL}/${list.expert.profileImage.filePath}`
                        : '/images/common/no_thumbnail2.png'
                    "
                    :alt="list.nickName"
                    @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
                  />
                </div>
                <div class="information">
                  <div>
                    <div class="title">
                      <h2>{{ list.expert.nickName ?? '-' }}</h2>
                      <div v-if="list.expert.businessCertify" class="authentication">
                        사업자 인증
                      </div>
                    </div>
                    <div class="score">
                      <span class="stars">
                        <i v-for="star in 5" :key="star" :class="starRating(star, list)" />
                      </span>
                      <small>
                        <strong>
                          {{ list.expert.avgScore ?? 0 }}
                        </strong>
                        / 리뷰 {{ list.expert.reviewCount ?? 0 }}개
                      </small>
                    </div>
                  </div>
                  <small class="date"
                    >답변일시
                    {{
                      list.sendDate === null ? '-' : format(parseISO(list.sendDate), 'yyyy/MM/dd')
                    }}
                  </small>
                </div>
              </div>
              <article>
                <span>견적 금액 : </span>
                <strong>{{ formatCurrency(list.price ?? 0) }}원</strong>
                <small class="responsive"
                  >답변일시
                  {{ list.sendDate === null ? '-' : format(parseISO(list.sendDate), 'yyyy/MM/dd') }}
                </small>

                <small class="date"
                  >견적확인일시
                  {{
                    !list.receiveDate
                      ? '-'
                      : format(parseISO(list.receiveDate), 'yyyy/MM/dd hh:mm:ss a')
                  }}
                </small>
              </article>
              <div v-if="list.expert.status == 9" class="buttons">
                <button
                  v-if="list.sendDate && list.reviewFlag === false"
                  data-modal="addReview"
                  @click="openModal('addReview', list)"
                >
                  리뷰 남기기
                </button>
                <button @click="openNestedModal('quotation', list, index)">확인하기</button>
              </div>
              <small v-else>활동이 중지되었거나 해지한 전문가입니다.</small>
            </li>
          </ul>
        </template>
        <div v-else class="no-content">
          <img src="/images/common/no_content.png" alt="" />
          <p>
            <span>견적서 수신 내역이 없습니다.</span>
          </p>
        </div>
      </div>
      <Teleport to="body">
        <Transition name="fade">
          <ModalAddReview v-if="currentModal === 'addReview'" :list="selectedList" />
        </Transition>
        <Transition name="fade">
          <ModalQuotation v-if="currentNestedModal === 'quotation'" />
        </Transition>
        <Transition name="fade">
          <ModalStopQuotations
            v-if="currentConfirmModal === 'stopQuotations'"
            :list="selectedConfirmList"
          />
        </Transition>
        <Transition name="fade">
          <ModalMyQuotation v-if="currentModal === 'myQuotation'" :list="selectedList" />
        </Transition>
      </Teleport>
    </div>
  </main>
</template>

<script setup>
import ModalStopQuotations from '~/components/modal/confirm.vue'
import ModalAddReview from '~/components/modal/review/add.vue'
import ModalQuotation from '~/components/modal/quotation/main.vue'
import ModalMyQuotation from '~/components/modal/quotation/myQuotation.vue'
import { format, parseISO } from 'date-fns'
import { useClientQuotation } from '~/composables/client/quotation.js'
import { useConfirmModal, useCustomModal } from '~/composables/modal/index.js'
import { useExpertReviews } from '~/composables/expert/reviews.js'
const { starRating } = useExpertReviews()
const { currentConfirmModal, openConfirmModal, selectedConfirmList } = useConfirmModal()
const { MOA_API_URL, openModal, openNestedModal, currentModal, currentNestedModal, selectedList } =
  useCustomModal()
const { details, quoteStatus } = useClientQuotation()
const formatCurrency = (value) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(value)
}
import { useHead } from '@vueuse/head'
useHead({
  title: `가비아커머스 - 모아, 클라이언트 받은 견적 상세`,
  meta: [
    {
      name: 'description',
      content: `내가 요청한 견적 상세입니다.`
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 클라이언트 받은 견적 상세'
    },
    {
      property: 'og:description',
      content: '내가 요청한 견적 상세입니다.'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: `https://moa.gabiacns.com/client/inbox/details/${details.value.seq}`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://moa.gabiacns.com/client/inbox/details/${details.value.seq}`
    }
  ]
})
</script>

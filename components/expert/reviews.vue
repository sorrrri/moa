<template>
  <article v-if="reviewsCount > 0" id="reviews" class="reviews">
    <h3 class="title">총 평점</h3>
    <div class="total score">
      <div>
        <span class="stars">
          <i
            v-for="star in 5"
            :key="star"
            :class="{
              full: star <= Math.floor(Number(expertScore)),
              half: star - 0.5 <= Number(expertScore) && Number(expertScore) <= star
            }"
          />
        </span>
        <h2>{{ expertScore }}</h2>
      </div>
      <small>전체 리뷰 {{ reviewsCount }}건</small>
    </div>
    <ul v-if="reviews.length > 0">
      <li v-for="(list, index) in reviews" :key="list.seq">
        <div>
          <h4>{{ formatAnonymous(list.clientUserId) }}</h4>
          <button
            v-if="account.clientSeq && list.clientSeq === account.clientSeq"
            class="btn-remove"
            @click.prevent="openConfirmModal('removeReview', list)"
          >
            삭제
          </button>
        </div>
        <div class="score">
          <span class="stars">
            <i
              v-for="star in 5"
              :key="star"
              :class="{
                full: star <= Math.floor(Number(list.score)),
                half: star - 0.5 === Math.floor(Number(list.score))
              }"
            />
          </span>
          {{ list.score.toFixed(1) }}
          <small v-if="list.updateDate">{{ formatted(list.updateDate, 'dot') }}</small>
          <small v-else>{{ formatted(list.registDate, 'dot') }}</small>
        </div>
        <div v-if="list.scoreCommentList.length > 0" class="keywords">
          <span v-for="item in list.scoreCommentList" :key="item.seq">{{ item.comment }}</span>
        </div>
        <div
          v-if="list.fileList.length > 0"
          class="thumbnail"
          @click="openModal('reviewImages', list)"
        >
          <img
            :src="thumbnail(list)"
            :alt="`${list.name} 썸내일`"
            @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
          />
          <span v-if="list.fileList.length > 1" class="count">
            {{ list.fileList.length }}
          </span>
        </div>
        <div>
          <p ref="reviewParagraph" :class="{ 'show-all': isExpandedParagraph[index] }">
            {{ list.contents }}
          </p>
          <button
            v-if="isCollapsedParagraph[index]"
            class="expand-content"
            @click.prevent="showAllParagraph(index)"
          >
            더보기
          </button>
          <button
            v-if="isExpandedParagraph[index]"
            class="collapse-content"
            @click.prevent="showPartlyParagraph(index)"
          >
            접기
          </button>
        </div>
      </li>
      <li class="list-more">
        <button v-if="isCollapsed" class="expand-content" @click.prevent="showAll">더보기</button>
        <button v-if="isExpanded" class="collapse-content" @click.prevent="showPartly">접기</button>
      </li>
    </ul>
  </article>
  <Teleport to="body">
    <Transition name="fade">
      <ModalRemoveReview
        v-if="currentConfirmModal === 'removeReview'"
        :list="selectedConfirmList"
      />
    </Transition>
    <Transition name="fade">
      <ModalReviewImages v-if="currentModal === 'reviewImages'" :list="selectedList" />
    </Transition>
  </Teleport>
</template>
<script setup>
import ModalRemoveReview from '~/components/modal/confirm.vue'
import ModalReviewImages from '~/components/modal/review/main.vue'
import { useConfirmModal, useCustomModal } from '~/composables/modal/index.js'
import { useExpertReviews } from '~/composables/expert/reviews.js'
import { useFormatter } from '~/composables/subs.js'
const {
  thumbnail,
  account,
  expertScore,
  reviewsCount,
  reviews,
  isCollapsed,
  isExpanded,
  isCollapsedParagraph,
  isExpandedParagraph,
  reviewParagraph,
  showAll,
  showPartly,
  showAllParagraph,
  showPartlyParagraph
} = useExpertReviews()
const { currentConfirmModal, openConfirmModal, selectedConfirmList } = useConfirmModal()
const { openModal, currentModal, selectedList } = useCustomModal()
const { formatAnonymous, formatted } = useFormatter()
</script>

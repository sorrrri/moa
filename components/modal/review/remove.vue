<template>
  <Transition name="fade">
    <div v-if="removeReview" class="modal confirm">
      <div class="dialog">
        리뷰를 삭제하시겠습니까?<br />
        확인을 누르면 즉시 삭제됩니다.
        <footer class="buttons">
          <button @click="closeModal">취소</button>
          <button class="btn-submit" @click="confirmSubmit(list)">확인</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  list: {
    type: Object,
    required: true
  }
})
import { useExpertReviews } from '~/composables/expert/reviews.js'
const { confirmSubmit } = useExpertReviews()
import { useCustomModal } from '~/composables/modal/index.js'
const { closeModal, removeReview } = useCustomModal()
</script>

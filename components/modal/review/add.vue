<template>
  <Modal class="modal-add-review">
    <section>
      <h3>리뷰 작성</h3>
      <article class="overview">
        <div class="image">
          <img
            :src="selectedExpertThumbnail"
            alt=""
            @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
          />
        </div>
        <div>
          <h5>{{ selectedExpert.nickName }}</h5>
          <p>
            <small v-for="skill in selectedExpert.categoryList" :key="skill">
              {{ skill.categoryName }}
            </small>
          </p>
        </div>
      </article>
      <div class="list">
        <h4>전문가는 어떠셨나요?</h4>
        <div class="review">
          <span class="stars">
            <template v-for="(star, index) in 5" :key="star">
              <input
                :id="`checkStar-${index}`"
                v-model="selectedScore"
                type="radio"
                name="star"
                :value="index + 1"
              />
              <label :for="`checkStar-${index}`">
                <i
                  :class="{ full: index + 1 <= selectedScore }"
                  @click="selectedScore = index + 1"
                />
              </label>
            </template>
          </span>
          <span class="score">{{ selectedScore }}.0</span>
          <span v-if="selectedScore > 4" class="emoji"> 😍 최고에요 </span>
          <span v-else-if="selectedScore > 3" class="emoji"> 😄 좋아요 </span>
          <span v-else-if="selectedScore > 2" class="emoji"> 🙂 보통이에요 </span>
          <span v-else-if="selectedScore > 1" class="emoji"> 😐 그저 그래요 </span>
          <span v-else class="emoji"> 😢 아쉬워요 </span>
        </div>
      </div>
      <div class="list">
        <h4>어떤 점이 좋았나요?</h4>
        <div v-for="list in strengths" :key="list.seq" class="checkbox">
          <input
            :id="`review-${list.seq}`"
            v-model="selectedStrengths"
            type="checkbox"
            :value="list.seq"
          />
          <label :for="`review-${list.seq}`">{{ list.comment }}</label>
        </div>
      </div>
      <div class="list">
        <h4>솔직한 리뷰를 작성해주세요. (선택사항)</h4>
        <small>남겨주신 리뷰는 전문가의 프로필에 공개됩니다.</small>
        <textarea id="" v-model="reviewContent" name="" rows="5" @change="validateContent" />
        <input
          id="reviewImages"
          type="file"
          multiple
          :disabled="reviewImages.length > 9"
          @change="uploadReviewImages($event)"
        />
        <label for="reviewImages">
          사진 추가
          <small>{{ reviewImages ? reviewImages.length : 0 }}/10</small>
        </label>
        <div v-if="reviewImages" class="images">
          <div v-for="(image, index) in reviewImages" :key="image" class="image">
            <img :src="`${MOA_API_URL}/${image?.filePath}`" :alt="`${image?.name} 썸내일`" />
            <button class="btn-remove" @click="removeImage(index)" />
          </div>
        </div>
      </div>
      <div class="caution">
        <small>근거 없는 비방성, 악의적 리뷰는 리뷰 위반 가이드에 따라</small>
        <small>별도의 안내 없이 블라인드 처리될 수 있습니다</small>
      </div>
    </section>
    <footer class="button">
      <button @click="submitAddReview(list.seq)">작성 완료</button>
    </footer>
  </Modal>
</template>

<script setup>
import { useAddExpertReviews } from '~/composables/expert/reviews.js'
const {
  removeImage,
  strengths,
  selectedScore,
  selectedStrengths,
  reviewContent,
  MOA_API_URL,
  selectedExpert,
  selectedExpertThumbnail,
  reviewImages,
  uploadReviewImages,
  submitAddReview
} = useAddExpertReviews()
defineProps({
  list: {
    type: Object,
    required: true
  }
})
</script>

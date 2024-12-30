import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getReviewComments,
  getReviews,
  createReview,
  deleteReview,
  uploadFile
} from '~/api/index.js'

export const useReviewStore = defineStore('review', () => {
  const reviews = ref<any[]>([])
  const reviewComments = ref<any>([])
  const images = ref<any[]>([])

  // 전문가 리뷰 선택사항 조회
  const loadReviewComments = async () => {
    reviewComments.value = await getReviewComments()
  }

  // 전문가 리뷰 조회
  const loadReviews = async (expertSeq: any) => {
    reviews.value = await getReviews(expertSeq)
  }

  // 리뷰 작성
  const addReview = async (data: any) => await createReview(data)

  // 리뷰 삭제
  const removeReview = async (reviewSeq: number, userId: string) => {
    const response = await deleteReview(reviewSeq, userId)
    images.value = []
    await loadReviews(response.expertSeq)
  }

  // 리뷰 이미지 업로드
  const uploadReviewImages = async (formData: FormData) => {
    const response = await uploadFile(formData)
    images.value.push(response)
  }

  return {
    reviews,
    reviewComments,
    images,
    loadReviewComments,
    loadReviews,
    addReview,
    removeReview,
    uploadReviewImages
  }
})

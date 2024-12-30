import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '~/store'

/* =====================================================
   리뷰 보기
===================================================== */
export const useExpertReviews = () => {
  const { accountStore, profileStore, reviewStore } = useStore()
  const route = useRoute()
  const account = computed(() => accountStore.account)
  const reviewList = reviewStore.reviews

  // 썸내일
  const thumbnail = (list) => {
    if (list.fileList && list.fileList.length > 0) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.fileList[0].filePath}`
    }
  }

  // 원본 이미지
  const originalImage = (list) => {
    if (list.filePath) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.filePath}`
    } else {
      return '/images/common/no_thumbnail.png'
    }
  }

  // 리뷰 점수 (소수점 한 자리 수까지만)
  const expertScore = computed(() => {
    return (Math.round(profileStore.expert.avgScore * 10) / 10).toFixed(1)
  })

  // 리뷰 별점 계산
  const starRating = (star, list) => {
    const score = computed(() => {
      // props로 받은 경우와 store에 저장된 두 가지 경우가 있음
      return list ? list.expert.avgScore : Number(expertScore.value)
    })

    // 별점 반 개 처리를 위한 클래스명 생성
    return {
      full: star <= Math.floor(score.value),
      half: star - 0.5 <= score.value && score.value <= star
    }
  }

  // 리뷰 갯수 (숨김 처리한 리뷰 제외)
  const reviewsCount = computed(
    () => reviewStore.reviews?.data?.filter((review) => review.status == 0).length || 0
  )

  //리뷰
  const reviews = computed(() => {
    const filteredReviews = reviewStore.reviews.data?.filter((review) => review.status === 0)

    if (filteredReviews.length > 3) {
      const reversedReviews = filteredReviews.slice().reverse()
      const visibleReviews = reversedReviews.slice(0, initialCount.value)
      return visibleReviews
    } else {
      return filteredReviews.slice().reverse()
    }
  })

  // 리뷰 더보기
  const initialCount = ref(3)
  const isCollapsed = computed(() => {
    return reviewList.length > initialCount.value
  })

  // 더보기 버튼 활성화
  const isExpanded = ref(false)
  const showAll = () => {
    isExpanded.value = true
    initialCount.value = reviewStore.reviews.length
  }

  // 접기 버튼 활성화
  const showPartly = () => {
    isExpanded.value = false
    isCollapsed.value = true
    initialCount.value = 3
  }

  // 리뷰 내용 더보기
  const reviewParagraph = ref([])
  const heights = ref([])
  const isCollapsedParagraph = ref([])
  const isExpandedParagraph = ref([])

  // 프로필 페이지인 경우
  if (route.path.includes('profile')) {
    onMounted(() => {
      if (reviewParagraph.value) {
        reviewParagraph.value.forEach((paragraph, index) => {
          const height = paragraph.getBoundingClientRect().height
          heights.value[index] = height
          if (height > 56) {
            isCollapsedParagraph.value[index] = true
          } else {
            isCollapsedParagraph.value[index] = false
          }
        })
      }
    })
  }

  // 리뷰 내용 더보기 버튼 활성화
  const showAllParagraph = (index) => {
    isExpandedParagraph.value[index] = true
    isCollapsedParagraph.value[index] = false
  }

  // 리뷰 내용 접기 버튼 활성화
  const showPartlyParagraph = (index) => {
    isExpandedParagraph.value[index] = false
    isCollapsedParagraph.value[index] = true
  }

  return {
    starRating,
    thumbnail,
    originalImage,
    account,
    expertScore,
    reviewsCount,
    reviews,
    isCollapsed,
    isExpanded,
    showAll,
    showPartly,
    showAllParagraph,
    showPartlyParagraph,
    isCollapsedParagraph,
    isExpandedParagraph,
    reviewParagraph
  }
}

/* =====================================================
   리뷰 작성
===================================================== */
export const useAddExpertReviews = () => {
  const { accountStore, modalStore, profileStore, reviewStore, quotationStore } = useStore()
  const MOA_API_URL = ref(`${import.meta.env.VITE_MOA_API_URL}`)
  const clientSeq = accountStore.account.clientSeq
  const strengths = computed(() => reviewStore.reviewComments)
  const selectedExpert = computed(() => profileStore.expert)

  // 리뷰 남길 전문가의 썸내일
  const selectedExpertThumbnail = computed(() => {
    return profileStore.expert.profileImage
      ? `${import.meta.env.VITE_MOA_API_URL}/${profileStore.expert.profileImage.filePath}`
      : '/images/common/no_thumbnail.png'
  })

  // 리뷰 내용
  const reviewContent = ref('')
  const selectedStrengths = ref([])
  const selectedScore = ref(5)

  // 리뷰 이미지 첨부
  const reviewImages = computed(() => reviewStore.images)
  const uploadReviewImages = async (event) => {
    const files = event.target.files
    const formData = new FormData()
    const validTypes = ['image/jpeg', 'image/png']
    for (const file of files) {
      if (validTypes.includes(file.type)) {
        formData.append('multipartFile', file)
        await reviewStore.uploadReviewImages(formData)
      } else {
        modalStore.showAlert('이미지 파일만 업로드 가능합니다.')
      }
    }
  }

  // 리뷰 이미지 삭제
  const removeImage = (index) => {
    reviewStore.images.splice(index, 1)
  }

  // 리뷰 작성 완료
  const submitAddReview = async (quoteSeq) => {
    const data = {
      clientSeq: clientSeq,
      expertSeq: profileStore.expert.seq,
      estimateItemSeq: quoteSeq,
      score: selectedScore.value,
      contents: reviewContent.value,
      scoreCommentList: selectedStrengths.value.map((item) => {
        return { scoreCommentSeq: item }
      }),
      fileList: reviewImages.value.map((image) => {
        return { fileSeq: image.seq, filePath: image.filePath }
      })
    }

    const addReview = reviewStore.addReview(data)
    if (addReview === undefined) {
      modalStore.showAlert('리뷰 등록에 실패하였습니다. 견적을 먼저 확인해주세요.')
    } else {
      const userId = accountStore.account.userId
      const quoteListSeq = quotationStore.details.seq
      await quotationStore.loadClientQuoteDetails(quoteListSeq, userId)
      await modalStore.showAlert('리뷰 등록을 완료하였습니다.')

      // 수신함 재조회(견적확인일시 체크)
      quotationStore.loadClientQuoteDetails(quoteListSeq, userId)
    }
    modalStore.hideModal()
  }

  return {
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
  }
}

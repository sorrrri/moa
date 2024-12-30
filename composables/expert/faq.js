import { ref, computed } from 'vue'
import { useStore } from '~/store'

/* =====================================================
   FAQ 보기
===================================================== */
export const useExpertFaq = () => {
  const { profileStore } = useStore()
  const { faqList } = profileStore.expert
  const count = ref(3)

  // FAQ 조회
  const faq = computed(() => {
    return faqList?.length > count.value
      ? faqList.slice().reverse().slice(0, count.value)
      : (faqList.slice().reverse() ?? [])
  })

  // FAQ 답변 열기/닫기
  const activeIndex = ref(null)
  const toggleAnswer = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
  }

  // FAQ 더보기
  const isCollapsed = computed(() => {
    return faqList.length > count.value
  })

  const isExpanded = ref(false)
  const showAll = () => {
    isExpanded.value = true
    count.value = faqList.length
  }

  // 접기 버튼 활성화
  const showPartly = () => {
    isExpanded.value = false
    isCollapsed.value = true
    count.value = 3
  }

  return {
    activeIndex,
    showAll,
    showPartly,
    isExpanded,
    toggleAnswer,
    faq,
    isCollapsed
  }
}

/* =====================================================
   FAQ 수정
===================================================== */
export const useEditExpertFaq = () => {
  const { profileStore } = useStore()
  const faq = computed(() => profileStore.expert.faqList?.slice().reverse() ?? [])

  // FAQ 추가
  const addList = () => {
    const data = {
      questionContents: '',
      answerContents: ''
    }
    profileStore.expert.faqList === null
      ? (profileStore.expert.faqList = [data])
      : profileStore.expert.faqList.push(data)
  }

  // FAQ 삭제
  const removeList = (index) => profileStore.expert.faqList.splice(-index - 1, 1)

  return {
    addList,
    removeList,
    faq
  }
}

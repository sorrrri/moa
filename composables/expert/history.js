import { ref, computed } from 'vue'
import { useStore } from '~/store'

/* =====================================================
   기업연혁 보기
===================================================== */
export const useExpertHistory = () => {
  const { profileStore } = useStore()
  const { historyList } = profileStore.expert
  const count = ref(3)

  // 기업연혁 조회
  const history = computed(() => {
    return historyList?.length > count.value
      ? historyList.slice().reverse().slice(0, count.value)
      : (historyList.slice().reverse() ?? [])
  })

  // 기업연혁 더보기
  const isCollapsed = computed(() => {
    return historyList.length > count.value
  })

  // 더보기 버튼 활성화
  const isExpanded = ref(false)
  const showAll = () => {
    isExpanded.value = true
    count.value = historyList.length
  }

  // 접기 버튼 활성화
  const showPartly = () => {
    isExpanded.value = false
    isCollapsed.value = true
    count.value = 3
  }

  return {
    history,
    showAll,
    showPartly,
    isExpanded,
    isCollapsed
  }
}

/* =====================================================
   기업연혁 수정
===================================================== */
export const useEditExpertHistory = () => {
  const { profileStore } = useStore()
  const history = computed(() => profileStore.expert.historyList?.slice().reverse() ?? [])

  // 기업 연혁 컨텐츠 앞에 bullet 생성
  const blank = (list) => {
    if (!list.historyContents || list.historyContents.trim().length === 0) {
      list.historyContents = '• '
      return true
    }
    return true
  }

  const addBullets = (event) => {
    event.preventDefault()
    const cursorPosition = event.target.selectionStart
    const textBefore = event.target.value.substring(0, cursorPosition)
    const textAfter = event.target.value.substring(cursorPosition)
    const newText = `${textBefore}\n• ${textAfter}`
    event.target.value = newText
    event.target.selectionStart = event.target.selectionEnd = cursorPosition + 3
  }

  // 기업 연혁 입력 관리
  const handleInput = (event) => {
    let newValue = event.target.value
    newValue = newValue.replace(/\D/g, '')
    event.target.value = newValue.substring(0, 4)
  }

  // 기업 연혁 추가
  const addList = () => {
    const data = {
      historyDate: '',
      historyContents: ''
    }
    profileStore.expert.historyList === null
      ? (profileStore.expert.historyList = [data])
      : profileStore.expert.historyList.push(data)
  }

  // 기업 연혁 삭제
  const removeList = (index) => profileStore.expert.historyList.splice(-index - 1, 1)

  return {
    addList,
    removeList,
    history,
    handleInput,
    addBullets,
    blank
  }
}

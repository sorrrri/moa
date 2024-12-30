import { ref, computed } from 'vue'
import { useStore } from '~/store'

/* =====================================================
   자격증 및 인증 내역 보기
===================================================== */
export const useExpertCertification = () => {
  const { profileStore } = useStore()
  const { certificationList } = profileStore.expert
  const count = ref(3)

  // 자격증 및 인증 내역 조회
  const certification = computed(() => {
    return certificationList?.length > count.value
      ? certificationList.slice().reverse().slice(0, count.value)
      : (certificationList.slice().reverse() ?? [])
  })

  // 자격증 및 인증 내역 더보기
  const isCollapsed = computed(() => {
    return certificationList.length > count.value
  })

  // 더보기 버튼 활성화
  const isExpanded = ref(false)
  const showAll = () => {
    isExpanded.value = true
    count.value = certificationList.length
  }

  // 접기 버튼 활성화
  const showPartly = () => {
    isExpanded.value = false
    isCollapsed.value = true
    count.value = 3
  }

  return {
    certification,
    showAll,
    showPartly,
    isExpanded,
    isCollapsed
  }
}

/* =====================================================
   자격증 및 인증 내역 수정
===================================================== */
export const useEditExpertCertification = () => {
  const { profileStore } = useStore()

  // 자격증 및 인증 내역 조회
  const certification = computed(
    () => profileStore.expert.certificationList?.slice().reverse() ?? []
  )

  // 날짜 변환
  const formatDate = (event) => {
    let newValue = event.target.value.replace(/\D/g, '')
    newValue = newValue.substring(0, 8)
    newValue = newValue.replace(/(\d{1,4})(\d{1,2})?(\d{1,2})?/, (match, p1, p2, p3) => {
      let formatted = p1
      if (p2) formatted += '.' + p2
      if (p3) formatted += '.' + p3
      return formatted
    })
    event.target.value = newValue.substring(0, 10)
  }

  // 자격증 및 인증 내역 추가
  const addList = () => {
    const data = {
      certificationName: '',
      authorityName: '',
      certificationStartDate: '',
      certificationEndDate: '',
      sortBy: 1
    }

    profileStore.expert.certificationList === null
      ? (profileStore.expert.certificationList = [data])
      : profileStore.expert.certificationList.push(data)
  }

  // 자격증 및 인증 내역 삭제
  const removeList = (index) => {
    profileStore.expert.certificationList.splice(-index - 1, 1)
  }

  return {
    addList,
    removeList,
    certification,
    formatDate
  }
}

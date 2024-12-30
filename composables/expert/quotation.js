import { ref, reactive, computed, watch } from 'vue'
import { useStore } from '~/store'
import { useRouter } from 'vue-router'
import { useMobile, useFormatter } from '~/composables/subs.js'
const { formatted } = useFormatter()
const { isMobile } = useMobile()

export const useExpertQuotation = () => {
  const { accountStore, quotationStore } = useStore()
  const MOA_API_URL = ref(`${import.meta.env.VITE_MOA_API_URL}`)
  const quotations = computed(() => quotationStore.quotations)
  const isOpened = ref(false)
  const isExpired = (list) => {
    return formatted(new Date(), 'hyphen') > list.estimate.expireDate
  }

  const getStatusText = (quotations) => {
    if (quotations.value?.status == 0) {
      if (quotations.value?.estimateItemList?.length === 0) {
        return {
          tag: '진행중',
          message: '전문가의 답변을 기다리는 중이에요.',
          subMessage: '(최대 일주일까지 전문가의 연락을 수신할 수 있습니다.)'
        }
      } else {
        return {
          tag: '진행중',
          message: `현재 <span>${quotations.value.estimateItemList?.length}명</span>의 전문가가 견적을 제출했어요.`,
          subMessage: '(최대 10개의 견적 수신이 가능해요.)'
        }
      }
    } else if (quotations.value?.status == 1) {
      if (quotations.value.estimateItemList?.length === 0) {
        return {
          tag: '진행 완료',
          message: '견적 요청에 맞는 전문가를 찾지 못했어요.',
          subMessage: '가비아커머스 담당자가 빠른 시일 내에 연락 드려요.'
        }
      } else {
        return {
          tag: '진행 완료',
          message: `<span>${quotations.value.estimateItemList?.length}명</span>의 전문가가 견적 제출을 완료했어요`,
          subMessage: '지금 견적서를 확인해보세요.'
        }
      }
    } else if (quotations.value?.status == 6) {
      if (quotations.value.estimateItemList?.length === 0) {
        return {
          tag: '요청 마감',
          message: '견적 요청이 <strong>마감</strong>되었어요.',
          subMessage: '자유롭게 새로운 견적 요청을 보내 보세요.'
        }
      } else {
        return {
          tag: '요청 마감',
          message: `<span>${quotations.value.estimateItemList?.length}명</span>의 전문가가 견적 제출을 완료했어요.`,
          subMessage: '지금 견적서를 확인해보세요. '
        }
      }
    } else if (quotations.value?.status == 9) {
      return {
        tag: '견적 완료',
        message: `<span>${quotations.value.estimateItemList?.length}명</span>의 전문가가 견적을 제출했어요.`,
        subMessage: '견적 수신이 완료되었어요.'
      }
    }
  }

  const statusText = computed(() => getStatusText(quotations))

  // 견적 요청 셀렉트 박스
  const quoteType = [
    { id: 'normalRequest', value: '0', label: '일반 요청' },
    { id: 'directRequest', value: '1', label: '직접 요청' }
  ]

  // 견적 발송 셀렉트 박스
  const quoteStatus = [
    { id: 'done', value: 'send', label: '견적 완료' },
    { id: 'pending', value: 'not_send', label: '견적 미발송' }
  ]

  // 검색창 뒤에 backdrop 처리
  const toggleBackdrop = () => {
    const main = document.querySelector('main')
    const backdrop = document.querySelector('.backdrop')
    if (backdrop) {
      backdrop && backdrop.remove()
      main.style.zIndex = ''
    } else {
      const backdrop = document.createElement('div')
      backdrop.classList.add('backdrop')
      main.prepend(backdrop)
      main.style.zIndex = 100

      if (typeof window !== 'undefined') {
        backdrop.addEventListener('click', () => {
          isOpened.value = false
          backdrop.remove()
          main.style.zIndex = ''
        })
      }
    }
  }

  // 검색 필터 옵션 기본값
  const options = reactive({
    keywordType: 'clientId',
    keyword: '',
    inEstimateType: [],
    inSendType: [],
    done: false,
    pending: false
  })

  // 견적서 검색
  const searchQuotations = async () => {
    const expertSeq = accountStore.account.expertSeq
    const data = {
      userId: accountStore.account.userId,
      keywordType: options.keywordType,
      keyword: options.keyword,
      inEstimateType: options.inEstimateType,
      inSendType: options.inSendType,
      page: 1,
      size: 10,
      sort: 'registDate,desc'
    }
    quotationStore.loadExpertQuotes(expertSeq, data)
    isOpened.value = false
    isMobile.value && toggleBackdrop()
  }

  // 견적 검색 모달 열기 (모바일 전용)
  const openSearch = () => {
    isOpened.value = true
    quoteType.value = ''
    quoteStatus.value = ''
    toggleBackdrop()
  }

  const breakLines = (answer) => {
    if (Array.isArray(answer)) {
      return answer.join('<br>')
    }
    return answer.replace(/\n/g, '<br>')
  }

  // 게시글이 1일 지났는지 체크하는 함수
  const isLessThanOneDay = (date) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000
    const currentDate = new Date()
    const yourParsedDate = new Date(date)

    return currentDate.getTime() - yourParsedDate.getTime() < oneDayInMilliseconds
  }

  // 설명 json 쪼개는 함수
  const splitDescription = (description) => {
    if (!description) return []

    let parsedData

    try {
      parsedData = JSON.parse(description)
    } catch (error) {
      console.error('Failed to parse JSON:', error)
      return []
    }

    if (Array.isArray(parsedData?.questions)) {
      return parsedData.questions.map(({ question, answer }) => ({ question, answer }))
    }

    return []
  }

  return {
    MOA_API_URL,
    statusText,
    quotations,
    options,
    isOpened,
    isExpired,
    quoteType,
    quoteStatus,
    searchQuotations,
    breakLines,
    openSearch,
    isLessThanOneDay,
    splitDescription
  }
}

export const useResponseQuotation = () => {
  const { accountStore, quotationStore, tokenStore, modalStore } = useStore()
  const quote = computed(() => quotationStore.quote)
  const quotePrice = computed(() => quotationStore.quote.estimate.category.price)

  const hasEnoughTokens = computed(() => {
    return tokenStore.total?.totalToken >= quotePrice.value
  })

  // 회신할 입력값
  const inputs = reactive({
    price: computed({
      get: () => null || quotationStore.quote.price,
      set: (newValue) => (quotationStore.quote.price = newValue)
    }),
    description: computed({
      get: () => null || quotationStore.quote.description,
      set: (newValue) => (quotationStore.quote.description = newValue)
    }),
    favorite: false
  })
  const isValid = computed(() => {
    return inputs.price && inputs.description
  })

  const onlyNumbers = (event) => {
    let newValue = event.target.value
    newValue = newValue.replace(/\D/g, '')
  }

  // 견적 회신할 때 토큰 차감하기
  const chargeDeduct = ref(0) // 차감할 충전 금액
  const rewardDeduct = ref(0) // 차감할 보상 금액
  const totalDeduct = ref(0) // 총 차감할 금액

  // 보상 토큰보다 충전 토큰을 먼저 차감할 수 있도록 계산하기
  const calculate = () => {
    totalDeduct.value = quotationStore.quote.estimate.category.price
    const chargedTokens = tokenStore.total.totalChargeToken

    // 충전 토큰이 차감할 토큰보다 많은 경우
    if (totalDeduct.value <= chargedTokens) {
      chargeDeduct.value = totalDeduct.value
      totalDeduct.value = 0
    } else {
      // 모자란 경우, 있는 만큼 차감 후 보상 토큰 사용
      chargeDeduct.value = chargedTokens
      totalDeduct.value -= chargedTokens
      rewardDeduct.value = totalDeduct.value
    }
  }

  // 토큰 차감하기
  const deductQuoteTokens = () => {
    const data = {
      userId: accountStore.account.userId,
      estimateItemSeq: quotationStore.quote.seq,
      type: 'send',
      chargedToken: -chargeDeduct.value,
      rewardToken: -rewardDeduct.value,
      description: '견적 발송 차감'
    }
    tokenStore.addTokenInfo(data)
  }

  // 받은 요청에 회신하기
  const sendQuoteResponse = async (quoteSeq) => {
    const data = {
      userId: accountStore.account.userId,
      sendFlag: 1,
      price: inputs.price,
      description: inputs.description,
      favorite: inputs.favorite
    }
    await quotationStore.responseQuote(quoteSeq, data)
    await modalStore.showAlert('견적 발송을 완료하였습니다.')
    await quotationStore.loadExpertQuote(quoteSeq, accountStore.account.userId)
    calculate()
    deductQuoteTokens()
  }

  return {
    isValid,
    quote,
    inputs,
    onlyNumbers,
    hasEnoughTokens,
    sendQuoteResponse
  }
}

export const useFavoriteQuoteForm = () => {
  const { accountStore, quotationStore, modalStore } = useStore()
  const favoriteQuotes = computed(() => quotationStore.favoriteQuotes)

  // 활성 폼 전환처리
  let activeFormIndex = ref(null)

  const toggleForm = (index) => {
    if (activeFormIndex.value !== index) {
      activeFormIndex.value = index
    } else {
      activeFormIndex.value = null
    }
  }

  const submitEditForm = async (list) => {
    const data = {
      userId: accountStore.account.userId,
      ...list
    }
    await quotationStore.editFavoriteForm(list.seq, data)
    await modalStore.showAlert('견적서 수정을 완료하였습니다.')
    activeFormIndex.value = null
  }

  return {
    activeFormIndex,
    toggleForm,
    favoriteQuotes,
    submitEditForm
  }
}

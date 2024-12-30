import { ref, computed } from 'vue'
import { useStore } from '~/store'
import { useRoute, useRouter } from 'vue-router'
import { useCustomModal } from '~/composables/modal/index.js'

export const useClientQuotation = () => {
  const {
    accountStore,
    modalStore,
    quotationStore,
    profileStore,
    wishlistStore,
    reviewStore,
    portfolioStore
  } = useStore()
  const total = computed(() => quotationStore.total)
  const selectedSkills = ref()
  const selectedExpert = computed(() => profileStore.expert)
  const activeProfile = computed(() => quotationStore.quotationIndex)
  const quote = computed(() => quotationStore.quote)
  const quotations = computed(() => quotationStore.quotations)
  const userId = accountStore.account.userId

  // 전문가 정보 불러오기
  const getExpertData = async (list, data, quoteListSeq) => {
    await Promise.all([
      // 견적서 순서 체크 & 조회
      quotationStore.loadClientQuote(list.seq, userId),

      // 전문가 정보 조회
      wishlistStore.loadFavoriteExpert(data),
      reviewStore.loadReviews(data.expertSeq),
      reviewStore.loadReviewComments(),
      portfolioStore.loadPortfolios(data.expertSeq),
      profileStore.loadExpertInfo(data.expertSeq),

      // 수신함 재조회(견적확인일시 체크)
      quotationStore.loadClientQuoteDetails(quoteListSeq, userId)
    ])
  }

  // 견적 확인 모달에서 도착한 견적 중 하나 선택하기
  const setActiveProfile = async (index, list) => {
    // 동일한 견적서를 클릭한 경우
    if (activeProfile.value === index) {
      activeProfile.value = null
      return
    }

    // 견적서를 보낸 전문가가 활동중인 경우
    if (list.expert.status == 9) {
      try {
        const quoteListSeq = quotationStore.details.seq
        const clientSeq = accountStore.account.clientSeq
        const expertSeq = list.expert.seq
        const data = { clientSeq, expertSeq }
        await getExpertData(list, data, quoteListSeq)
        quotationStore.quotationIndex = index
      } catch (error) {
        modalStore.showAlert('견적서를 보낸 전문가의 정보를 불러오는 중에 오류가 발생하였습니다.')
      }
    } else {
      modalStore.showAlert('활동이 중지되었거나 해지한 전문가입니다.')
    }
  }

  const details = computed(() => quotationStore.details)
  const quoteStatus = (list) => {
    if (list.status == 0) {
      if (list.estimateItemList?.length > 0) {
        return {
          tag: '진행중',
          className: 'active',
          message: `현재 <strong>${list.estimateItemList?.length}명</strong>의 전문가가 견적을 제출했어요.`,
          subMessage: '최대 10개의 견적 수신이 가능해요.'
        }
      } else {
        return {
          tag: '진행중',
          className: 'active',
          message: '전문가의 견적서를 기다리는 중이에요.',
          subMessage: '최대 일주일까지 전문가의 견적서를 수신할 수 있어요.'
        }
      }
    } else if (list.status == 1) {
      if (list.estimateItemList?.length > 0) {
        return {
          tag: '진행 완료',
          className: 'closed',
          message: `<strong>${list.estimateItemList?.length}명</strong>의 전문가가 견적 제출을 완료했어요.`,
          subMessage: '지금 견적서를 확인해보세요.'
        }
      } else {
        return {
          tag: '진행 완료',
          className: 'closed',
          message: '견적 요청에 맞는 전문가를 찾지 못했어요.',
          subMessage: '가비아커머스 담당자가 빠른 시일 내에 연락 드려요.'
        }
      }
    } else if (list.status == 6) {
      if (list.estimateItemList.length > 0) {
        return {
          tag: '요청 마감',
          className: 'stopped',
          message: `<strong>${list.estimateItemList?.length}명</strong>의 전문가가 견적 제출을 완료했어요.`,
          subMessage: '지금 견적서를 확인해보세요.'
        }
      } else {
        return {
          tag: '요청 마감',
          className: 'stopped',
          message: '견적 요청이 <strong>마감</strong>되었어요.',
          subMessage: '자유롭게 새로운 견적 요청을 보내 보세요.'
        }
      }
    } else if (list.status == 9) {
      return {
        tag: '견적 완료',
        className: 'finished',
        message: `<strong>${list.estimateItemList?.length}명</strong>의 전문가가 견적을 제출했어요.`,
        subMessage: '견적 수신이 완료되었어요.'
      }
    }
  }

  const thumbnail = (list) => {
    if (list.expert.profileImage?.filePath) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.expert.profileImage.filePath}`
    } else {
      return '/images/common/no_thumbnail.png'
    }
  }

  const page = ref(1)
  const fetchPage = (index) => {
    const clientSeq = accountStore.account.clientSeq
    const data = {
      userId: accountStore.account.userId,
      page: index,
      size: 9,
      sort: 'seq,desc'
    }
    quotationStore.loadClientQuotes(clientSeq, data)
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  const handlePageChange = (newPage) => {
    page.value = newPage
    window.scrollTo(0, 0)
    fetchPage(newPage)
  }

  return {
    thumbnail,
    total,
    quote,
    details,
    quotations,
    selectedExpert,
    selectedSkills,
    activeProfile,
    quoteStatus,
    handlePageChange,
    setActiveProfile
  }
}

export const useRequestQuotation = () => {
  const { modalStore, quotationStore, accountStore, verificationStore } = useStore()
  const route = useRoute()
  const router = useRouter()
  const count = ref(0)
  const requestSkill = computed(() => quotationStore.requestSkill)

  const requestQuote = async (list) => {
    const { openModal } = useCustomModal()
    if (accountStore.account.receivedData) {
      if (
        accountStore.account.clientInfo ||
        (accountStore.account.expertInfo && !accountStore.account.clientInfo) ||
        (!accountStore.account.expertInfo && !accountStore.account.clientInfo)
      ) {
        await openModal('requestQuote', list)
      }
    } else {
      await accountStore.login()
    }
  }

  // 휴대폰 검증 필요 유무
  const needsVerification = computed(() => {
    const client = accountStore.account.clientInfo
    // 클라이언트 정보가 없는 경우
    return [null, undefined].includes(client) || ['R', null].includes(client.phoneCertifyDate)
  })

  // 견적 요청 답변 완성률
  const requestPercent = computed(() => {
    const total = quotationStore.requestSkill?.askList?.length + (needsVerification.value ? 1 : 0)
    return `${Math.round((count.value / total) * 100)}%`
  })

  const wrapper = ref()
  const description = ref()

  const getAllInputs = () => {
    const sections = [...wrapper.value.getElementsByTagName('section')].filter(
      (section) => !section.classList.contains('phone')
    )
    let allResponses = new Map()

    for (const section of sections) {
      const askItem = section.querySelector('h3').textContent
      const inputs = section.querySelectorAll('input, textarea')

      for (const input of inputs) {
        const inputKey = `${askItem}`

        if (input.type === 'radio' && input.checked) {
          const label = input.nextElementSibling
          if (label?.tagName === 'LABEL') {
            const nestedInput = label.querySelector('input[type="text"], textarea')
            if (nestedInput && nestedInput.value.trim()) {
              allResponses.set(inputKey, nestedInput.value.trim())
            } else {
              allResponses.set(inputKey, input.dataset.reply || '')
            }
          } else {
            allResponses.set(inputKey, input.dataset.reply || '')
          }
        } else if (input.type === 'checkbox' && input.checked) {
          if (!allResponses.has(inputKey)) {
            allResponses.set(inputKey, [])
          }
          const label = input.nextElementSibling
          if (label && label.tagName === 'LABEL') {
            const nestedInput = label.querySelector('input[type="text"], textarea')
            if (nestedInput && nestedInput.value.trim()) {
              allResponses.get(inputKey).push(nestedInput.value.trim())
            } else {
              allResponses.get(inputKey).push(input.dataset.reply || '')
            }
          } else {
            allResponses.get(inputKey).push(input.dataset.reply || '')
          }
        } else if (
          (input.type === 'text' || input.tagName.toLowerCase() === 'textarea') &&
          !input.closest('label') &&
          input.value.trim()
        ) {
          allResponses.set(inputKey, input.value.trim())
        }
      }
    }

    return formatResponses(allResponses)
  }

  const formatResponses = (responses) => {
    let formattedResponses = {
      questions: []
    }

    for (const [askItem, values] of responses) {
      let questionObj = {
        question: askItem,
        answer: values
      }

      formattedResponses.questions.push(questionObj)
    }

    return JSON.stringify(formattedResponses, null, 2)
  }

  // 모달 내에 값 입력 여부 확인
  const validationInput = () => {
    const activeSection = document.querySelector('section.active')

    if (activeSection) {
      const inputs = activeSection.querySelectorAll('input, textarea')
      let radios = {}
      let checkboxes = {}
      let hasTextInput = false
      let allTextInputsFilled = true
      let hasRadioOrCheckbox = false
      let radioWithTextInput = {}
      let checkboxWithTextInput = {}

      for (let input of inputs) {
        const inputType = input.type

        if (
          inputType === 'text' ||
          inputType === 'input' ||
          input.tagName.toLowerCase() === 'textarea'
        ) {
          if (!input.closest('label')) {
            hasTextInput = true
            if (input.value.trim() === '') {
              allTextInputsFilled = false
            }
          }
        }

        if (inputType === 'radio') {
          hasRadioOrCheckbox = true
          if (!radios[input.name]) {
            radios[input.name] = false
            radioWithTextInput[input.name] = false
          }
          if (input.checked) {
            radios[input.name] = true
            const label = input.nextElementSibling
            if (label && label.tagName === 'LABEL') {
              const nestedInput = label.querySelector('input[type="text"], textarea')
              if (nestedInput) {
                radioWithTextInput[input.name] = true
                if (nestedInput.value.trim() === '') {
                  allTextInputsFilled = false
                }
              }
            }
          }
          if (allTextInputsFilled === false) {
            return allTextInputsFilled
          }
        }

        if (inputType === 'checkbox') {
          hasRadioOrCheckbox = true
          if (!checkboxes[input.name]) {
            checkboxes[input.name] = false
            checkboxWithTextInput[input.name] = false
          }
          if (input.checked) {
            checkboxes[input.name] = true
            const label = input.nextElementSibling
            if (label && label.tagName === 'LABEL') {
              const nestedInput = label.querySelector('input[type="text"], textarea')
              if (nestedInput) {
                checkboxWithTextInput[input.name] = true
                if (nestedInput.value.trim() === '') {
                  allTextInputsFilled = false
                }
              }
            }
          }
          if (allTextInputsFilled === false) {
            return allTextInputsFilled
          }
        }
      }

      // 라디오 버튼/체크박스만 있는 경우
      if (hasRadioOrCheckbox && !hasTextInput) {
        for (let key in radios) {
          if (!radios[key]) {
            return false
          }
        }
        for (let key in checkboxes) {
          if (!checkboxes[key]) {
            return false
          }
        }
        return true
      }

      // 라디오 버튼/체크박스와 input/textarea가 혼합된 경우
      if (hasRadioOrCheckbox && (hasTextInput || Object.values(radioWithTextInput).some(Boolean))) {
        let isValid = true
        for (let key in radios) {
          if (!radios[key]) {
            isValid = false
            break
          }
          if (radioWithTextInput[key] && !allTextInputsFilled) {
            isValid = false
            break
          }
        }
        for (let key in checkboxes) {
          if (!checkboxes[key]) {
            isValid = false
            break
          }
        }
        return isValid && allTextInputsFilled
      }

      // input/textarea만 있는 경우
      if (!hasRadioOrCheckbox && hasTextInput) {
        return allTextInputsFilled
      }
    }

    return false
  }

  // 클라이언트 검증
  const updateClientInformation = async () => {
    const data = {
      userId: accountStore.account.userId,
      phoneNumber: verificationStore.phoneNumber,
      certifyStatus: '9'
    }

    // 클라이언트 등록이 되어 있지 않은 경우
    if (!accountStore.account.clientSeq) {
      await accountStore.registerClient(data)
    }

    await accountStore.updateClientInfo({
      seq: accountStore.account.clientInfo.seq,
      ...data
    })
  }

  // 견적서 생성
  const createQuote = async () => {
    const data = {
      userId: accountStore.account.userId,
      clientSeq: accountStore.account.clientInfo.seq,
      categorySeq: quotationStore.requestSkill.seq,
      type: route.params.seq == null ? '0' : '1',
      expertSeq: route.params.seq ?? null,
      description: description.value
    }
    await quotationStore.requestQuote(data)
  }

  const goClientInbox = () => {
    document.body.style.overflow = ''
    accountStore.account.lastLoginType = 'client'
    router.push('/client/inbox')
    modalStore.custom = false
    modalStore.currentCustom = ''
  }

  // 견적 요청하기
  const submitQuoteRequest = async () => {
    await updateClientInformation()
    await createQuote()
  }

  const prevStep = () => {
    const sections = document.querySelector('.sections .wrapper').querySelectorAll('section')
    sections[count.value].classList.remove('active')
    count.value--
    const wrapper = document.querySelector('.modal-quotation .wrapper')
    sections[count.value].classList.add('active')

    window.innerWidth <= 640
      ? (wrapper.style.transform = count.value === 0 ? '' : `translateX(-${100 * count.value}vw)`)
      : (wrapper.style.transform = count.value === 0 ? '' : `translateX(-${540 * count.value}px)`)
  }

  const nextStep = async () => {
    const isValid = validationInput()

    if (!isValid) {
      modalStore.showAlert('답변 완료 후 다음 단계로 이동합니다.')
      return false
    }
    const sections = document.querySelectorAll('.modal-quotation .sections section')
    sections[count.value].classList.remove('active')
    count.value++
    const wrapper = document.querySelector('.modal-quotation .wrapper')
    sections[count.value].classList.add('active')

    if (requestSkill.value?.askList?.length === count.value) {
      description.value = getAllInputs()
      // 클라이언트로 등록되어 있는 경우 견적 발송
      if (
        accountStore.account.clientInfo &&
        accountStore.account.clientInfo.certifyStatus !== 'R'
      ) {
        createQuote()
      }
    }

    // 반응형 컴포넌트 로직
    window.innerWidth <= 640
      ? (wrapper.style.transform = count.value === 0 ? '' : `translateX(-${100 * count.value}vw)`)
      : (wrapper.style.transform = count.value === 0 ? '' : `translateX(-${540 * count.value}px)`)
  }

  return {
    requestQuote,
    requestSkill,
    count,
    needsVerification,
    wrapper,
    getAllInputs,
    formatResponses,
    submitQuoteRequest,
    goClientInbox,
    prevStep,
    nextStep,
    requestPercent
  }
}

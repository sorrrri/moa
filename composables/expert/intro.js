import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '~/store'

export const useExpertIntro = () => {
  const { accountStore, profileStore } = useStore()
  const route = useRoute()
  const expertSeq = accountStore.account.expertSeq

  // 내 프로필을 보는 경우 견적요청 및 찜 버튼 숨김처리
  const client = computed(() => {
    if (accountStore.account.lastLoginType == 'client' && expertSeq != route.params.seq) {
      return true
    } else {
      return false
    }
  })

  const expertTitle = computed(() => profileStore.expert.nickName ?? '')
  const expertDescription = computed(() => profileStore.expert.introContents ?? '')
  const expertThumbnail = computed(() => {
    return profileStore.expert.profileImage
      ? `${import.meta.env.VITE_MOA_API_URL}/${profileStore.expert.profileImage.filePath}`
      : '/images/common/no_thumbnail.png'
  })

  // 기업 소개 더보기
  const description = ref(null)
  const height = ref(0)
  const isCollapsed = ref(false)
  const isExpanded = ref(false)

  onMounted(() => {
    if (description.value) {
      height.value = description.value.getBoundingClientRect().height
      height.value > 80 && (isCollapsed.value = true)
    }
  })

  // 더보기 버튼 활성화
  const showAllDescription = () => {
    isExpanded.value = true
    isCollapsed.value = false
  }

  // 접기 버튼 활성화
  const showPartlyDescription = () => {
    isExpanded.value = false
    isCollapsed.value = true
  }

  return {
    client,
    description,
    expertTitle,
    expertDescription,
    expertThumbnail,
    isExpanded,
    isCollapsed,
    showAllDescription,
    showPartlyDescription
  }
}

export const useEditExpertIntro = () => {
  const { modalStore, profileStore } = useStore()

  const expertTitle = computed({
    get: () => profileStore.expert.nickName ?? '',
    set: (newValue) => (profileStore.expert.nickName = newValue)
  })
  const expertDescription = computed({
    get: () => profileStore.expert.introContents ?? '',
    set: (newValue) => (profileStore.expert.introContents = newValue)
  })

  const expertThumbnail = computed(() => {
    return profileStore.expert.profileImage
      ? `${import.meta.env.VITE_MOA_API_URL}/${profileStore.expert.profileImage.filePath}`
      : '/images/common/no_thumbnail.png'
  })

  // Input 입력 관리
  const handleInputTitle = (event) => {
    let newValue = event.target.value
  }

  // 프로필 이미지 변경
  const uploadExpertThumbnail = (event) => {
    const file = event.target.files[0]
    const validTypes = ['image/jpeg', 'image/png']
    if (validTypes.includes(file.type)) {
      const formData = new FormData()
      formData.append('multipartFile', file)
      profileStore.updateExpertProfileImage(formData)
    } else {
      modalStore.showAlert('이미지 파일만 업로드 가능합니다.')
    }
  }

  return {
    expertTitle,
    expertDescription,
    handleInputTitle,
    expertThumbnail,
    uploadExpertThumbnail
  }
}

export const useExpertRegister = () => {
  const { accountStore } = useStore()
  const route = useRoute()
  const router = useRouter()

  // FAQ 답변 열기/닫기
  const activeIndex = ref(null)
  const toggleAnswer = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
  }

  const FAQ = [
    {
      question: '전문가 등록 시 비용이 발생하나요?',
      answer:
        '전문가 등록은 무료로 제공됩니다. 다만 클라이언트에게 견적을 발송할 때 토큰이 필요합니다.'
    },
    {
      question: '개인사업자도 이용할 수 있을까요?',
      answer:
        '네, 개인사업자도 이용 가능합니다. 개인사업자 등록번호만 있으면 누구나 서비스를 이용하실 수 있습니다.'
    },
    {
      question: '토큰 충전은 어떻게 하나요?',
      answer:
        '토큰 충전은 토큰 관리 페이지에서 쉽게 하실 수 있습니다. 충전 버튼을 눌러 필요한 만큼의 토큰을 충전하세요. 다양한 결제 수단을 통해 편리하게 충전 가능합니다.'
    }
  ]

  const goToRegister = () => {
    if (!accountStore.account.userId) {
      return accountStore.login()
    }
    router.push(`/expert/register`)
  }

  return {
    FAQ,
    activeIndex,
    toggleAnswer,
    goToRegister
  }
}

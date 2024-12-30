import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '~/store'

export const usePopularExpert = () => {
  const { profileStore } = useStore()
  const popularExperts = computed(() => profileStore.popularExperts)

  const thumbnail = (list) => {
    if (list.profileImage?.filePath) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.profileImage.filePath}`
    } else {
      return '/images/common/no_thumbnail.png'
    }
  }

  return {
    popularExperts,
    thumbnail
  }
}

export const useExpertInformation = () => {
  const {
    accountStore,
    modalStore,
    profileStore,
    portfolioStore,
    tokenStore,
    businessLicenseStore
  } = useStore()
  const MOA_API_URL = ref(`${import.meta.env.VITE_MOA_API_URL}`)
  const router = useRouter()
  const expert = computed(() => profileStore.expert)

  // 내 프로필관리 바로가기
  const goToEditProfile = () => {
    const data = {
      userId: accountStore.account.userId,
      lastLoginType: 'expert'
    }
    accountStore.changeUserRoleAction(data)
    router.push('/expert/edit')
  }

  // 내 프로필 바로가기
  const goToMyProfile = () => {
    const url = router.resolve({
      name: 'expertProfile',
      params: { seq: accountStore.account.expertSeq }
    }).href
    window.open(url, '_blank')
  }

  // 프로필 완성도 계산
  const profileProgress = computed(() => {
    return Math.min(profileStore.profileProgress, 100)
  })
  const fields = [
    profileStore.expert.profileImage,
    profileStore.expert.nickName,
    profileStore.expert.introContents,
    profileStore.expert.categoryList?.length > 0,
    profileStore.expert.historyList?.length > 0,
    profileStore.expert.certificationList?.length > 0,
    portfolioStore.portfolios?.length > 0,
    profileStore.expert.faqList?.length > 0
  ]
  const count = ref(fields.filter(Boolean).length)
  const percent = ref(Math.round((count.value * 100) / 8))
  profileStore.profileProgress = percent.value

  // 프로필 관리
  const updateExpertProfile = async () => {
    // 프로필 데이터
    const getProfileData = () => {
      const data = {
        seq: accountStore.account.expertSeq,
        userId: accountStore.account.userId,
        status: 9,
        nickName: profileStore.expert.nickName,
        introContents: profileStore.expert.introContents,
        historyList: profileStore.expert.historyList,
        certificationList: profileStore.expert.certificationList,
        categoryList: profileStore.expert.categoryList,
        faqList: profileStore.expert.faqList
      }

      // 프로필 이미지가 있으면 추가
      if (profileStore.expert.profileImage) {
        data.profileImageSeq = profileStore.expert.profileImage.seq
      }

      // 사업자 정보가 있으면 추가
      if (businessLicenseStore.number.length > 0) {
        data.businessNumber = businessLicenseStore.number
        data.businessFileSeq = businessLicenseStore.image.seq
        data.certifyStatus = 1
      }

      return data
    }

    // 유효성 검사
    const validateProfile = () => {
      const caution = document.querySelector('.caution')
      if (caution) {
        modalStore.showAlert(caution.textContent)
        return false
      }

      if (!profileStore.expert.nickName) {
        modalStore.showAlert('기업명을 작성해주세요.')
        return false
      }

      return true
    }

    // 프로필 완성도 계산
    const calculateProfileCompletion = () => {
      const profileFields = [
        profileStore.expert?.profileImage,
        profileStore.expert.nickName,
        profileStore.expert.introContents,
        profileStore.expert.categoryList?.length > 0,
        portfolioStore.portfolios?.length > 0,
        profileStore.expert.historyList?.length > 0,
        profileStore.expert.certificationList?.length > 0,
        profileStore.expert.faqList?.length > 0
      ]
      const count = ref(profileFields.filter(Boolean).length)
      return Math.round((count.value * 100) / 8)
    }

    // 프로필 저장
    if (!validateProfile()) return false
    const data = getProfileData()
    profileStore.updateExpertProfileAction(data)
    const percent = ref(calculateProfileCompletion())
    profileStore.profileProgress = percent.value
    count.value = 0

    // 프로필 완성 시, 보상금 지급
    const rewardProfileToken = () => {
      const data = {
        userId: accountStore.account.userId,
        type: 'profile',
        rewardToken: 35,
        description: '프로필 완성 보상금'
      }
      tokenStore.addTokenInfo(data)
    }

    // 프로필 완성!
    if (profileStore.expert.profileRewardToken === false && percent.value === 100) {
      modalStore.showAlert('축하드립니다🥳<br>프로필 작성을 완료하여 35토큰을 지급해드렸습니다.')
      profileStore.loadExpertInfo(accountStore.account.expertSeq)
      rewardProfileToken()
    } else {
      modalStore.showAlert('프로필 저장이 완료되었습니다.')
    }
  }
  return {
    MOA_API_URL,
    expert,
    updateExpertProfile,
    profileProgress,
    goToEditProfile,
    goToMyProfile
  }
}

// 전문가 프로필 보기 탭메뉴
export const useExpertInformationTabs = () => {
  const route = useRoute()
  const activeIndex = ref(0)
  const { profileStore, portfolioStore, reviewStore } = useStore()
  const tabs = ref([
    { name: 'intro', title: '소개', show: true },
    {
      name: 'portfolio',
      title: '포트폴리오',
      show: portfolioStore.portfolios?.length > 0 ? true : false
    },
    {
      name: 'reviews',
      title: '리뷰',
      show: !route.path.includes('edit') && reviewStore.reviews.data?.length > 0 ? true : false
    },
    { name: 'faq', title: 'FAQ', show: profileStore.expert?.faqList?.length > 0 ? true : false }
  ])

  if (route.path.includes('profile')) {
    tabs.value = tabs.value.filter((tab) => tab.show)
  }

  const scrollToAnchor = (tab, index, paddingTop) => {
    activeIndex.value = index

    // 탭 활성화
    const targetElement = document.getElementById(tab.name)
    const getScrollOptions = (element, additionalOffset = 0) => ({
      top:
        tab.name === 'intro'
          ? 0
          : targetElement?.getBoundingClientRect().top + additionalOffset - paddingTop,
      behavior: 'smooth'
    })

    // 모달인 경우에는 모달 내에서 스크롤 이동
    const modal = document.querySelector('.modal')
    if (typeof window !== 'undefined') {
      if (modal) {
        const main = modal.querySelector('main')
        if (main) {
          main.scrollTo(getScrollOptions(main, main.scrollTop))
        }
      } else {
        window.scrollTo(getScrollOptions(window, window.scrollY))
      }
    }
  }

  return {
    scrollToAnchor,
    activeIndex,
    tabs
  }
}

import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '~/store'

export const useCategoryPage = () => {
  const MOA_API_URL = ref(`${import.meta.env.VITE_MOA_API_URL}`)
  const { categoryStore } = useStore()
  const categories = computed(() => {
    return categoryStore.mainCategories.slice().sort((a, b) => a.seq - b.seq)
  })
  const category = computed(() => {
    return categoryStore.singleCategory
  })

  // 썸내일
  const thumbnail = (list) => {
    if (list.filePath) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.filePath}`
    }
  }

  return { thumbnail, MOA_API_URL, category, categories }
}

export const useSelectExpertSkills = () => {
  const { accountStore, modalStore, categoryStore, profileStore, verificationStore } = useStore()
  const route = useRoute()
  const selectedSkills = ref([])
  const expertRegister = ref(false)
  const activeIndex = ref(null)
  const activeIndex2 = ref(null)
  const showSecondary = ref(false)
  const showTertiary = ref(false)
  const expertSkills = computed(() => profileStore.expert.categoryList ?? [])
  categoryStore.loadMainCategories({ degree: 1, status: 'open' })

  const setActive = (index) => {
    if (activeIndex.value === index) {
      activeIndex.value = null
      showSecondary.value = false
    } else {
      activeIndex.value = index
      showSecondary.value = true
    }
  }
  const setActive2 = (index) => {
    if (activeIndex2.value === index) {
      activeIndex2.value = null
      showTertiary.value = false
    } else {
      activeIndex2.value = index
      showTertiary.value = true
    }
  }
  if (route.name === 'expertRegister') {
    expertRegister.value = true
  }

  const primaryCategories = computed(() =>
    categoryStore.mainCategories.filter((category) => category.degree === 1)
  )

  // 전문가 스킬 선택 초기화
  const initialize = (event) => {
    const modal = event.target.closest('.modal')
    modal.classList.remove('is-active')
    const activeMenus = modal.querySelectorAll('.is-active')
    activeMenus.forEach((menu) => {
      menu.classList.remove('is-active')
    })
    const checkboxes = modal.querySelectorAll("input[type='checkbox']")
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })
    showSecondary.value = false
    showTertiary.value = false

    // 선택된 체크박스 초기화
    selectedSkills.value = []
  }

  // 전문가 스킬 업데이트
  const updateExpertSkills = (event) => {
    const data = selectedSkills.value.map((item, index) => {
      return { categoryName: item.categoryName, categorySeq: item.value, sortBy: index + 1 }
    })

    // 카테고리 중복 등록불가
    const currentCategorySeqs = expertSkills.value.map((skill) => skill.categorySeq)
    const filteredData = data.filter((item) => !currentCategorySeqs.includes(item.categorySeq))
    expertSkills.value.push(...filteredData)
    initialize(event)
    modalStore.hideModal()
  }

  // 전문가 스킬 삭제
  const removeList = (index) => {
    if (profileStore.expert.categoryList.length > 1) {
      profileStore.expert.categoryList.splice(index, 1)
    } else {
      modalStore.showAlert('최소 1개 이상의 전문 분야를 선택합니다.')
    }
  }
  const submitRegisterExpert = async () => {
    // 전문가 등록
    const request = {
      user_id: accountStore.account.userId,
      data: {
        phoneNumber: verificationStore.phoneNumber,
        categoryList: selectedSkills.value.map((item, index) => {
          return { categorySeq: item.value, sortBy: index + 1 }
        })
      },
      payment: {
        pg_company: 'lgu',
        pg_id: 'gabiacns_exp',
        source: 'moa'
      },
      serviceList: [
        {
          auto_pay_seq: 0,
          promotion_seq: 0,
          shop_seq: 0,
          service_seq: 0,
          service_code: 'EXPERT',
          goods_code: 'EP_SPCL',
          spec_code: 'BS',
          regist_type: 'period_regist',
          regist_value: 1,
          domain: '',
          main_domain: '',
          reseller_id: ''
        }
      ]
    }
    await verificationStore.registerExpert({ request })
  }

  return {
    showSecondary,
    showTertiary,
    activeIndex,
    activeIndex2,
    setActive,
    setActive2,
    expertRegister,
    selectedSkills,
    primaryCategories,
    updateExpertSkills,
    removeList,
    expertSkills,
    submitRegisterExpert
  }
}

export const useExpertSkills = () => {
  const { profileStore, categoryStore } = useStore()
  const expertSkills = computed(() => profileStore.expert.categoryList ?? [])
  const popularSkills = computed(() => {
    return categoryStore.popularSkills
  })
  return { expertSkills, popularSkills }
}

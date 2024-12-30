import { ref, watch, computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '~/store'
import { handleConfirmAction } from '~/composables/modal/confirm.js'

export const useSearchTerms = () => {
  const searchTerm = ref('')
  const route = useRoute()
  const router = useRouter()
  const suggestedSkills = ref([])
  const searchPage = ref(false)
  const { accountStore, modalStore, categoryStore } = useStore()

  route.path === '/search' && (searchPage.value = true)
  const popularKeywords = computed(() => categoryStore.expertSkills)

  const fetchCategoryList = () => {
    const data = {
      degree: 3,
      withTagList: true
    }
    categoryStore.loadCategories(data)
  }

  let typingTimer = null
  const typingDelay = 300
  const isComposing = ref(false)

  const handleCompositionStart = async (event) => {
    // 로그인 안한 경우
    if (!accountStore.account.userId) {
      await modalStore.showConfirm('login')
      handleConfirmAction(event, false)
      return
    }

    // 전문가 상태인 경우
    if (accountStore.account.lastLoginType == 'expert') {
      await modalStore.showConfirm('changeUserRoleClient')
      handleConfirmAction(event, false)
      return
    }

    await categoryStore.getExpertSkills({ degree: 3, status: 'open' })
    searchTerm.value = event.data
    isComposing.value = true
  }

  const handleCompositionUpdate = (event) => {
    searchTerm.value = event.data
  }

  const handleCompositionEnd = () => {
    isComposing.value = false
    clearTimeout(typingTimer)

    typingTimer = setTimeout(() => {}, typingDelay)
  }

  // 서브헤더 검색 제안 기능
  watch(searchTerm, (newSearchTerm) => {
    if (newSearchTerm == '') {
      suggestedSkills.value = []
    } else {
      suggestedSkills.value = categoryStore.categories.filter((list) => {
        const matchesName = list.name.includes(newSearchTerm)
        const matchesTag =
          list.tagList && list.tagList.some((tag) => tag.name.includes(newSearchTerm))
        return matchesName || matchesTag
      })
    }
  })

  // 검색창 외 영역 클릭시 제안창 닫기
  const search = ref(null)
  const suggestion = ref(null)
  const handleClickOutside = (event) => {
    if (
      search.value &&
      !search.value.contains(event.target) &&
      suggestion.value &&
      !suggestion.value.contains(event.target)
    ) {
      suggestedSkills.value = [] // 빈 배열로 설정하여 숨기기
      searchTerm.value = ''
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', handleClickOutside)
    }
  })

  // route 변경 시 제안창 제거
  router.beforeEach((to, from, next) => {
    suggestedSkills.value = false
    searchTerm.value = ''
    next()
  })

  // 원하는 카테고리로 이동
  const categoryLink = (seq) => ({
    name: 'category',
    params: { seq: seq }
  })

  // 최근 검색어
  const storedHistory = typeof window !== 'undefined' ? localStorage.getItem('searchHistory') : null
  const searchHistory = ref(storedHistory ? JSON.parse(storedHistory).reverse() : [])

  const addSearchTerm = (term) => {
    if (term && !searchHistory.value.includes(term)) {
      searchHistory.value.unshift(term)      
      if (typeof window !== 'undefined') {
        localStorage.setItem('searchHistory', JSON.stringify([...searchHistory.value].reverse()))
      }
    }
  }

  // 최근 검색어로 저장
  const saveSearchTerm = () => {
    addSearchTerm(searchTerm.value)
    searchTerm.value = ''
  }

  // 최근 검색어 삭제
  const removeTerm = (term) => {
    searchHistory.value = searchHistory.value.filter((t) => t !== term)
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchHistory', JSON.stringify([...searchHistory.value].reverse()))
    }
  }
  watchEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchHistory', JSON.stringify([...searchHistory.value].reverse()))
    }
  })

  // 클릭한 검색어 반영
  const inputSearchTerm = (term) => {
    searchTerm.value = term
  }

  return {
    popularKeywords,
    searchPage,
    search,
    suggestion,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
    fetchCategoryList,
    searchTerm,
    addSearchTerm,
    suggestedSkills,
    categoryLink,
    searchHistory,
    saveSearchTerm,
    removeTerm,
    inputSearchTerm
  }
}

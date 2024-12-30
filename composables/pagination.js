import { ref, computed } from 'vue'
import { useStore } from '~/store'
import { useRoute } from 'vue-router'

export const usePagination = (title) => {
  const { accountStore, tokenStore, quotationStore, wishlistStore } = useStore()
  const route = useRoute()
  const expertSeq = accountStore.account.expertSeq
  const clientSeq = accountStore.account.clientSeq
  const currentPage = ref(1)
  const selectedYear = ref(2024)
  const perPage = ref(10)
  const pages = ref([])
  const total = computed(() => {
    if (route.path.includes('inbox')) {
      return quotationStore.total || 0
    }

    if (route.path.includes('token')) {
      return tokenStore.details?.total || 0
    }

    if (route.path.includes('wishlist')) {
      return wishlistStore.total || 0
    }

    return 0 // 기본값을 반환
  })

  const totalPages = computed(() => {
    if (total.value && perPage.value) {
      return Math.ceil(total.value / perPage.value)
    }
    return 0
  })

  // 노출되는 페이지 구현
  const displayedPages = computed(() => {
    const range = 2
    let startPage = Math.max(1, currentPage.value - range)
    let endPage = Math.min(totalPages.value, currentPage.value + range)

    if (endPage - startPage < range * 2) {
      if (currentPage.value <= range) {
        endPage = Math.min(totalPages.value, startPage + range * 2)
      } else if (currentPage.value > totalPages.value - range) {
        startPage = Math.max(1, endPage - range * 2)
      }
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  })

  // 페이지 숫자를 눌렀을 때 해당 페이지로 이동
  const fetchPage = async (index) => {
    const data = {
      page: currentPage.value,
      size: perPage.value
    }
    switch (title) {
      case 'clientInbox':
        data.userId = accountStore.account.userId
        data.sort = 'seq,desc'
        await quotationStore.loadClientQuotes(clientSeq, data)
        break

      case 'expertInbox':
        data.userId = accountStore.account.userId
        data.sort = 'seq,desc'
        await quotationStore.loadExpertQuotes(expertSeq, data)
        break

      case 'token':
        data.userId = accountStore.account.userId
        data.yearDate = selectedYear.value
        data.sort = 'seq,desc'
        await tokenStore.loadTokenInfo(data)
        break

      case 'wishlist':
        data.clientSeq = clientSeq
        await wishlistStore.loadFavoriteExperts(data)
        break

      default:
        break
    }
    currentPage.value = index
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  switch (title) {
    case 'clientInbox':
      perPage.value = 9
      break

    case 'expertInbox':
      perPage.value = 10
      break

    case 'token':
      perPage.value = 12
      const tokenInfo = computed(() => tokenStore.details.data)

      // 최근 연도
      const latestYear = computed(() => {
        if (tokenInfo.value > 0 && tokenInfo.value !== undefined) {
          return ref(tokenInfo.value[0].procDate.substring(0, 4))
        } else {
          return new Date().getFullYear()
        }
      })
      // 가장 오래된 연도
      const earliestYear = computed(() => {
        if (tokenInfo.value > 0 && tokenInfo.value !== undefined) {
          return ref(tokenInfo.value[tokenInfo.value.length - 1].procDate.substring(0, 4))
        } else {
          return new Date().getFullYear()
        }
      })
      // 연도 조회
      const years = ref([])
      for (let year = earliestYear.value; year <= latestYear.value; year++) {
        years.value.push(year)
      }
      selectedYear.value = years.value[0]

      // 토큰내역 기본 세팅
      if (tokenStore.details.length > 0) {
        pages.value = [...Array(totalPages.value)].map((_, i) => `${1 + i}`)
      }
      break

    case 'wishlist':
      perPage.value = 10
      break

    default:
      break
  }

  const goToFirstPage = () => {
    currentPage.value = 1
    fetchPage(1)
  }
  const goToPrevPage = () => {
    currentPage.value -= 1
    fetchPage(parseInt(currentPage.value))
  }
  const goToNextPage = () => {
    currentPage.value += 1
    fetchPage(parseInt(currentPage.value))
  }
  const goToLastPage = () => {
    currentPage.value = totalPages.value
    fetchPage(totalPages.value)
  }
  const goToPage = (page) => {
    currentPage.value = page
    fetchPage(parseInt(page))
  }

  return {
    perPage,
    currentPage,
    totalPages,
    pages,
    total,
    displayedPages,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    goToPage
  }
}

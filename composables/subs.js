import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '~/store'

export const useMobile = () => {
  const isMobile = ref(false)

  // 모바일 체크
  const detectMobileDevice = () => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isMobileScreen = window.innerWidth <= 960
  
      isMobile.value = isMobileUserAgent || isMobileScreen

      detectMobileDevice()
      window.addEventListener('resize', detectMobileDevice)
    }
  }


  return { isMobile }
}

export const useSubMenus = () => {
  const router = useRouter()
  const after = ref(false)
  const notification = ref(false)
  const subNotiMenus = ref(false)
  const subUserMenus = ref(false)
  const changeExpert = ref(false)
  const asideMenus = ref(false)
  const subMenus = ref(false)

  router.beforeEach(() => {
    subNotiMenus.value = false
    subUserMenus.value = false
  })

  const showSubs = () => {
    subMenus.value = true
  }

  const hideSubs = () => {
    subMenus.value = false
  }

  const toggleAsideMenus = () => {
    asideMenus.value = !asideMenus.value
    const header = document.querySelector('.header')
    const aside = document.querySelector('.subs')

    if (asideMenus.value) {
      const handler = aside.querySelector('.close')
      aside.classList.add('is-active')
      const backdrop = document.createElement('div')
      backdrop.classList.add('backdrop')
      header.appendChild(backdrop)

      if (typeof window !== 'undefined') {
        handler.addEventListener('click', () => {
          aside.classList.remove('is-active')
          backdrop.remove()
        })
      }
    }

    // menus
    const navigation = document.querySelector('.links nav')
    const subs = document.querySelector('.subs')

    if (typeof window !== 'undefined') {
    navigation &&
      navigation.addEventListener('mouseover', () => {
        subs.classList.add('is-active')
      })
    }

    subs &&
      subs.addEventListener('mouseleave', () => {
        subs.classList.remove('is-active')
      })

    if (matchMedia('screen and (max-width: 960px)').matches) {

      if (typeof window !== 'undefined') {
        const menus = document.querySelectorAll('header .subs menu')
        menus.forEach((menu) => {
          menu.addEventListener('click', (event) => {
            event.target.closest('li').classList.toggle('is-active')
          })
        })
      }
    }
  }

  return {
    after,
    notification,
    subNotiMenus,
    subUserMenus,
    changeExpert,
    asideMenus,
    showSubs,
    hideSubs,
    subMenus,
    toggleAsideMenus
  }
}

export const useSubMenusTabs = () => {
  const activeIndex = ref(0)
  const handleChangeTab = (index) => {
    activeIndex.value = index
  }
  const tabs = ref([
    { name: 'information', title: '거래 알림', count: 2 },
    { name: 'portfolio', title: '가비아커머스 알림' },
    { name: 'reviews', title: '설정' }
  ])

  return {
    activeIndex,
    handleChangeTab,
    tabs
  }
}

export const useChangeSubHeaderUI = () => {
  const route = useRoute()
  const scrollY = ref(0)

  const debounce = (func, wait) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  const updateScroll = debounce(() => {
    scrollY.value = window.scrollY

    const subHeader = document.querySelector('.header-sub')
    if (subHeader) {
      if (window.scrollY > 73) {
        subHeader.classList.add('scrolled')
      } else {
        subHeader.classList.remove('scrolled')
      }
    }
  }, 0)

  onMounted(() => {
    if (typeof window !== 'undefined') {
      scrollY.value = window.scrollY
      window.addEventListener('scroll', updateScroll)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', updateScroll)
    }
  })

  // 메인페이지, 카테고리메인 페이지의 경우 서브헤더 UI 인터랙션
  const changeSubHeaderUI = computed(() => {
    if (route.path === '/') {
      return scrollY.value < 740
    } else if (route.path.includes('category')) {
      return scrollY.value < 560
    }
    return false
  })

  return { changeSubHeaderUI }
}

export const useFormatter = () => {
  // 익명의 이름
  const formatAnonymous = (name) => {
    const hiddenPart = name.slice(1).replace(/./g, '*')
    return name.charAt(0) + hiddenPart
  }

  // 가격
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 휴대폰 번호
  const formatPhoneNumber = (event) => {
    const rawValue = event.target.value.replace(/\D/g, '').substring(0, 11)
    const formattedValue = rawValue.replace(/(\d{2,3})(\d{3,4})(\d{0,4})$/, (match, p1, p2, p3) => {
      return `${p1}${p2 ? '-' + p2 : ''}${p3 ? '-' + p3 : ''}`
    })
    console.log(event.target.value)
    event.target.value = formattedValue
  }

  // 날짜
  const formats = {
    hyphen: (date) =>
      `${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:${date.second} ${date.ampm}`,
    slash: (date) =>
      `${date.year}/${date.month}/${date.day} ${date.hour}:${date.minute}:${date.second} ${date.ampm}`,
    dot: (date) => `${date.year}.${date.month}.${date.day}`
  }

  const formatted = (dateString, type) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1 + '').padStart(2, '0')
    const day = (date.getDate() + '').padStart(2, '0')
    let hour = (date.getHours() + '').padStart(2, '0')
    const minute = (date.getMinutes() + '').padStart(2, '0')
    const second = (date.getSeconds() + '').padStart(2, '0')
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour ? hour : 12
    hour = (hour + '').padStart(2, '0')

    if (formats[type]) {
      return formats[type]({ year, month, day, hour, minute, second, ampm })
    }
  }

  return { formatAnonymous, formatPrice, formatPhoneNumber, formatted }
}

export const useActiveMenu = () => {
  const { accountStore } = useStore()
  const route = useRoute()
  const router = useRouter()
  const isLoggedIn = computed(() => accountStore.account.userId)
  const activeMenu = ref(route.path)

  watch(route, (newRoute) => {
    activeMenu.value = newRoute.path
  })

  const setActiveMenu = (path) => {
    if (!accountStore.account.userId) {
      return accountStore.login(path)
    }
    activeMenu.value = path
    router.push(path)
  }

  const isActive = (path) => {
    return activeMenu.value === path
  }

  const currentAccountType = computed(() => {
    return accountStore.account.lastLoginType
  })

  return { setActiveMenu, isActive, isLoggedIn, currentAccountType }
}

export const useDropdown = () => {
  const dropdown = ref(false)
  const handleDropdown = () => {
    dropdown.value = !dropdown.value
  }

  return { dropdown, handleDropdown }
}

export const useLoader = () => {
  const { loaderStore } = useStore()
  const isLoading = computed(() => loaderStore.isLoading)
  return { isLoading }
}

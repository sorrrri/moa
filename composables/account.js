import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '~/store'

export const useAccount = () => {
  const { accountStore } = useStore()
  const account = computed(() => accountStore.account)

  const submitLogin = async () => {
    await accountStore.login()
  }
  const submitLogout = async () => {
    accountStore.account = null
    await accountStore.logout()
  }

  return {
    account,
    submitLogin,
    submitLogout
  }
}

export const useUserRole = () => {
  const { modalStore, accountStore } = useStore()
  const router = useRouter()
  const account = computed(() => accountStore.account)
  const isExpert = computed(
    () =>
      accountStore.account.lastLoginType === 'expert' &&
      accountStore.account.expertInfo?.status == 9
  )
  const isNotExpert = computed(
    () => !accountStore.account.expertInfo || accountStore.account.expertInfo?.status == 'R'
  )
  const isClient = computed(
    () => accountStore.account.lastLoginType === 'client' && accountStore.account.clientInfo != null
  )

  const goToIntro = () => {
    router.push(`/intro`)
  }

  const changeUserRole = () => {
    const data = {
      userId: accountStore.account.userId,
      lastLoginType: accountStore.account.lastLoginType
    }

    const showAlertAndDispatch = (message, role) => {
      modalStore.showAlert(message)
      if (role) {
        accountStore.account.lastLoginType = role
        data.lastLoginType = role
        accountStore.changeUserRoleAction(data)
        router.push('/')
      }
      setTimeout(() => {
        modalStore.hideAlert()
      }, 1500)
    }

    if (isExpert.value) {
      if (accountStore.account.clientInfo) {
        showAlertAndDispatch('클라이언트로 전환하였습니다.', 'client')
      } else {
        showAlertAndDispatch('검색창을 통해 견적을 보내시면 클라이언트로 전환이 가능합니다.')
      }
    } else if (isClient.value) {
      if (accountStore.account.expertInfo) {
        showAlertAndDispatch('전문가로 전환하였습니다.', 'expert')
      } else {
        router.push('/intro')
      }
    }
  }

  return {
    goToIntro,
    account,
    isExpert,
    isNotExpert,
    isClient,
    changeUserRole
  }
}

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStore } from '~/store'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { createClient, editClient, editAccountType, getAccountInfo } from '~/api/index.js'
import { getLoginData, getLogoutData, getAccountData } from '~/api/account.js'
import { terminateExpert } from '~/api/verification.js'

export const useAccountStore = defineStore('account', () => {
  const { loaderStore, modalStore } = useStore()
  const router = useRouter()
  const route = useRoute()
  const account = ref<any>({})
  const userRole = ref<any>({})

  const login = async (path: string) => {
    const response = await getLoginData()
    const currentPath = path ?? route.path
    window.location.href = `${response}${currentPath}`
  }

  const logout = async () => {
    const response = await getLogoutData()
    window.location.href = response
  }

  // 회원 유형 전환
  const changeUserRoleAction = async (data: any) => {
    const response = await editAccountType(data)
    userRole.value = response
    account.value.lastLoginType = response.lastLoginType
    if (response.lastLoginType === 'client' && route.path.includes('expert')) {
      return router.push('/')
    }

    if (response.lastLoginType === 'expert' && route.path.includes('client')) {
      return router.push('/')
    }
  }

  // 회원 정보 조회
  const loadAccountInfo = async () => {
    const receivedData = await getAccountData()
    if (receivedData?.user_id) {
      const data = {
        userId: receivedData.user_id,
        withClientInfo: true,
        withExpertInfo: true
      }
      const response = await getAccountInfo(data)

      // 전문가 상태가 없는 경우에는 클라이언트로 전환
      if (response?.lastLoginType === 'expert') {
        if (response.client && !response.expert) {
          response.lastLoginType = 'client'
        } else if (!response.client && !response.expert) {
          response.lastLoginType = 'expert'
        }
      } else if (response && !response.lastLoginType) {
        response.lastLoginType = ''
      }

      account.value = {
        ...response,
        username: receivedData?.user_name,
        receivedData: {
          ...receivedData
        }
      }
    }
  }

  // 클라이언트 등록
  const registerClient = async (data: any) => {
    const response = await createClient(data)
    account.value.clientInfo = response
  }

  // 클라이언트 정보 수정
  const updateClientInfo = async (data: any) => {
    const response = await editClient(data)
    account.value.clientInfo = response
  }

  // 전문가 해지
  const terminateExpertInfo = async (data: any) => {
    try {
      loaderStore.setLoading(true)
      router.push('/')
      return await terminateExpert(data)
    } catch (error) {
      modalStore.showAlert('해지 처리에 실패했습니다.')
    } finally {
      loaderStore.setLoading(false)
    }
  }

  return {
    account,
    userRole,
    registerClient,
    updateClientInfo,
    login,
    logout,
    changeUserRoleAction,
    loadAccountInfo,
    terminateExpertInfo
  }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStore } from '~/store'
import { useRouter } from 'vue-router'
import {
  createVerifyForm,
  createExpert,
  requestVerifyCode,
  responseVerifyCodeResult
} from '~/api/verification.js'

export const useVerificationStore = defineStore('verification', () => {
  const status = ref<boolean>(false)
  const phoneNumber = ref<string>('010-0000-0000')
  const { loaderStore, modalStore } = useStore()
  const router = useRouter()

  const verifyForm = async (data: any) => {
    return await createVerifyForm(data)
  }

  // 검증용 SMS 코드 발송 (스토어에 담을 것 없지만 추후 관리를 위해 넣어둠)
  const sendVerifyCode = async (data: any) => {
    return await requestVerifyCode(data)
  }

  // SMS로 받은 검증코드 입력결과 받기 (스토어에 담을 것 없지만 추후 관리를 위해 넣어둠)
  const verifySmsCode = async (data: any) => {
    return await responseVerifyCodeResult(data)
  }

  const registerExpert = async (data: any) => {
    try {
      loaderStore.setLoading(true)
      router.push('/expert/register/done')
      return await createExpert(data)
    } catch (error) {
      modalStore.showAlert('전문가 등록에 실패했습니다.')
      return false
    } finally {
      loaderStore.setLoading(false)
      status.value = false
      phoneNumber.value = ''
    }
  }

  return {
    status,
    phoneNumber,
    verifyForm,
    sendVerifyCode,
    verifySmsCode,
    registerExpert
  }
})

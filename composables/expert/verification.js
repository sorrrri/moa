import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '~/store'

export const useVerification = () => {
  const router = useRouter()
  const isVerified = ref(false)
  const { verificationStore } = useStore()

  // 본인 인증 팝업 띄우기
  const openVerificationPopup = async (type) => {
    const certifyParams = reactive({
      return_url: 'termination',
      param1: new Date().toLocaleString(),
      param2: ''
    })

    // 사용자 정의 인자값 변경 함수
    const setVerifyParams = (field, value) => {
      if (field in certifyParams) {
        certifyParams[field] = value
      }
    }

    // 사용자 정의 인자값 추출 함수
    const getVerifyParams = (field) => {
      return field ? certifyParams[field] : certifyParams
    }

    // 인증 파라미터 가져오기
    const params = getVerifyParams('')
    params['cert_type'] = type

    // form에 입력값 추가하기
    const appendInputsToForm = (form, data) => {
      for (const key in data) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = data[key]
        form.appendChild(input)
      }
    }

    try {
      console.log(params)
      const response = await verificationStore.verifyForm(params)
      if (response) {
        // 폼 생성하고, 본인 인증 팝업 띄우기
        const verifyForm = document.createElement('form')
        verifyForm.setAttribute('target', 'verifyPopup')
        verifyForm.setAttribute(
          'action',
          'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb'
        )
        document.body.appendChild(verifyForm)
        window.open(
          '',
          'verifyPopup',
          'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no'
        )
        appendInputsToForm(verifyForm, response.data)
        verifyForm.submit()
        // MutationObserver 생성
        const verified = document.querySelector("input[name='verified']")
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.target.value == 'true') {
              isVerified.value = true
            }
          })
        })
        observer.observe(verified, { attributes: true })
      } else {
        alert('본인 인증 정보를 불러오지 못했습니다.')
      }
    } catch (error) {
      console.error('인증 요청 중 오류 발생:', error)
      alert('본인 인증 요청에 실패했습니다.')
    }
  }

  const verifyPhoneNumber = () => {
    openVerificationPopup('hp')
  }

  // 동의하기 체크
  const selectList = ref([])
  const agreement = ref([
    { title: '서비스 이용 약관', url: 'https://www.gabiacns.com/policy', value: 0 },
    { title: '개인정보 수집 및 이용', url: 'https://company.gabiacns.com/privacyAll', value: 1 }
  ])

  const checkedAll = computed({
    get: () => agreement.value.length === selectList.value.length,
    set: (newValue) =>
      (selectList.value = newValue ? agreement.value.map((list) => list.value) : [])
  })

  // 뒤로가기
  const goBack = () => {
    router.back()
    isVerified.value = false
  }

  // 다음 단계로 넘어가기
  const goToNextPage = () => {
    router.push('/expert/register/skills')
  }

  return {
    goBack,
    agreement,
    isVerified,
    selectList,
    checkedAll,
    verifyPhoneNumber,
    goToNextPage
  }
}

export const useSMSVerification = () => {
  const { modalStore, verificationStore } = useStore()
  const verify = reactive({
    phoneNumber: '',
    status: 'pending',
    code: ''
  })

  // SMS로 인증번호 전송
  const sendVerifyCode = async () => {
    const data = {
      phone_number: verify.phoneNumber
    }
    const response = await verificationStore.sendVerifyCode(data)

    if (response.results === 'ok') {
      modalStore.showAlert('메세지가 발송되었습니다.')
      verify.status = 'inProgress'
    } else {
      modalStore.showAlert(response.error)
    }
  }

  // 인증번호 확인
  const verifySmsCode = async () => {
    const data = {
      auth_number: verify.code
    }
    const response = await verificationStore.verifySmsCode(data)

    if (response.results === 'ok') {
      modalStore.showAlert('인증번호가 일치합니다.')
      verificationStore.phoneNumber = verify.phoneNumber
      verify.status = 'success'
    } else {
      modalStore.showAlert(response.error)
    }
  }

  return {
    verify,
    sendVerifyCode,
    verifySmsCode
  }
}

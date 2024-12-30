import { computed, reactive } from 'vue'
import { useStore } from '~/store'
/* =====================================================
   사업자 등록 정보 관리
===================================================== */
export const useBusinessLicense = () => {
  const { modalStore, businessLicenseStore, profileStore } = useStore()
  const businessLicense = reactive({
    number: computed({
      get: () => {
        return businessLicenseStore.number || profileStore.expert.businessNumber || ''
      },
      set: (newValue) => (businessLicenseStore.number = newValue)
    }),
    image: computed(() => {
      if (businessLicenseStore.image?.filePath) {
        return `${import.meta.env.VITE_MOA_API_URL}/${businessLicenseStore.image.filePath}`
      }
      return ''
    })
  })

  // 사업자 등록 번호 변환
  const formatNumber = (event) => {
    const rawValue = event.target.value.replace(/\D/g, '').substring(0, 10)
    const formattedValue = rawValue.replace(/(\d{1,3})(\d{0,2})(\d{0,5})/, (match, p1, p2, p3) => {
      return `${p1}${p2 ? '-' + p2 : ''}${p3 ? '-' + p3 : ''}`
    })
    event.target.value = formattedValue
  }

  // 사업자 등록 정보 이미지 추가
  const uploadBusinessLicenseImage = (event) => {
    const file = event.target.files[0]
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
    if (validTypes.includes(file.type)) {
      const formData = new FormData()
      formData.append('multipartFile', file)
      businessLicenseStore.uploadBusinessLicenseImage(formData)
    } else {
      modalStore.showAlert('이미지 또는 PDF 파일만 업로드 가능합니다.')
    }
  }

  // 사업자 등록증 등록하기
  const isValid = computed(() => {
    return businessLicense.number.length === 12 && businessLicenseStore.image
  })
  const updateBusinessLicense = () => {
    businessLicenseStore.number = businessLicense.number
    modalStore.hideModal()
  }

  return {
    isValid,
    formatNumber,
    businessLicense,
    uploadBusinessLicenseImage,
    updateBusinessLicense
  }
}

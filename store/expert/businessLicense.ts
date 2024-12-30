import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uploadFile } from '~/api/index.js'

export const useBusinessLicenseStore = defineStore('businessLicense', () => {
  const number = ref<string>('')
  const image = ref<any>(null)
  const expertBusinessLicense = ref<any>(null)

  // 사업자 등록증 이미지 업로드
  const uploadBusinessLicenseImage = async (formData: FormData) => {
    image.value = await uploadFile(formData)
  }

  return {
    number,
    image,
    expertBusinessLicense,
    uploadBusinessLicenseImage
  }
})

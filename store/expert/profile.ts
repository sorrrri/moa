import { ref } from 'vue'
import { useStore } from '~/store'
import { defineStore } from 'pinia'
import {
  createExpert,
  getExpert,
  getPopularExperts,
  updateExpertInformation,
  uploadFile
} from '~/api/index.js'

export const useProfileStore = defineStore('profile', () => {
  const expert = ref<any>({})
  const profileImage = ref<any>('')
  const profileProgress = ref<string>('')
  const popularExperts = ref<any[]>([])
  const { loaderStore, modalStore } = useStore()

  // 인기 전문가
  const loadPopularExperts = async () => {
    const data = {
      status: '9',
      sort: 'avgScore,desc',
      page: 1,
      size: 5,
      dateType: 'registDate'
    }
    const response = await getPopularExperts(data)
    popularExperts.value = response.data
  }

  // 전문가 조회
  const loadExpertInfo = async (expertSeq: number) => {
    await loaderStore.setLoading(true)
    expert.value = await getExpert(expertSeq)
    await loaderStore.setLoading(false)
  }

  // 전문가 프로필 업데이트
  const updateExpertProfileAction = async (data: any) => {
    try {
      expert.value = await updateExpertInformation(data)
    } catch {
      modalStore.showAlert('프로필 수정 중 오류가 발생하였습니다.')
    }
  }

  // 전문가 프로필 이미지 업데이트
  const updateExpertProfileImage = async (formData: FormData) => {
    if (expert.value) {
      expert.value.profileImage = await uploadFile(formData)
    }
  }

  return {
    expert,
    popularExperts,
    profileImage,
    profileProgress,
    loadExpertInfo,
    loadPopularExperts,
    updateExpertProfileAction,
    updateExpertProfileImage
  }
})

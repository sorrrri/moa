import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getPortfolio,
  getPortfolios,
  createPortfolio,
  modifyPortfolio,
  deletePortfolio,
  reorderPortfolio,
  uploadFile
} from '~/api/index.js'
import { useStore } from '~/store'

export const usePortfolioStore = defineStore('portfolio', () => {
  const { modalStore } = useStore()
  const details = ref<any | null>(null)
  const portfolios = ref<any[]>([])
  const images = ref<any[]>([])

  // 단일 포트폴리오 조회
  const loadPortfolio = async (portfolioSeq: number) => {
    const response = await getPortfolio(portfolioSeq)
    details.value = response
    return response
  }

  // 전문가의 포트폴리오 조회
  const loadPortfolios = async (expertSeq: number) => {
    const data = { expertSeq: expertSeq }
    const response = await getPortfolios(data)
    portfolios.value = response.data ?? []
  }

  // 포트폴리오 등록
  const addPortfolio = async (expertSeq: number, data: any) => {
    modalStore.showAlert('포트폴리오가 등록되었습니다.')
    details.value = await createPortfolio(data)
    loadPortfolios(expertSeq)
  }

  // 포트폴리오 수정
  const editPortfolioAction = async (portfolioSeq: number, data: any, expertSeq: number) => {
    await modifyPortfolio(portfolioSeq, data)
    modalStore.showAlert('포트폴리오를 수정하였습니다.')
    await loadPortfolios(expertSeq)
  }

  // 포트폴리오 삭제
  const removePortfolio = async (portfolioSeq: number, userId: string, expertSeq: number) => {
    const response = await deletePortfolio(portfolioSeq, userId)
    loadPortfolios(expertSeq)
    return response
  }

  // 전문가 포트폴리오 순서 변경
  const updatePortfolioOrder = async (data: any) => {
    return await reorderPortfolio(data)
  }

  // 포트폴리오 이미지 업로드
  const uploadPortfolioImages = async (formData: FormData) => {
    const response = await uploadFile(formData)
    images.value = images.value || []
    images.value.push(response)
    console.log('포트폴리오 이미지 업로드', response)
    return response
  }

  const uploadEditPortfolioImages = async (formData: FormData) => {
    const response = await uploadFile(formData)
    console.log('포트폴리오 수정 이미지 업로드', response)
    if (details.value?.fileList) {
      details.value.fileList.push(response)
    } else {
      details.value = { fileList: [response] }
    }
    return response
  }

  return {
    details,
    portfolios,
    images,
    loadPortfolio,
    loadPortfolios,
    addPortfolio,
    editPortfolioAction,
    removePortfolio,
    updatePortfolioOrder,
    uploadPortfolioImages,
    uploadEditPortfolioImages
  }
})

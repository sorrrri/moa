import { ref } from 'vue'
import { useStore } from '~/store'
import { defineStore } from 'pinia'
import {
  getClientQuoteDetails,
  getFavoriteForm,
  getClientQuotation,
  getClientQuotations,
  modifyQuotations,
  modifyFavoriteForm,
  deleteFavoriteForm,
  getExpertQuotation,
  getExpertQuotations,
  getSingleCategory,
  createQuotation,
  modifyQuotation
} from '~/api/index.js'

export const useQuotationStore = defineStore('quotation', () => {
  const quotationIndex = ref<number>(0)
  const total = ref<number>(0)
  const quote = ref<any>({})
  const quotations = ref<any[]>([])
  const details = ref<any[]>([])
  const favoriteQuotes = ref<any[]>([])
  const requestSkill = ref<any>({})

  // 견적서 조회 (클라이언트)
  const loadClientQuote = async (quoteSeq: number, userId: string) => {
    const response = await getClientQuotation(quoteSeq, userId)
    quote.value = response
    return response
  }

  // 견적서 요청 리스트 (클라이언트)
  const loadClientQuotes = async (clientSeq: number, data: any) => {
    const response = await getClientQuotations(clientSeq, data)
    quotations.value = response.data
    total.value = response.total
    return response
  }

  // 견적서 수신 리스트 (클라이언트)
  const loadClientQuoteDetails = async (quoteListSeq: number, userId: string) => {
    const response = await getClientQuoteDetails(quoteListSeq, userId)
    details.value = response
    return response
  }

  // 견적서 그만 받기
  const stopReceivingQuotes = async (quoteSeq: number, data: any) => {
    const response = await modifyQuotations(quoteSeq, data)
    return response
  }

  // 자주쓰는 견적서 수정
  const editFavoriteForm = async (quoteSeq: number, data: any) => {
    await modifyFavoriteForm(quoteSeq, data)
  }

  // 자주쓰는 견적서 삭제
  const removeFavoriteForm = async (formSeq: number) => {
    const response = await deleteFavoriteForm(formSeq)
    return response
  }

  // 자주쓰는 견적서 조회
  const loadFavoriteForm = async (expertSeq: number, data: any) => {
    const response = await getFavoriteForm(expertSeq, data)
    favoriteQuotes.value = response.data
  }

  // 견적서 조회 (전문가)
  const loadExpertQuote = async (quoteSeq: number, userId: string) => {
    const response = await getExpertQuotation(quoteSeq, userId)
    quote.value = response
    return response
  }

  // 견적서 수신 리스트 (전문가)
  const loadExpertQuotes = async (expertSeq: number, data: any) => {
    const response = await getExpertQuotations(expertSeq, data)
    quotations.value = response
    total.value = response.total
    return response
  }

  // 견적 요청할 전문 분야 불러오기
  const loadRequestSkill = async (categorySeq: number) => {
    requestSkill.value = await getSingleCategory(categorySeq)
  }

  // 견적 요청 등록
  const requestQuote = async (data: any) => {
    await createQuotation(data)
    // requestSkill.value = response
  }

  // 견적 요청에 대한 회신
  const responseQuote = async (quoteSeq: number, data: any) => {
    quote.value = await modifyQuotation(quoteSeq, data)
  }

  return {
    total,
    quotationIndex,
    quote,
    quotations,
    details,
    favoriteQuotes,
    requestSkill,
    requestQuote,
    loadRequestSkill,
    loadClientQuote,
    loadClientQuoteDetails,
    loadClientQuotes,
    stopReceivingQuotes,
    editFavoriteForm,
    removeFavoriteForm,
    loadFavoriteForm,
    loadExpertQuote,
    loadExpertQuotes,
    responseQuote
  }
})

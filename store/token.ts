import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTokenInfo, getTotalTokens, createTokens } from '~/api/index.js'
import { getGoodsData, requestChargeTokens } from '~/api/gabiacns.js'

export const useTokenStore = defineStore('token', () => {
  const details = ref<any>({})
  const total = ref<any>({})
  const receivedData = ref<any>({})

  // 토큰 정보 조회
  const loadTokenInfo = async (data: any) => {
    details.value = await getTokenInfo(data)
  }

  // 토큰 잔액 조회
  const loadTotalTokens = async (data: any) => {
    total.value = await getTotalTokens(data)
  }

  // 토큰 충전 관련 정보 받아오기
  const loadTokenChargeList = async (data: any) => {
    receivedData.value = await getGoodsData(data)
  }

  // 프로필 완성 보상금 지급
  const addTokenInfo = async (data: any) => {
    return await createTokens(data)
  }

  // 토큰 충전
  const chargeTokens = async (data: any) => {
    return await requestChargeTokens(data)
  }

  return {
    details,
    total,
    receivedData,
    loadTokenInfo,
    loadTotalTokens,
    addTokenInfo,
    loadTokenChargeList,
    chargeTokens
  }
})

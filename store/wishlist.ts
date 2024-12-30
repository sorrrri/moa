import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFavoriteExpert, getFavoriteExperts, modifyFavoriteExpert } from '~/api/index.js'

export const useWishlistStore = defineStore('wishlist', () => {
  const status = ref<any>({})
  const list = ref<any>({})
  const total = ref<number>(0)

  // 클라이언트 찜 여부 조회
  const loadFavoriteExpert = async (data: any) => {
    status.value = await getFavoriteExpert(data)
  }

  // 찜한 전문가 목록 조회
  const loadFavoriteExperts = async (data: any) => {
    const response = await getFavoriteExperts(data)
    list.value = response.data
    total.value = response.total
  }

  // 클라이언트 찜 등록/해제
  const updateFavoriteExpert = async (data: any) => {
    return await modifyFavoriteExpert(data)
  }

  return {
    status,
    list,
    total,
    loadFavoriteExpert,
    loadFavoriteExperts,
    updateFavoriteExpert
  }
})

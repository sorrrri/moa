import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategories, getCategoryList, getSingleCategory } from '~/api/index'

export const useCategoryStore = defineStore('category', () => {
  const singleCategory = ref<any>({})
  const categories = ref<any[]>([])
  const mainCategories = ref<any[]>([])
  const expertSkills = ref<any[]>([])
  const popularSkills = ref<any[]>([])

  // 선택한 카테고리 조회
  const loadSingleCategory = async (categorySeq: number) => {
    singleCategory.value = await getSingleCategory(categorySeq)
  }

  // 카테고리 목록 조회
  const loadCategories = async (data: { status?: string } = {}) => {
    categories.value = await getCategoryList({ status: 'open', ...data })
  }

  const loadPopularSkills = async () => {
    const data = {
      status: 'open',
      thumbnailStatus: 'open',
      sort: 'popularSort,asc',
      page: 1,
      size: 4
    }
    popularSkills.value = await getCategoryList(data)
  }

  // 카테고리 계층 목록 조회
  const loadMainCategories = async (data: any) => {
    mainCategories.value = await getCategories(data)
  }

  const getExpertSkills = async (data: any) => {
    expertSkills.value = await getCategories(data)
  }

  return {
    categories,
    singleCategory,
    mainCategories,
    expertSkills,
    popularSkills,
    loadSingleCategory,
    loadCategories,
    loadMainCategories,
    getExpertSkills,
    loadPopularSkills
  }
})

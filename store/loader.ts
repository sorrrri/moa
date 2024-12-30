import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref<boolean>(false)

  const setLoading = async (loading: boolean) => {
    isLoading.value = loading
  }

  return { isLoading, setLoading }
})

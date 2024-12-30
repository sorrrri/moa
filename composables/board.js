import { computed } from 'vue'
import { useStore } from '~/store'

export const useBoard = () => {
  const { boardStore } = useStore()
  const events = computed(() => boardStore.events)
  const popularSkills = computed(() => boardStore.expertSkills)
  return {
    events,
    popularSkills
  }
}

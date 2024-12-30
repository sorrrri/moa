import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getEvents } from '~/api/boards.js'

export const useBoardStore = defineStore('board', () => {
  const events = ref<any[]>([])

  // 이벤트 게시판 조회
  const loadEvents = async () => {
    events.value = await getEvents({ site_code: 'MOA' })
  }

  return {
    events,
    loadEvents
  }
})

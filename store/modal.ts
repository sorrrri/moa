import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  // 상태 정의
  const alert = ref<boolean>(false)
  const confirm = ref<boolean>(false)
  const custom = ref<boolean>(false)
  const nested = ref<boolean>(false)
  const currentCustom = ref<string>('')
  const currentConfirm = ref<string>('')
  const currentNested = ref<string>('')
  const message = ref<string>('')

  const handleModalVisibility = (type: any, visibility: boolean, messageText = '') => {
    document.body.style.overflow = visibility ? 'hidden' : ''
    if (messageText) {
      message.value = messageText
    }
    switch (type) {
      case 'alert':
        alert.value = visibility
        break
      case 'confirm':
        confirm.value = visibility
        break
      case 'custom':
        custom.value = visibility
        break
      case 'nested':
        nested.value = visibility
        break
    }
  }

  const showAlert = (messageText: string) => {
    handleModalVisibility('alert', true, messageText)
  }

  const hideAlert = () => {
    handleModalVisibility('alert', false)
  }

  const showConfirm = (modalName: string) => {
    handleModalVisibility('confirm', true)
    currentConfirm.value = modalName
  }

  const hideConfirm = () => {
    handleModalVisibility('confirm', false)
    currentConfirm.value = ''
  }

  const showModal = (modalName: string) => {
    handleModalVisibility('custom', true)
    currentCustom.value = modalName
  }

  const hideModal = () => {
    handleModalVisibility('custom', false)
    currentCustom.value = ''
  }

  const showNestedModal = (modalName: string) => {
    handleModalVisibility('nested', true)
    currentNested.value = modalName
  }

  const hideNestedModal = () => {
    handleModalVisibility('nested', false)
    currentNested.value = ''
  }

  return {
    alert,
    confirm,
    custom,
    nested,
    currentCustom,
    currentConfirm,
    currentNested,
    message,
    showAlert,
    hideAlert,
    showConfirm,
    hideConfirm,
    showModal,
    hideModal,
    showNestedModal,
    hideNestedModal
  }
})

import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { handleConfirmAction } from './confirm.js'
import { handleCustomModalCases } from './custom.js'
import { handleNestedModalCases } from './nested.js'
import { useStore } from '~/store'

// 알림 모달 관리
export const useAlertModal = () => {
  const { modalStore } = useStore()
  const alertModal = computed(() => modalStore.alert)
  const alertMessage = computed(() => modalStore.message)
  const closeModal = () => modalStore.hideAlert()

  if (alertModal.value) {

    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (event) => {
        event.key === 'Escape' && closeModal()
      })
    }
  }
  return { alertModal, alertMessage, closeModal }
}

// 컨펌 모달 관리
export const useConfirmModal = () => {
  const { modalStore } = useStore()
  const router = useRouter()
  const selectedConfirmList = ref({})
  const confirmModal = computed(() => modalStore.confirm)
  const confirmMessage = computed(() => modalStore.message)
  const currentConfirmModal = computed(() => modalStore.currentConfirm)

  // 모달 열기
  const openConfirmModal = async (name, list) => {
    modalStore.showConfirm(name)
    selectedConfirmList.value = list
    await handleConfirmAction(list, false)
  }

  const confirmSubmit = async (list) => {
    await handleConfirmAction(list, true)
    modalStore.hideConfirm()
  }

  const closeConfirmModal = () => {
    if (
      modalStore.currentConfirm == 'changeUserRoleExpert' ||
      currentConfirmModal.value == 'changeUserRoleClient'
    ) {
      router.push('/')
    }
    modalStore.hideConfirm()
  }

  if (modalStore.confirm) {

    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (event) => {
        event.key === 'Escape' && closeConfirmModal()
      })
    }
  }

  return {
    currentConfirmModal,
    confirmModal,
    confirmMessage,
    openConfirmModal,
    closeConfirmModal,
    confirmSubmit,
    selectedConfirmList
  }
}

// 커스텀 모달 관리
export const useCustomModal = () => {
  const MOA_API_URL = ref(`${import.meta.env.VITE_MOA_API_URL}`)
  const { modalStore } = useStore()
  const selectedList = ref()
  const currentModal = computed(() => modalStore.currentCustom)
  const currentNestedModal = computed(() => modalStore.currentNested)

  // 모달 열기
  const openModal = async (name, list, index) => {
    modalStore.showModal(name)
    selectedList.value = list
    handleCustomModalCases(list)

    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (event) => {
        event.key === 'Escape' && closeModal()
      })
    }
  }

  // 모달 닫기
  const closeModal = async () => {
    modalStore.hideModal()
  }

  // 중첩 모달 띄우기
  const openNestedModal = async (name, list, index) => {
    modalStore.showNestedModal(name)
    selectedList.value = list
    handleNestedModalCases(list, index)

    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (event) => {
        event.key === 'Escape' && closeNestedModal()
      })
    }
  }

  // 중첩 모달 닫기
  const closeNestedModal = async () => {
    modalStore.hideNestedModal()
  }

  return {
    MOA_API_URL,
    closeModal,
    closeNestedModal,
    openModal,
    openNestedModal,
    currentModal,
    currentNestedModal,
    selectedList
  }
}

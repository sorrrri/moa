import { ref, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '~/store'

/* =====================================================
   포트폴리오 보기
===================================================== */
export const useExpertPortfolio = () => {
  const route = useRoute()
  const { profileStore, portfolioStore } = useStore()

  // 썸내일
  const thumbnail = (list) => {
    if (list.fileList && list.fileList.length > 0) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.fileList[0].filePath}`
    } else {
      return '/images/common/no_thumbnail.png'
    }
  }

  // 원본 이미지
  const originalImage = (list) => {
    if (list.filePath) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.filePath}`
    } else {
      return '/images/common/no_thumbnail.png'
    }
  }

  // 포트폴리오 조회
  const portfolios = computed(() => {
    const portfolio = portfolioStore.portfolios
      .filter((portfolio) => portfolio.status === 'open')
      .slice()
      .reverse()
      .sort((a, b) => {
        if (a.sortBy !== b.sortBy) {
          return a.sortBy - b.sortBy
        }
        return b.seq - a.seq
      })

    return portfolio.length > 3 ? portfolio.slice(0, initialCount.value) : portfolio
  })

  // 포트폴리오 더보기
  const initialCount = route.path.includes('inbox') ? ref(6) : ref(4)
  const isCollapsed = computed(() => {
    return (
      portfolios.value !== undefined &&
      portfolioStore.portfolios.length > 4 &&
      initialCount.value < portfolioStore.portfolios.length
    )
  })

  // 더보기 버튼 활성화
  const isExpanded = ref(false)
  const showAll = () => {
    isExpanded.value = true
    initialCount.value = portfolioStore.portfolios.length
  }

  // 접기 버튼 활성화
  const showPartly = () => {
    isExpanded.value = false
    isCollapsed.value = true
    initialCount.value = 4
  }

  const expertThumbnail = computed(() => profileStore.expert.profileImage)

  // 공유하기 모달
  const openShareModal = ref(false)

  return {
    thumbnail,
    originalImage,
    showAll,
    showPartly,
    isExpanded,
    portfolios,
    isCollapsed,
    expertThumbnail,
    openShareModal
  }
}

/* =====================================================
   포트폴리오 수정
===================================================== */
export const useEditPortfolio = () => {
  const { accountStore, modalStore, portfolioStore } = useStore()
  const expertSeq = accountStore.account.expertSeq
  const userId = accountStore.account.userId
  const years = ref([...Array(20)].map((_, i) => 2024 - i))
  const sortableOptions = computed(() => {
    return {
      handle: '.draggable',
      animation: 150,
      ghostClass: 'ghost',
      scroll: true
    }
  })

  // 썸내일
  const thumbnail = (list) => {
    if (list.fileList?.length > 0) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.fileList[0].filePath}`
    } else {
      return '/images/common/no_thumbnail.png'
    }
  }

  // 포트폴리오 조회
  const sortedPortfolio = (portfolio = []) => {
    return portfolio
      .filter((item) => item.status === 'open')
      .slice()
      .sort((a, b) => a.sortBy - b.sortBy || b.seq - a.seq)
  }

  const portfolios = computed(() => sortedPortfolio(portfolioStore.portfolios))

  // 포트폴리오 이미지 순서 변경 이벤트
  const reorderImages = (event) => {
    const updatedImages = [...event.from.children].map((list) => {
      const seq = parseInt(list.dataset.seq, 10)
      const images = portfolioStore.details.fileList.find((image) => image.seq === seq)
      return {
        ...images
      }
    })
    portfolioStore.images.push(updatedImages)
  }

  // 순서 변경 이벤트
  const reorderPortfolio = (event) => {
    const updatedPortfolio = [...event.from.children].map((list, index) => {
      const seq = parseInt(list.dataset.seq, 10)
      const portfolio = portfolios.value.find((portfolio) => portfolio.seq === seq)

      return {
        ...portfolio,
        sortBy: index + 1
      }
    })

    portfolioStore.updatePortfolioOrder({
      userId,
      expertPortfolioList: updatedPortfolio
    })
  }

  // 포트폴리오 이미지 추가
  const editUploadPortfolioImages = async (event) => {
    // 파일 업로드
    const files = event.target.files
    const formData = new FormData()
    const validTypes = ['image/jpeg', 'image/png']
    for (const file of files) {
      if (validTypes.includes(file.type)) {
        formData.append('multipartFile', file)
        await portfolioStore.uploadEditPortfolioImages(formData)
      } else {
        modalStore.showAlert('이미지 파일만 업로드 가능합니다.')
      }
    }
  }

  // 포트폴리오 이미지 삭제
  const removeImage = (index) => {
    if (portfolioStore.details.fileList.length > 1) {
      portfolioStore.details.fileList.splice(index, 1)
    } else {
      modalStore.showAlert('최소 한 개 이상의 포트폴리오 이미지를 등록해 주세요.')
    }
  }

  // 포트폴리오 수정
  const portfolio = computed(() => portfolioStore.details)
  const skills = computed(() => portfolioStore.details?.categoryList || [])
  const editPortfolioSkills = ref(skills.value.map((skill) => skill.categorySeq) || [])
  watch(skills, (newCategoryList, oldCategoryList) => {
    editPortfolioSkills.value = newCategoryList.map((skill) => skill.categorySeq)
  })

  // 포트폴리오 수정하기
  const submitEditPortfolio = (event) => {
    const caution = event.target.closest('.modal').querySelector('.caution')
    const { title, contents, fileList, seq } = portfolioStore.details
    const isFormComplete = title && contents && fileList && editPortfolioSkills.value.length > 0
    const data = {
      title: portfolioStore.details.title,
      contents: portfolioStore.details.contents,
      portfolioDate: portfolioStore.details.portfolioDate,
      sortBy: portfolioStore.details.sortBy,
      categoryList: editPortfolioSkills.value.map((skill) => {
        return { categorySeq: skill }
      }),
      fileList: portfolioStore.details.fileList
    }

    // 유효성 검사를 실패한 경우
    if (caution) {
      modalStore.showAlert(caution.textContent)
      return
    }

    // 필수항목을 채우지 않은 경우
    if (!isFormComplete) {
      modalStore.showAlert('필수항목을 입력해주세요.')
      return
    }

    // 업로드한 파일 미리보기의 url 경로 가져오기
    if (fileList.length > 0) {
      data.fileList = fileList.map(({ seq, filePath }) => ({ fileSeq: seq, filePath }))
    }

    const portfolioSeq = seq
    portfolioStore.editPortfolioAction(portfolioSeq, data, expertSeq)
    modalStore.hideModal()
  }

  return {
    sortableOptions,
    thumbnail,
    years,
    portfolio,
    portfolios,
    submitEditPortfolio,
    reorderImages,
    reorderPortfolio,
    editPortfolioSkills,
    editUploadPortfolioImages,
    removeImage
  }
}

/* =====================================================
   포트폴리오 등록
===================================================== */
export const useAddPortfolio = () => {
  const { accountStore, modalStore, portfolioStore } = useStore()
  const expertSeq = accountStore.account.expertSeq
  const userId = accountStore.account.userId
  const years = ref([...Array(20)].map((_, i) => 2024 - i))
  const portfolioImages = computed(() => portfolioStore.images)
  const portfolio = reactive({
    title: '',
    desc: '',
    year: ref(years.value[0]),
    skills: []
  })

  // 포트폴리오 제목
  const isInvalidTitle = ref(false)
  const validateTitle = () => {
    isInvalidTitle.value = portfolio.title.length < 2
  }

  // 설명
  const isInvalidDescription = ref(false)
  const validateDescription = () => {
    isInvalidDescription.value = portfolio.desc.trim().length === 0
  }

  // 포트폴리오 이미지 첨부
  const uploadPortfolioImages = async (event) => {
    const files = event.target.files
    const formData = new FormData()
    const validTypes = ['image/jpeg', 'image/png']
    for (const file of files) {
      if (validTypes.includes(file.type)) {
        formData.append('multipartFile', file)
        await portfolioStore.uploadPortfolioImages(formData)
      } else {
        modalStore.showAlert('이미지 파일만 업로드 가능합니다.')
      }
    }
  }

  // 포트폴리오 이미지 삭제
  const removeImage = (index) => portfolioStore.images.splice(index, 1)

  // 포트폴리오 이미지 순서 변경 이벤트
  const reorderImages = (event) => {
    const updatedImages = [...event.from.children].map((list) => {
      const seq = parseInt(list.dataset.seq, 10)
      const images = portfolioStore.images.find((image) => image.seq === seq)
      return {
        ...images
      }
    })
    portfolioStore.images = updatedImages
  }

  // 포트폴리오 등록
  const isValid = computed(() => {
    return (
      portfolio.title &&
      portfolio.desc &&
      portfolio.skills.length > 0 &&
      portfolioImages.value.length > 0
    )
  })

  const submitAddPortfolio = (event) => {
    const data = {
      expertSeq: expertSeq,
      userId: userId,
      title: portfolio.title,
      contents: portfolio.desc,
      portfolioDate: portfolio.year,
      sortBy: 1,
      categoryList: portfolio.skills.map((skill) => {
        return { categorySeq: skill }
      }),
      fileList: portfolioImages.value.map((image) => {
        return { fileSeq: image.seq, filePath: image.filePath }
      })
    }

    const caution = event.target.closest('.modal').querySelector('.caution')
    if (!caution) {
      portfolioStore.portfolios.push(data)
      portfolioStore.addPortfolio(expertSeq, data)
      portfolioStore.loadPortfolios(expertSeq)
      modalStore.custom = false
      portfolioStore.images = []
      modalStore.hideModal()
    } else {
      modalStore.showAlert(caution.textContent)
    }
  }

  return {
    isValid,
    isInvalidTitle,
    isInvalidDescription,
    validateTitle,
    validateDescription,
    years,
    portfolio,
    portfolioImages,
    uploadPortfolioImages,
    removeImage,
    reorderImages,
    submitAddPortfolio
  }
}

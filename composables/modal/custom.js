import { useStore } from '~/store'
import { handleConfirmAction } from '~/composables/modal/confirm.js'

export const handleCustomModalCases = async (list) => {
  const { accountStore, modalStore, profileStore, portfolioStore, reviewStore, quotationStore } =
    useStore()
  switch (modalStore.currentCustom) {
    // 포트폴리오 수정
    case 'editPortfolio':
      await portfolioStore.loadPortfolio(list.seq)
      break

    // 리뷰 등록
    case 'addReview':
      const expertSeq = list.expert.seq
      await profileStore.loadExpertInfo(expertSeq)
      await reviewStore.loadReviewComments()
      break

    // 자주쓰는 견적
    case 'favoriteQuotes': {
      const expertSeq = accountStore.account.expertSeq ?? null
      const data = {
        userId: accountStore.account.userId
      }
      await quotationStore.loadFavoriteForm(expertSeq, data)
      break
    }

    // 견적 요청
    case 'requestQuote': {
      if (
        accountStore.account.lastLoginType === 'client' ||
        [null, undefined].includes(accountStore.account.clientInfo)
      ) {
        const categorySeq = list.categorySeq ?? list.seq
        await quotationStore.loadRequestSkill(categorySeq)
      } else {
        modalStore.showConfirm('changeUserRoleClient')
        handleConfirmAction()
        modalStore.hideModal()
      }
      break
    }

    default:
      break
  }
}

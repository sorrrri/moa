import { useStore } from '~/store'
import { useExpertTerminate } from '~/composables/expert/terminate.js'

export const handleConfirmAction = async (list, clicked) => {
  const { modalStore, accountStore, quotationStore, wishlistStore, portfolioStore, reviewStore } =
    useStore()
  const { submitTermination } = useExpertTerminate()
  const userId = accountStore.account.userId
  const expertSeq = accountStore.account.expertSeq
  const clientSeq = accountStore.account.clientSeq

  switch (modalStore.currentConfirm) {
    // 포트폴리오 삭제
    case 'removePortfolio':
      modalStore.message = `포트폴리오를 삭제하시겠습니까? 
      삭제 시 취소가 불가하고 즉시 삭제됩니다.`
      if (clicked) {
        await portfolioStore.removePortfolio(list.seq, userId, expertSeq)
      }
      break

    // 리뷰 삭제
    case 'removeReview':
      modalStore.message = `리뷰를 삭제하시겠습니까? 
      삭제 시 취소가 불가하고 즉시 삭제됩니다.`
      if (clicked) {
        await reviewStore.removeReview(list.seq, userId)
      }
      break

    // 로그인 요청
    case 'login':
      modalStore.message = `전문가와 매칭을 원하시나요? 
      로그인 후에 견적요청이 가능합니다.`
      if (clicked) {
        await accountStore.login()
      }
      break

    // 견적서 그만 받기
    case 'stopQuotations':
      modalStore.message = `견적서 받기를 중단하시겠습니까?`
      if (clicked) {
        const stopData = { userId, status: 6 }
        await quotationStore.stopReceivingQuotes(list.seq, stopData)
        await quotationStore.loadClientQuoteDetails(list.seq, userId)
      }
      break

    // 자주 쓰는 견적서 삭제
    case 'removeQuoteForm':
      modalStore.message = `해당 자주쓰는 견적을 삭제하시겠습니까?`
      if (clicked) {
        await quotationStore.removeFavoriteForm(list.seq)
        await quotationStore.loadFavoriteForm(expertSeq, { userId })
      }
      break

    // 전문가로 전환
    case 'changeUserRoleExpert':
      modalStore.message = `해당 기능은 전문가로 전환 후<br />이용할 수 있습니다.`
      if (clicked) {
        await accountStore.changeUserRoleAction({
          userId: accountStore.account.userId,
          lastLoginType: 'expert'
        })
      }
      break

    // 클라이언트로 전환
    case 'changeUserRoleClient':
      modalStore.message = `해당 기능은 클라이언트로 전환 후
      이용할 수 있습니다.`
      if (clicked) {
        await accountStore.changeUserRoleAction({
          userId: accountStore.account.userId,
          lastLoginType: 'client'
        })
      }
      break

    // 전문가 찜리스트에서 제외
    case 'removeFavoriteExpert':
      modalStore.message = `<strong>${list.expert.nickName}</strong> 전문가를 위시리스트에서 제외하시겠습니까?`
      if (clicked) {
        await wishlistStore.updateFavoriteExpert({
          userId,
          clientSeq,
          expertSeq: list.expert.seq
        })
        await wishlistStore.loadFavoriteExperts({ clientSeq, page: 1, size: 10 })
      }
      break

    // 자주 쓰는 견적서 적용
    case 'applyForm':
      modalStore.message = '작성 중인 견적은 초기화됩니다.'
      if (clicked) {
        quotationStore.quote.price = list.price
        quotationStore.quote.description = list.description
      }
      break

    // 전문가 해지
    case 'termination':
      modalStore.message = '전문가 해지를 신청하시겠습니까?'
      if (clicked) {
        await submitTermination(list)
      }
      break

    default:
      break
  }
}

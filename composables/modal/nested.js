import { useStore } from '~/store'

export const handleNestedModalCases = async (list, index) => {
  const {
    accountStore,
    modalStore,
    profileStore,
    portfolioStore,
    reviewStore,
    quotationStore,
    wishlistStore
  } = useStore()

  switch (modalStore.currentNested) {
    // 견적 확인
    case 'quotation':
      const expertSeq = list.expert.seq
      const quoteSeq = list.seq
      const userId = accountStore.account.userId
      const quoteListSeq = quotationStore.details.seq
      const data = {
        clientSeq: accountStore.account.clientSeq,
        expertSeq: expertSeq
      }

      await Promise.all([
        // 견적서 순서 체크 & 조회
        (quotationStore.quotationIndex = index),
        quotationStore.loadClientQuote(quoteSeq, userId),

        // 전문가 정보 조회
        wishlistStore.loadFavoriteExpert(data),
        reviewStore.loadReviews(expertSeq),
        reviewStore.loadReviewComments(),
        portfolioStore.loadPortfolios(expertSeq),
        profileStore.loadExpertInfo(expertSeq),

        // 수신함 재조회(견적확인일시 체크)
        quotationStore.loadClientQuoteDetails(quoteListSeq, userId)
      ])
      break

    default:
      break
  }
}

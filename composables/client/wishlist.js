import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '~/store'

export const useWishlist = () => {
  const { accountStore, profileStore, wishlistStore, modalStore, quotationStore } = useStore()
  const route = useRoute()
  const clientSeq = accountStore.account.clientSeq

  // 전문가를 위시리스트에 담기
  const favoriteExpert = computed(() => {
    return wishlistStore.status.data !== null
  })
  const favoriteExperts = computed(() => {
    return wishlistStore.list ?? []
  })

  const thumbnail = (list) => {
    if (list.expert.profileImage?.filePath) {
      return `${import.meta.env.VITE_MOA_API_URL}/${list.expert.profileImage.filePath}`
    } else {
      return '/images/common/no_thumbnail.png'
    }
  }

  const updateFavoriteExpert = async () => {
    const expertSeq = route.params.seq ?? profileStore.expert.seq
    const quoteSeq = quotationStore.quote.seq
    if (clientSeq) {
      const data = {
        userId: accountStore.account.userId,
        clientSeq: clientSeq,
        expertSeq: expertSeq ? expertSeq : profileStore.expert.seq
      }

      await wishlistStore.updateFavoriteExpert(data)
      await wishlistStore.loadFavoriteExpert(data)
      const userId = accountStore.account.userId
      if (route.path.includes('inbox')) {
        await quotationStore.loadClientQuote(quoteSeq, userId)
      }
    } else {
      modalStore.showAlert('클라이언트 전환 후 이용 가능합니다.')
    }
  }

  return {
    thumbnail,
    favoriteExpert,
    favoriteExperts,
    updateFavoriteExpert
  }
}

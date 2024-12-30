// stores/index.ts
import { useBusinessLicenseStore } from './expert/businessLicense'
import { useCategoryStore } from './category'
import { useLoaderStore } from './loader'
import { useModalStore } from './modal'
import { useProfileStore } from './expert/profile'
import { usePortfolioStore } from './expert/portfolio'
import { useReviewStore } from './expert/review'
import { useAccountStore } from './account'
import { useQuotationStore } from './quotation'
import { useTokenStore } from './token'
import { useBoardStore } from './board'
import { useWishlistStore } from './wishlist'
import { useVerificationStore } from './verification'

export function useStore() {
  return {
    loaderStore: useLoaderStore(),
    modalStore: useModalStore(),
    categoryStore: useCategoryStore(),
    businessLicenseStore: useBusinessLicenseStore(),
    profileStore: useProfileStore(),
    portfolioStore: usePortfolioStore(),
    reviewStore: useReviewStore(),
    accountStore: useAccountStore(),
    quotationStore: useQuotationStore(),
    tokenStore: useTokenStore(),
    boardStore: useBoardStore(),
    wishlistStore: useWishlistStore(),
    verificationStore: useVerificationStore()
  }
}

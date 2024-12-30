import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '~/store'

/* =====================================================
   토큰 관리
===================================================== */
export const useTokens = () => {
  const { accountStore, tokenStore } = useStore()
  const router = useRouter()
  const userId = accountStore.account.userId
  const tokenInfo = computed(() => tokenStore.details.data)
  const currentTokens = computed(() => tokenStore.total.totalToken)

  // 최근 연도
  const latestYear = computed(() => {
    if (tokenInfo.value > 0 && tokenInfo.value !== undefined) {
      return ref(tokenInfo.value[0].procDate.substring(0, 4))
    } else {
      return new Date().getFullYear()
    }
  })

  // 가장 오래된 연도
  const earliestYear = computed(() => {
    if (tokenInfo.value > 0 && tokenInfo.value !== undefined) {
      return ref(tokenInfo.value[tokenInfo.value.length - 1].procDate.substring(0, 4))
    } else {
      return new Date().getFullYear()
    }
  })

  // 연도 조회
  const years = ref([])
  for (let year = earliestYear.value; year <= latestYear.value; year++) {
    years.value.push(year)
  }
  const selectedYear = ref(years.value[0])
  const goToTokenCharge = () => router.push(`/token/charge`)
  const tokenTotal = computed(() => tokenStore.total)
  const total = computed(() => tokenStore.details?.total)

  const fetchTokenList = () => {
    const data = {
      userId: userId,
      yearDate: selectedYear.value,
      page: 1,
      size: perPage.value,
      sort: 'seq,desc'
    }
    tokenStore.loadTokenInfo(data)
  }

  return {
    currentTokens,
    goToTokenCharge,
    fetchTokenList,
    total,
    years,
    selectedYear,
    tokenInfo,
    tokenTotal
  }
}

/* =====================================================
   토큰 충전하기
===================================================== */
export const useChargeTokens = () => {
  const { accountStore, tokenStore } = useStore()
  const goodsList = computed(() =>
    tokenStore.receivedData.goodsSpec.slice().sort((a, b) => a.quantity - b.quantity)
  )
  const selectedToken = ref(goodsList.value.length > 0 ? goodsList.value[0].quantity : 0)

  // 토큰 충전하기
  const submitChargeTokens = async () => {
    const data = {
      user_id: accountStore.account.userId,
      payment: {
        pg_company: 'lgu',
        pg_id: 'gabiacns_exp',
        source: 'moa'
      },
      additionList: [
        {
          regist_value: selectedToken.value,
          regist_type: 'quantity',
          service_code: 'ADDITION',
          goods_code: 'AD_EP_TOKEN',
          auto_pay_seq: 0,
          promotion_seq: 0,
          shop_seq: 0,
          service_seq: accountStore.account.receivedData.service_seq,
          addition_seq: 0,
          goods_code: 'AD_EP_TOKEN',
          spec_code: 'BS',
          addition_type: 'CHARGE'
        }
      ]
    }
    const response = await tokenStore.chargeTokens(data)

    // 히든폼 생성
    const paymentForm = document.createElement('form')
    paymentForm.method = 'post'
    paymentForm.action = response.payment_url

    const hiddenFields = [
      { name: 'ordercode', value: response.ordercode },
      { name: 'callback[name]', value: '확인하기' },
      { name: 'callback[url]', value: `${import.meta.env.VITE_MOA_URL}/token` }
    ]

    hiddenFields.forEach((field) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = field.name
      input.value = field.value
      paymentForm.appendChild(input)
    })

    document.body.appendChild(paymentForm)
    paymentForm.submit()
  }

  return {
    submitChargeTokens,
    goodsList,
    selectedToken
  }
}

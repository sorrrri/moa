import { ref, reactive, computed } from 'vue'
import { useStore } from '~/store'

export const useExpertTerminate = () => {
  const { accountStore, tokenStore } = useStore()

  const isValid = computed(() => {
    return (
      termination.reasons.length > 0 &&
      termination.bankCode != 0 &&
      termination.bankName &&
      termination.bankNumber &&
      termination.checked.length === 2
    )
  })

  const termination = reactive({
    reasons: [],
    bankCode: 0,
    bankName: '',
    bankNumber: '',
    checked: []
  })

  const bankList = {
    0: '환불은행',
    '002': '산업은행',
    '003': '기업은행',
    '004': '국민은행',
    '005': 'KEB하나은행',
    '006': '국민은행',
    '007': '수협중앙회',
    '008': '수출입은행',
    '011': '농협',
    '020': '우리은행',
    '023': 'SC은행',
    '025': '하나은행',
    '026': '신한은행',
    '027': '한국씨티은행',
    '031': '대구은행',
    '032': '부산은행',
    '034': '광주은행',
    '035': '제주은행',
    '037': '전북은행',
    '039': '경남은행',
    '045': '새마을금고',
    '048': '신용협동조합',
    '050': '상호저축은행',
    '054': 'HSBC은행',
    '055': '도이치은행',
    '057': 'JP모간체이스은행',
    '060': 'BOA(뱅크오브아메리카)',
    '061': '비엔피파리바은행',
    '062': '중국공상은행',
    '064': '산림조합',
    '071': '우체국',
    '081': 'KEB하나은행',
    '088': '신한은행',
    '089': '케이뱅크',
    '090': '카카오뱅크',
    209: '유안타증권'
  }

  const reasons = [
    '비매너 클라이언트를 만났어요',
    '잦은 오류가 발생해요',
    '대체할 만한 서비스를 찾았어요',
    '쿠폰 · 적립금 등 혜택이 적어요',
    '전문가 활동을 하지 않아요.',
    '원하는 클라이언트를 만날 수 없어요.',
    '기타'
  ]

  // 전문가 해지 (컨펌 모달창에서 실행)
  const submitTermination = async (list) => {
    await tokenStore.loadTotalTokens({ userId: accountStore.account.userId })

    const addition = accountStore.account.receivedData.items
    const modifiedAddition = addition.map((item) => {
      if (item.goods_code === 'AD_EP_TOKEN') {
        item.quantity = tokenStore.total
      }
      item.status = '0'
      return item
    })

    const requestData = {
      tm_type: 'S',
      user_id: accountStore.account.userId,
      status: '0',
      refund_method: 'B',
      refund_bank: list.bankCode,
      refund_account: list.bankNumber,
      refund_owner: list.bankName,
      reason_message: list.reasons.map((checkedValue) => reasons[checkedValue]).join('\n'),
      items: modifiedAddition
    }
    await accountStore.terminateExpertInfo({ requestData })
  }

  return {
    isValid,
    termination,
    bankList,
    reasons,
    submitTermination
  }
}

import axios from 'axios'
import { getAccountData } from './account.js'

const instance = axios.create({ baseURL: '/moa' })
instance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => {
    if (response.data?.body?.data && response.data?.body?.total) {
      return response.data.body
    }

    return response.data?.body?.data || response.data?.body || response.data
  },
  (error) => {
    console.error('API 요청 오류:', error)
    throw error.response ? error.response.data : error
  }
)

export const getCategories = async (data) => {
  const response = await instance.get('/category/node/get', { params: data })
  return response.data
}

export const getCategoryList = async (data) => {
  const response = await instance.get('/category/get', { params: data })
  console.log('카테고리 목록 조회', response)
  return response.data
}

export const getSingleCategory = async (categorySeq) => {
  const response = await instance.get(`/category/read?seq=${categorySeq}`)
  console.log('선택한 카테고리 조회', response)
  return response
}

export const getPopularExperts = async (data) => {
  const response = await instance.get('/expert/get', { params: data })
  console.log('인기 전문가', response)
  return response
}

export const createExpert = async (data) => {
  const response = await instance.post('/expert/create', data)
  console.log('전문가 등록', response)
  return response
}

export const getExpert = async (expertSeq) => {
  const response = await instance.get(`/expert/read?seq=${expertSeq}`)
  console.log('전문가 프로필 조회', response)
  return response
}

// 전문가 검색 (아직 사용하는 곳은 없음)
export const getExperts = async (data) => {
  const response = await instance.get('/expert/get', { params: data })
  console.log('전문가 검색', response)
  return response
}

export const updateExpertInformation = async (data) => {
  const response = await instance.post(`/expert/modify`, data)
  console.log('전문가 프로필 업데이트', response)
  return response
}

export const createPortfolio = async (data) => {
  const response = await instance.post(`/expert/portfolio/create`, data)
  console.log('포트폴리오 등록', response)
  return response
}

export const getPortfolio = async (portfolioSeq) => {
  const response = instance.get(`/expert/portfolio/read/${portfolioSeq}`)
  console.log('단일 포트폴리오 조회', response)
  return response
}

export const getPortfolios = async (data) => {
  const response = await instance.get(`/expert/portfolio/get`, { params: data })
  response.data?.length > 0 && console.log('전문가 포트폴리오 조회', response.data)
  return response
}

export const modifyPortfolio = async (portfolioSeq, data) => {
  const response = await instance.post(`/expert/portfolio/modify/${portfolioSeq}`, data)
  console.log('단일 포트폴리오 수정', response)
  return response
}

export const deletePortfolio = async (portfolioSeq, userId) => {
  const response = await instance.post(`/expert/portfolio/remove/${portfolioSeq}?userId=${userId}`)
  console.log('포트폴리오 삭제', response)
  return response
}

export const reorderPortfolio = async (data) => {
  const response = await instance.post(`/expert/portfolio/modify/sort`, data)
  console.log('전문가 포트폴리오 순서변경', response)
  return response
}

export const getReviews = async (expertSeq) => {
  const response = await instance.get(`/expert/review/get?expertSeq=${expertSeq}`)
  console.log('전문가 리뷰 조회', response)
  return response
}

export const getReviewComments = async () => {
  const response = await instance.get(`/expert/review/score-comment/get?score=5`)
  console.log('전문가 리뷰 선택사항 조회', response)
  return response
}

export const createReview = async (data) => {
  const response = await instance.post('/expert/review/create', data)
  console.log('리뷰 작성', response)
  return response
}

// 리뷰 수정 (아직 사용하는 곳은 없음)
export const editReview = async (seq, data) => {
  const response = await instance.post(`/expert/review/modify/${seq}`, data)
  console.log('리뷰 수정', response)
  return response
}

export const deleteReview = async (reviewSeq, userId) => {
  const response = await instance.post(`/expert/review/remove/${reviewSeq}?userId=${userId}`)
  console.log('리뷰 삭제', response)
  return response
}

export const uploadFile = async (data) => {
  const response = await instance.post(`/file/create`, data)
  console.log('파일 업로드', response)
  return response
}

export const getFavoriteExpert = async (data) => {
  const response = await instance.get('/client/dibs/read', { params: data })
  console.log('전문가 찜 여부 조회', response)
  return response
}

export const getFavoriteExperts = async (data) => {
  const response = await instance.get('/client/dibs/get', { params: data })
  console.log('찜한 전문가 목록 조회', response)
  return response
}

export const modifyFavoriteExpert = async (data) => {
  const response = await instance.post('/client/dibs/proc', data)
  console.log('전문가 찜 등록/해제', response)
  return response
}

export const createClient = async (data) => {
  const response = await instance.post('/client/create', data)
  console.log('클라이언트 등록', response)
  return response
}

export const editClient = async (data) => {
  const response = await instance.post('/client/modify', data)
  console.log('클라이언트 정보 수정', response)
  return response
}

export const getTokenInfo = async (data) => {
  const response = await instance.get('/token/get', { params: data })
  console.log('토큰 정보 조회', response)
  return response
}

export const getTotalTokens = async (data) => {
  const response = await instance.get('/token/total/read', { params: data })
  console.log('토큰 잔액 조회', response)
  return response
}

export const createTokens = async (data) => {
  const response = await instance.post('/token/create', data)
  console.log('새로운 토큰 정보 생성')
  return response
}

export const modifyQuotation = async (quoteSeq, data) => {
  const response = await instance.post(`/estimate/item/modify/${quoteSeq}`, data)
  console.log('견적 요청에 대한 회신', response)
  return response
}

export const createQuotation = async (data) => {
  const response = await instance.post('/estimate/create', data)
  console.log('견적 요청 등록', response)
  return response
}

export const getFavoriteForm = async (expertSeq, data) => {
  const sortedData = {
    sort: 'seq,desc',
    ...data
  }
  const response = await instance.get(`/estimate/frequent/get/${expertSeq}`, { params: sortedData })
  console.log('자주쓰는 견적서 조회', response)
  return response
}

export const modifyFavoriteForm = async (formSeq, data) => {
  const response = await instance.post(`/estimate/frequent/modify/${formSeq}`, data)
  console.log('자주쓰는 견적서 수정', response)
  return response
}

export const deleteFavoriteForm = async (formSeq) => {
  const response = await instance.post(`/estimate/frequent/remove/${formSeq}`)
  console.log('자주쓰는 견적서 삭제', response)
  return response
}

export const getClientQuotation = async (quoteSeq, userId) => {
  const response = await instance.get(`/estimate/item/client-read/${quoteSeq}?userId=${userId}`)
  console.log('견적서 (클라이언트) 조회', response)
  return response
}

export const getClientQuotations = async (clientSeq, data) => {
  const response = await instance.get(`/estimate/client-get/${clientSeq}`, { params: data })
  console.log('견적서 요청 리스트 (클라이언트) 조회', response)
  return response
}

export const getClientQuoteDetails = async (quoteSeq, userId) => {
  const response = await instance.get(`/estimate/item/client-get/${quoteSeq}?userId=${userId}`)
  console.log('견적서 수신 리스트 (클라이언트) 조회', response)
  return response
}

export const modifyQuotations = async (quoteSeq, data) => {
  const response = await instance.post(`/estimate/modify/${quoteSeq}`, data)
  console.log('견적서 수정', response)
  return response
}

export const getExpertQuotation = async (quoteSeq, userId) => {
  const response = await instance.get(`/estimate/item/expert-read/${quoteSeq}?userId=${userId}`)
  console.log('견적서 (전문가) 조회', response)
  return response
}

export const getExpertQuotations = async (expertSeq, data) => {
  const response = await instance.get(`/estimate/item/expert-get/${expertSeq}`, { params: data })
  console.log('견적서 수신 리스트 (전문가) 조회', response)
  return response
}

export const getAccountInfo = async (data) => {
  const response = await instance.get(`/member/read`, { params: data })
  console.log('회원 정보 조회', response)
  return response
}

export const editAccountType = async (data) => {
  const response = await instance.post(`/member/modify`, data)
  console.log('회원 유형 전환', response)
  return response
}

import axios from 'axios'

const instance = axios.create({ baseURL: '/gabiacns' })
instance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => {
    return response.data.body.data
  },
  (error) => {
    console.error('가비아커머스 API 요청 오류:', error)
    throw error.response ? error.response.data : error
  }
)

export const getGoodsData = async (data) => {
  const response = await instance.get('/goods/regist', { params: data })
  console.log('토큰 충전 관련 정보 받아오기', response)
  return response
}

export const requestChargeTokens = async (data) => {
  const response = await instance.post('/orders/moa', { params: data })
  console.log('토큰 충전', response)
  return response
}

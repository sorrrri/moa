import axios from 'axios'

const instance = axios.create({ baseURL: '/member' })
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
    console.error('가비아 계정정보 API 요청 오류:', error)
    throw error.response ? error.response.data : error
  }
)

export const getAccountData = async () => {
  const response = await instance.get('/basic')
  console.log('가비아커머스에서 받은 회원 정보 조회', response)
  return response
}

// 로그인
export const getLoginData = async () => {
  const response = await instance.get('/login')
  console.log('로그인', response)
  return response
}

// 로그아웃
export const getLogoutData = async () => {
  const response = await instance.get('/logout')
  console.log('로그아웃', response)
  return response
}

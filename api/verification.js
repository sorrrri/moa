import axios from 'axios'

const instance = axios.create({ baseURL: '/certify' })
instance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('검증 API 요청 오류: ', error)
    throw error.response ? error.response.data : error
  }
)

export const createVerifyForm = async (data) => {
  return await instance.get('/', { params: data })
}

export const createExpert = async (data) => {
  return await instance.post('/expert', data)
}

export const requestVerifyCode = async (data) => {
  const response = await instance.get('/client/send', { params: data })
  console.log('검증용 SMS 코드 발송: ', response)
  return response
}

export const responseVerifyCodeResult = async (data) => {
  const response = await instance.post('/client/auth', data)
  console.log('입력한 SMS 코드 검증: ', response)
  return response
}

export const terminateExpert = async (data) => {
  const response = await instance.post('/expert/termination/regist', data)
  console.log('전문가 해지: ', response)
  return response
}

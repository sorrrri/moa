import axios from 'axios'

const instance = axios.create({ baseURL: '/cms' })
instance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
)
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('게시판 API 요청 오류:', error)
    throw error.response ? error.response.data : error
  }
)

export const getEvents = async (data) => {
  const response = await instance.get('/list', data)
  console.log('모아커머스 이벤트 게시글 조회', response)
  return response
}

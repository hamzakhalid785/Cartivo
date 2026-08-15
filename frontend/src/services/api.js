import axios from 'axios'

const api = axios.create({
  baseURL: 'https://hamza555.pythonanywhere.com/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')

  console.log('TOKEN:', token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
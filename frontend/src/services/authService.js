import api from './api'

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register/', userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await api.post(
    '/auth/token/',
    credentials
  )

  localStorage.setItem(
    'accessToken',
    response.data.access
  )

  localStorage.setItem(
    'refreshToken',
    response.data.refresh
  )

  return response.data
}

export const getProfile = async () => {
  const token = localStorage.getItem('accessToken')

  const response = await api.get('/auth/profile/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const logoutUser = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
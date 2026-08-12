import api from './api'

export const createOrder = async (orderData) => {
  const response = await api.post(
    '/orders/create/',
    orderData
  )

  return response.data
}

export const getMyOrders = async () => {
  const response = await api.get('/orders/')
  return response.data
}
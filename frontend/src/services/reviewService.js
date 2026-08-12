import api from './api'

export const getReviews = async (productId) => {
    const response = await api.get(`/products/${productId}/reviews/`)

    return response.data
}

export const createReview = async (productId, reviewData) => {
    const response = await api.post(`/products/${productId}/reviews/`,
        reviewData
    )

    return response.data
}
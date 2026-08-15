import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { addToCart } from '../services/cartService'
import { addToWishlist } from '../services/wishlistService'
import { getReviews, createReview } from '../services/reviewService'

function ProductDetails() {
  const { id } = useParams()

  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')
  const [quantity, setQuantity] = useState(1)

  const [wishlistMessage, setWishlistMessage] = useState('')
  const [cartMessage, setCartMessage] = useState('')
  const [cartError, setCartError] = useState('')
  const [adding, setAdding] = useState(false)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadReviews = async () => {
    if (!product?.id) return

    try {
      const data = await getReviews(product.id)
      setReviews(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddToCart = async () => {
    setCartMessage('')
    setCartError('')
    setAdding(true)

    try {
      await addToCart(product.id, quantity)
      setCartMessage('Product added to cart successfully!')
    } catch (err) {
      setCartError(
        err.response?.data?.error ||
        'Failed to add product to cart.'
      )
    } finally {
      setAdding(false)
    }
  }

  const handleAddToWishlist = async () => {
    setWishlistMessage('')

    try {
      await addToWishlist(product.id)
      setWishlistMessage('Added to wishlist.')
    } catch (err) {
      setWishlistMessage('Please login to use wishlist.')
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}/`)
        setProduct(response.data)
      } catch (err) {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product?.id) {
      loadReviews()
    }
  }, [product])

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-sm text-gray-500">
          Loading product...
        </p>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-950">
            Product Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            {error || 'This product is no longer available.'}
          </p>
        </div>
      </section>
    )
  }

  const finalPrice =
    Number(product.price) -
    (Number(product.price) * Number(product.discount)) / 100

  return (
  <section>

    {/* Product Section */}
    <div className="grid gap-10 lg:grid-cols-2">

      {/* Product Image */}
      <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white">
  <div className="flex min-h-[600px] items-center justify-center bg-gray-50">
    {product.image ? (
      <img
        src={product.image}
        alt={product.name}
        className="h-[600px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
      />
    ) : (
      <span className="text-sm text-gray-400">
        No image available
      </span>
    )}
  </div>
</div>

      {/* Product Information */}
      <div className="flex flex-col justify-center py-4 lg:py-8">

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            {product.category_name}
          </span>

          {Number(product.discount) > 0 && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Sale
            </span>
          )}
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
          {product.name}
        </h1>

        <p className="mt-6 max-w-xl leading-7 text-gray-600">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-8">

          <span className="text-3xl font-bold text-gray-950">
            Rs. {finalPrice.toFixed(2)}
          </span>

          {Number(product.discount) > 0 && (
            <>
              <span className="text-lg text-gray-400 line-through">
                Rs. {product.price}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {product.discount}% OFF
              </span>
            </>
          )}

        </div>

        {/* Stock */}
        <div className="mt-6">

          {product.stock > 0 ? (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span>
                In stock — {product.stock} available
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <span>
                Out of stock
              </span>
            </div>
          )}

        </div>

        {/* Quantity */}
        <div className="mt-7">

          <p className="mb-3 text-sm font-semibold text-gray-900">
            Quantity
          </p>

          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 bg-white">

            <button
              onClick={() =>
                setQuantity((current) =>
                  Math.max(1, current - 1)
                )
              }
              disabled={product.stock === 0}
              className="h-11 w-11 text-lg text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span className="flex h-11 w-12 items-center justify-center border-x border-gray-200 text-sm font-semibold text-gray-950">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity((current) =>
                  Math.min(product.stock, current + 1)
                )
              }
              disabled={product.stock === 0}
              className="h-11 w-11 text-lg text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>

          </div>

        </div>

        {/* Actions */}
        <div className="mt-7 space-y-3">

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || adding}
            className="w-full rounded-xl bg-gray-950 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {product.stock === 0
              ? 'Out of Stock'
              : adding
                ? 'Adding...'
                : 'Add to Cart'}
          </button>

          <button
            onClick={handleAddToWishlist}
            className="w-full rounded-xl border border-gray-300 bg-white py-4 text-sm font-semibold text-gray-900 transition hover:border-gray-950 hover:bg-gray-50"
          >
            ♡ Add to Wishlist
          </button>

        </div>

        {/* Messages */}
        {wishlistMessage && (
          <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-center text-sm text-gray-600">
            {wishlistMessage}
          </p>
        )}

        {cartMessage && (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
            {cartMessage}
          </p>
        )}

        {cartError && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {cartError}
          </p>
        )}

      </div>
    </div>

    {/* Reviews Section */}
    <div className="mt-20 border-t border-gray-200 pt-14">

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Customer Feedback
        </p>

        <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">
              Customer Reviews
            </h2>

            <p className="mt-2 text-gray-500">
              See what other customers think about this product.
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {reviews.length}{' '}
            {reviews.length === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

        {/* Review Form */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">

          <div>
            <h3 className="text-lg font-bold text-gray-950">
              Write a review
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Share your experience with this product.
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault()

              try {
                await createReview(product.id, {
                  rating,
                  comment,
                })

                setComment('')
                setRating(5)
                setReviewMessage(
                  'Review submitted successfully!'
                )

                await loadReviews()
              } catch (err) {
                setReviewMessage(
                  err.response?.data?.error ||
                  'Failed to submit review.'
                )
              }
            }}
            className="mt-6 space-y-5"
          >

            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
              >
                <option value={5}>★★★★★ — 5</option>
                <option value={4}>★★★★☆ — 4</option>
                <option value={3}>★★★☆☆ — 3</option>
                <option value={2}>★★☆☆☆ — 2</option>
                <option value={1}>★☆☆☆☆ — 1</option>
              </select>
            </div>

            {/* Comment */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Your Review
              </label>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Write your review..."
                required
                rows="5"
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gray-950 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Submit Review
            </button>

          </form>

          {reviewMessage && (
            <p className="mt-4 rounded-xl bg-gray-50 p-3 text-center text-sm text-gray-600">
              {reviewMessage}
            </p>
          )}

        </div>

        {/* Review List */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">

          {reviews.length === 0 ? (
            <div className="flex min-h-220 items-center justify-center text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg">
                  ★
                </div>

                <p className="mt-4 text-lg font-semibold text-gray-950">
                  No reviews yet
                </p>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Be the first customer to share your experience with this product.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                >

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>
                      <p className="font-semibold text-gray-950">
                        {review.username}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Verified customer
                      </p>
                    </div>

                    <p className="text-sm tracking-wide">
                      <span className="text-amber-500">
                        {'★'.repeat(review.rating)}
                      </span>

                      <span className="text-gray-300">
                        {'☆'.repeat(5 - review.rating)}
                      </span>
                    </p>

                  </div>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {review.comment}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>

  </section>
)
}

export default ProductDetails
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getCart,
  removeFromCart,
  updateCartItem,
} from '../services/cartService'

function Cart() {
  const navigate = useNavigate()

  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCart = async () => {
    try {
      const data = await getCart()
      setCart(data)
      setError('')
    } catch (err) {
      setError('Please login to view your cart.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId)
      await fetchCart()
    } catch (err) {
      setError('Failed to remove item.')
    }
  }

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const updatedCart = await updateCartItem(
        itemId,
        quantity
      )

      setCart(updatedCart)
      setError('')
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Failed to update quantity.'
      )
    }
  }

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-sm text-gray-500">
          Loading cart...
        </p>
      </section>
    )
  }

  if (error && !cart) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Shopping Bag
          </p>

          <h2 className="mt-4 text-2xl font-bold text-gray-950">
            Login Required
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please login to view and manage your cart.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-block rounded-xl bg-gray-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </Link>
        </div>
      </section>
    )
  }

  const items = cart?.items || []

  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.product_price) * item.quantity,
    0
  )

  return (
    <section>

      {/* Header */}
      <div className="mb-10 border-b border-gray-200 pb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Shopping Bag
        </p>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-950">
              Your Cart
            </h1>

            <p className="mt-2 text-gray-500">
              Review your selected products before checkout.
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {items.length}{' '}
            {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty Cart */}
      {items.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Shopping Bag
          </p>

          <h2 className="mt-4 text-2xl font-bold text-gray-950">
            Your cart is empty
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            You haven't added anything to your cart yet.
            Explore our products and find something you like.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded-xl bg-gray-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (

        <div className="grid items-start gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">

            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 sm:p-6"
              >

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                  {/* Product Info */}
                  <div className="min-w-0">

                    <h2 className="truncate text-lg font-semibold text-gray-950">
                      {item.product_name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Rs.{' '}
                      {Number(item.product_price).toFixed(2)}
                      {' '}each
                    </p>

                    {/* Quantity */}
                    <div className="mt-5 flex items-center">

                      <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">

                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="h-10 w-10 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="flex h-10 w-12 items-center justify-center border-x border-gray-200 text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="h-10 w-10 text-lg transition hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* Price + Remove */}
                  <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">

                    <p className="text-lg font-bold text-gray-950">
                      Rs.{' '}
                      {(
                        Number(item.product_price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                    <button
                      onClick={() =>
                        handleRemove(item.id)
                      }
                      className="text-sm font-medium text-gray-500 underline underline-offset-4 transition hover:text-gray-950"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="sticky top-24 h-fit rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Summary
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-950">
              Order Summary
            </h2>

            <div className="mt-7 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-gray-950">
                  Rs. {total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="font-medium text-gray-950">
                  Free
                </span>
              </div>

            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex items-center justify-between">

              <span className="font-semibold text-gray-950">
                Total
              </span>

              <span className="text-xl font-bold text-gray-950">
                Rs. {total.toFixed(2)}
              </span>

            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-7 w-full rounded-xl bg-gray-950 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="mt-4 block text-center text-sm font-medium text-gray-500 transition hover:text-gray-950"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      )}

    </section>
  )
}

export default Cart
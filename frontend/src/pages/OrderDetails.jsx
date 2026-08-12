import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../services/api'

function OrderDetails() {
  const { id } = useParams()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}/`)
        setOrder(response.data)
      } catch (err) {
        setError(
          err.response?.data?.error ||
          'Unable to load order.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <p className="text-gray-500">
        Loading order...
      </p>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Order #{order.id}
        </h1>

        <p className="mt-2 text-gray-500">
          {new Date(order.created_at).toLocaleString()}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="mt-1 font-semibold capitalize">
              {order.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="mt-1 font-semibold">
              {order.phone}
            </p>
          </div>
        </div>

        <div className="my-6 border-t" />

        <div>
          <p className="text-sm text-gray-500">
            Shipping Address
          </p>

          <p className="mt-1">
            {order.shipping_address}
          </p>
        </div>

        <div className="my-6 border-t" />

        <h2 className="text-xl font-bold">
          Items
        </h2>

        <div className="mt-5 space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4"
            >
              <div>
                <p className="font-medium">
                  {item.product_name}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                Rs.{' '}
                {(
                  Number(item.price) *
                  item.quantity
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between border-t pt-6">
          <span className="text-lg font-bold">
            Total
          </span>

          <span className="text-lg font-bold">
            Rs. {order.total_amount}
          </span>
        </div>
      </div>

      <Link
        to="/orders"
        className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white"
      >
        Back to My Orders
      </Link>
    </section>
  )
}

export default OrderDetails
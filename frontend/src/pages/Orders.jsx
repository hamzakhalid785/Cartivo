import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../services/orderService'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders()
        setOrders(data)
      } catch (err) {
        setError('Unable to load your orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <p className="text-gray-500">Loading orders...</p>
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
  <section>

    {/* Header */}
    <div className="mb-10 border-b border-gray-200 pb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        Account
      </p>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            My Orders
          </h1>

          <p className="mt-3 text-gray-500">
            Track and review your previous purchases.
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {orders.length}{' '}
          {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>
    </div>

    {orders.length === 0 ? (
      /* Empty State */
      <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Order History
        </p>

        <h2 className="mt-4 text-2xl font-bold text-gray-950">
          No orders yet
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          You haven't placed any orders yet. Start shopping
          to see your purchases here.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-xl bg-gray-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start Shopping
        </Link>

      </div>
    ) : (

      /* Orders */
      <div className="space-y-5">

        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 sm:p-7"
          >

            {/* Order Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Order
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-950">
                  #{order.id}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </p>
              </div>

              <span className="w-fit rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold capitalize text-gray-700">
                {order.status}
              </span>

            </div>

            <div className="my-6 border-t border-gray-200" />

            {/* Items */}
            <div className="space-y-4">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-950">
                      {item.product_name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-950">
                    Rs.{' '}
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            {/* Total */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">

              <span className="text-sm font-medium text-gray-500">
                Order Total
              </span>

              <span className="text-xl font-bold text-gray-950">
                Rs. {Number(order.total_amount).toFixed(2)}
              </span>

            </div>

          </div>
        ))}

      </div>
    )}

  </section>
)
}
export default Orders
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orderService'

function Checkout() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    shipping_address: '',
    phone: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const order = await createOrder(form)

      navigate(`/orders/${order.id}`)
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Failed to place order.'
      )
    } finally {
      setLoading(false)
    }
  }

return (
  <section className="mx-auto max-w-3xl">

    {/* Header */}
    <div className="mb-10 border-b border-gray-200 pb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        Order Placement
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-gray-950">
        Checkout
      </h1>

      <p className="mt-3 text-gray-500">
        Enter your delivery information to complete your order.
      </p>
    </div>

    {/* Error */}
    {error && (
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    )}

    {/* Checkout Card */}
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-950">
          Delivery Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          We'll use these details to deliver your order.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-7"
      >

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Shipping Address
          </label>

          <textarea
            name="shipping_address"
            value={form.shipping_address}
            onChange={handleChange}
            placeholder="Enter your complete delivery address"
            required
            rows="5"
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
          />

          <p className="mt-2 text-xs text-gray-400">
            Include house number, street, city and any relevant details.
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="03XXXXXXXXX"
            required
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
          />

          <p className="mt-2 text-xs text-gray-400">
            We'll use this number for delivery contact.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-7">

          <div className="mb-5 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Payment
            </span>

            <span className="font-medium text-gray-900">
              Cash on Delivery
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gray-950 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {loading
              ? 'Placing Order...'
              : 'Place Order'}
          </button>

        </div>

      </form>
    </div>

    {/* Security note */}
    <p className="mt-5 text-center text-xs text-gray-400">
      Your order information is securely processed.
    </p>

  </section>
)
}

export default Checkout
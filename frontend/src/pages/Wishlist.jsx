import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getWishlist,
  removeFromWishlist,
} from '../services/wishlistService'

function Wishlist() {
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist()
      setWishlist(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId)
    fetchWishlist()
  }

  if (loading) {
    return <p>Loading wishlist...</p>
  }

  const products = wishlist?.products || []

  return (
  <section>

    {/* Header */}
    <div className="mb-10 border-b border-gray-200 pb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        Saved Items
      </p>

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            My Wishlist
          </h1>

          <p className="mt-3 text-gray-500">
            Products you've saved for later.
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {products.length}{' '}
          {products.length === 1 ? 'item' : 'items'}
        </span>
      </div>
    </div>

    {products.length === 0 ? (
      <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Wishlist
        </p>

        <h2 className="mt-4 text-2xl font-bold text-gray-950">
          Your wishlist is empty
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          Save products you like and come back to them whenever
          you're ready.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-xl bg-gray-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Browse Products
        </Link>

      </div>
    ) : (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-gray-300"
          >

            <div className="flex min-h-32 items-center justify-center rounded-xl bg-gray-50">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Saved Product
              </span>
            </div>

            <div className="mt-5">
              <h2 className="truncate text-lg font-semibold text-gray-950">
                {product.name}
              </h2>

              <p className="mt-2 text-lg font-bold text-gray-950">
                Rs. {Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="mt-5 flex gap-3">

              <Link
                to={`/products/${product.id}`}
                className="flex-1 rounded-xl bg-gray-950 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                View Product
              </Link>

              <button
                onClick={() => handleRemove(product.id)}
                className="rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-500 transition hover:border-gray-950 hover:text-gray-950"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>
    )}

  </section>
)
}
export default Wishlist
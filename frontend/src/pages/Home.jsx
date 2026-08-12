import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>

      {/* Hero */}
      <section className="relative mb-20 overflow-hidden rounded-3xl bg-gray-950 px-8 py-20 text-white md:px-16 md:py-28">

        <div className="relative z-10 max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
            Welcome to Cartivo
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Better products.
            <br />
            Better choices.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
            Discover quality products, explore new arrivals, and shop
            everything you need from one simple place.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-gray-200"
            >
              Shop Now
            </Link>

            <Link
              to="/wishlist"
              className="rounded-xl border border-gray-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              View Wishlist
            </Link>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gray-800" />
        <div className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full border border-gray-800" />
      </section>

      {/* Featured Products */}
      <section>
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Our Collection
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-950">
              Featured Products
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-sm text-gray-500">
              {products.length} products
            </span>

            <Link
              to="/products"
              className="text-sm font-semibold text-gray-950 underline underline-offset-4 hover:text-gray-600"
            >
              View all
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center">
            <p className="text-sm text-gray-500">
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-950">
              No products found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no products available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mt-20 rounded-3xl border border-gray-200 bg-white px-8 py-14 text-center md:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Cartivo
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
          Find something you'll love.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Browse our complete collection and discover products selected
          for quality and value.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-block rounded-xl bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Explore Products
        </Link>
      </section>

    </div>
  )
}

export default Home
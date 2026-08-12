import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import {
  getProducts,
  getCategories,
} from '../services/productService'

function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts()
        setProducts(productsData)

        try {
          const categoriesData = await getCategories()
          setCategories(categoriesData)
        } catch (err) {
          console.error('Categories failed to load:', err)
          setCategories([])
        }
      } catch (err) {
        console.error('Products failed to load:', err)
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    const searchValue = search.trim().toLowerCase()

    if (searchValue) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue)
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) =>
          String(product.category) === String(selectedCategory)
      )
    }

    if (sort === 'price-low') {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      )
    }

    if (sort === 'price-high') {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      )
    }

    if (sort === 'name-az') {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }

    return result
  }, [products, search, selectedCategory, sort])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('all')
    setSort('default')
  }

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-sm text-gray-500">
          Loading products...
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 text-center">
        <p className="text-sm font-medium text-gray-600">
          {error}
        </p>
      </section>
    )
  }

  return (
    <section>

      {/* Header */}
      <div className="mb-12 border-b border-gray-200 pb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Cartivo Collection
        </p>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              All Products
            </h1>

            <p className="mt-3 max-w-xl text-gray-500">
              Explore our complete collection and find products
              that fit your needs.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1
              ? 'product'
              : 'products'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">

        <div className="grid gap-5 md:grid-cols-3">

          {/* Search */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Sort By
            </label>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-950 focus:bg-white focus:ring-1 focus:ring-gray-950"
            >
              <option value="default">
                Default
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="name-az">
                Name: A-Z
              </option>
            </select>
          </div>

        </div>

        {/* Active filters / clear */}
        {(search ||
          selectedCategory !== 'all' ||
          sort !== 'default') && (
          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">

            <p className="text-sm text-gray-500">
              Filters applied
            </p>

            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-gray-950 underline underline-offset-4 hover:text-gray-500"
            >
              Clear filters
            </button>

          </div>
        )}
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center">

          <h2 className="text-2xl font-bold text-gray-950">
            No products found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            We couldn't find any products matching your
            current filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-7 rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Clear Filters
          </button>

        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  )
}

export default Products
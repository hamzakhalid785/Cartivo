import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const finalPrice =
    Number(product.price) -
    (Number(product.price) * Number(product.discount)) / 100

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">

      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative block overflow-hidden bg-gray-100"
      >
        <div className="flex h-72 items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="text-sm text-gray-400">
              No image available
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {Number(product.discount) > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-gray-950 px-3 py-1.5 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {product.category_name}
        </p>

        <h2 className="mt-2 text-lg font-semibold tracking-tight text-gray-950">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-5 flex items-center gap-3">
          <span className="text-xl font-bold text-gray-950">
            Rs. {finalPrice.toFixed(2)}
          </span>

          {Number(product.discount) > 0 && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {Number(product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock */}
        {product.stock > 0 ? (
          <p className="mt-3 text-xs font-medium text-gray-500">
            {product.stock} available
          </p>
        ) : (
          <p className="mt-3 text-xs font-semibold text-gray-500">
            Out of stock
          </p>
        )}

        {/* Button */}
        <Link
          to={`/products/${product.id}`}
          className="mt-5 block w-full rounded-xl bg-gray-950 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          View Product
        </Link>

      </div>
    </article>
  )
}

export default ProductCard
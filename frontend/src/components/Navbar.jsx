import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-950"
        >
          Cartivo
        </Link>

        {/* Main Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Shop
          </Link>

          <Link
            to="/orders"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            My Orders
          </Link>

          <Link
            to="/wishlist"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Wishlist
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-950 hover:bg-gray-50"
          >
            Login
          </Link>

          <Link
            to="/cart"
            className="rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Cart
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
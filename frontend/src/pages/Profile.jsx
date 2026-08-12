import { useEffect, useState } from 'react'
import { getProfile, logoutUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => {
        logoutUser()
        navigate('/login')
      })
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  if (loading) {
    return <p>Loading profile...</p>
  }

  return (
  <section className="mx-auto max-w-2xl">

    {/* Header */}
    <div className="mb-10 border-b border-gray-200 pb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        Account
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-gray-950">
        My Profile
      </h1>

      <p className="mt-3 text-gray-500">
        Manage your account information.
      </p>
    </div>

    {/* Profile Card */}
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">

      {/* Avatar */}
      <div className="flex items-center gap-5 border-b border-gray-200 pb-7">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-950 text-xl font-bold text-white">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-950">
            {user.username}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Cartivo Member
          </p>
        </div>
      </div>

      {/* Account Information */}
      <div className="mt-7 space-y-6">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Username
          </p>

          <p className="mt-2 text-base font-medium text-gray-950">
            {user.username}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Email Address
          </p>

          <p className="mt-2 text-base font-medium text-gray-950">
            {user.email || 'Not provided'}
          </p>
        </div>

      </div>

      {/* Logout */}
      <div className="mt-8 border-t border-gray-200 pt-7">
        <button
          onClick={handleLogout}
          className="w-full rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white"
        >
          Logout
        </button>
      </div>

    </div>

  </section>
)
}
export default Profile
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary-900 mb-4">
          Room Finder & Roommate
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find your perfect room and compatible roommates
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate({ to: '/room-owner/dashboard' })}
            className="btn-primary text-lg px-8 py-3"
          >
            Room Owner Dashboard
          </button>
          <button
            onClick={() => navigate({ to: '/login' })}
            className="btn-secondary text-lg px-8 py-3"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

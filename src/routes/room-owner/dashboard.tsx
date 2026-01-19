import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { supabase, RoomListing } from '@/lib/supabase'
import { Plus, Edit, Trash2, Home, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/room-owner/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const navigate = useNavigate()
  const [listings, setListings] = useState<RoomListing[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
    fetchListings()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigate({ to: '/login' })
      return
    }
    setUser(user)
  }

  const fetchListings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('room_listings')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setListings(data || [])
    } catch (error: any) {
      toast.error('Failed to fetch listings: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return

    try {
      const { error } = await supabase
        .from('room_listings')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast.success('Listing deleted successfully')
      fetchListings()
    } catch (error: any) {
      toast.error('Failed to delete listing: ' + error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Home className="w-6 h-6 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Room Owner Dashboard by Abhigyan & Pranay</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">My Room Listings</h2>
          <button
            onClick={() => navigate({ to: '/room-owner/add-listing' })}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Listing
          </button>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="card text-center py-12">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first room listing</p>
            <button
              onClick={() => navigate({ to: '/room-owner/add-listing' })}
              className="btn-primary"
            >
              Add Your First Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="card hover:shadow-lg transition-shadow">
                {listing.images && listing.images.length > 0 && (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h3>
                <p className="text-gray-600 mb-2 flex items-center gap-1">
                  📍 {listing.location}
                </p>
                <p className="text-primary-600 font-bold text-xl mb-2">
                  ₹{listing.price.toLocaleString()}/month
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm">
                    {listing.property_type}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {listing.tenant_type}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {listing.owner_type}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate({ 
                      to: '/room-owner/edit-listing/$id', 
                      params: { id: listing.id! } 
                    })}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(listing.id!)}
                    className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

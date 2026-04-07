
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AdminListing from '../Pages/AdminListing'
import AdminUsers from '../Pages/AdminUsers'
import AdminSidebar from './AdminSidebar'

export default function AdminHome({openListings, openUsers}) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    rentListings: 0,
    sellListings: 0,
    latestListings: [],
    latestUsers: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState('dashboard')

  const getAdminStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get('/api/admin/stats', { withCredentials: true })
      console.log("Response:", res)
      console.log("Data:", res.data)
      
      // Ensure we're setting the data correctly
      setStats({
        totalUsers: res.data.totalUsers || 0,
        totalListings: res.data.totalListings || 0,
        rentListings: res.data.rentListings || 0,
        sellListings: res.data.sellListings || 0,
        latestListings: res.data.latestListings || [],
        latestUsers: res.data.latestUsers || []
      })
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Failed to fetch stats")
    } finally {
      setLoading(false)
    }
  }

  // Auto-load stats on component mount
  useEffect(() => {
    getAdminStats()
  }, [])

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 transition-transform hover:scale-105" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2" style={{ color }}>{value}</p>
        </div>
        <div className="text-4xl opacity-20" style={{ color }}>{icon}</div>
      </div>
    </div>
  )

  return (
    <div className='flex flex-row '>
        <AdminSidebar />
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Welcome back! Here's what's happening with your platform.</p>
              <AdminUsers/>
            </div>
            <button 
              onClick={getAdminStats}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center gap-2 shadow-md"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Data
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

      
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Users" value={stats.totalUsers} icon="👥" color="#3B82F6" />
              <StatCard title="Total Listings" value={stats.totalListings} icon="🏠" color="#10B981" />
              <StatCard title="Rent Listings" value={stats.rentListings} icon="📄" color="#F59E0B" />
              <StatCard title="Sell Listings" value={stats.sellListings} icon="💰" color="#EF4444" />
            </div>

            
           
          </>
        

      </div>
    </div>
    </div>
  )
}
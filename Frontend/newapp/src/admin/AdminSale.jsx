import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { socket } from '../socket/socket'

export default function AdminSale() {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const getListings = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get('/api/admin/listings', { withCredentials: true })
            const all = res.data.listings || []
            setListings(all.filter(l => l.type === 'sale'))
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch listings")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getListings()
        socket.on('newListing', () => getListings())
        return () => socket.off('newListing')
    }, [])

    const filteredListings = listings.filter(listing =>
        listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.address?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await axios.delete(`/api/admin/listings/${id}`, { withCredentials: true })
                setListings(listings.filter(l => l._id !== id))
            } catch (err) {
                alert("Failed to delete listing")
            }
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">Sale</span>
                        <h2 className="text-2xl font-bold text-gray-800">Sale Listings</h2>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Total {filteredListings.length} sale listings</p>
                </div>
                <button
                    onClick={getListings}
                    disabled={loading}
                    className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search sale listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">⚠️ {error}</div>
            )}

            {/* Loading */}
            {loading && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-2 text-gray-500">Loading sale listings...</p>
                </div>
            )}

            {/* Grid */}
            {!loading && (
                <>
                    {filteredListings.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="text-gray-500 text-lg">No sale listings found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredListings.map((listing) => (
                                <div key={listing._id} className="border rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                                    <div className="relative h-48 bg-gray-200">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            src={listing.imgUrls?.[0] ? `http://localhost:8000/${listing.imgUrls[0]}` : '/placeholder_1.jpg'}
                                            alt={listing.title}
                                            onError={(e) => e.target.src = '/placeholder_1.jpg'}
                                        />
                                        <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            sale
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-1 truncate">{listing.title}</h3>
                                        <p className="text-xl font-bold text-blue-600 mb-2">
                                            ${listing.regularPrice?.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3 truncate">{listing.address || 'No address'}</p>
                                        <div className="flex gap-2">
                                            <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(listing._id)}
                                                className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

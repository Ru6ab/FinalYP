

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AdminSidebar from '../admin/AdminSidebar'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalUsers: 0, totalListings: 0, rentListings: 0,
    sellListings: 0, latestListings: [], latestUsers: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)

  const getAdminStats = async () => {
    try {
      setLoading(true); setError(null)
      const res = await axios.get('/api/admin/stats', { withCredentials: true })
      setStats({
        totalUsers:     res.data.totalUsers     || 0,
        totalListings:  res.data.totalListings  || 0,
        rentListings:   res.data.rentListings   || 0,
        sellListings:   res.data.sellListings   || 0,
        latestListings: res.data.latestListings || [],
        latestUsers:    res.data.latestUsers    || [],
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats')
    } finally { setLoading(false) }
  }

  useEffect(() => {
    getAdminStats()
    setTimeout(() => setMounted(true), 80)
  }, [])

  const rentPct    = stats.totalListings > 0 ? Math.round((stats.rentListings / stats.totalListings) * 100) : 0
  const sellPct    = stats.totalListings > 0 ? Math.round((stats.sellListings / stats.totalListings) * 100) : 0
  const avgPerUser = stats.totalUsers > 0 ? (stats.totalListings / stats.totalUsers).toFixed(1) : '—'

  const now      = new Date()
  const hour     = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const dateStr  = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  const avatarColors = [
    'bg-blue-500', 'bg-emerald-500', 'bg-amber-500',
    'bg-red-500',  'bg-violet-500',  'bg-pink-500'
  ]

  const statCards = [
    { title: 'Total Users',    value: stats.totalUsers,    icon: '👥', border: 'border-t-blue-500',   text: 'text-blue-600'   },
    { title: 'Total Listings', value: stats.totalListings, icon: '🏠', border: 'border-t-emerald-500', text: 'text-emerald-600' },
    { title: 'Rent Listings',  value: stats.rentListings,  icon: '🔑', border: 'border-t-amber-500',  text: 'text-amber-600'  },
    { title: 'Sell Listings',  value: stats.sellListings,  icon: '💰', border: 'border-t-red-500',    text: 'text-red-600'    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-7 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800">{greeting} 👋</h1>
              <p className="text-xs text-slate-400 mt-0.5">{dateStr}</p>
            </div>
            <button
              onClick={getAdminStats}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 disabled:bg-slate-400 transition-colors"
            >
              <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-7 py-7 pb-16 flex flex-col gap-6">

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map(({ title, value, icon, border, text }, i) => (
              <div
                key={title}
                className={`bg-white rounded-xl shadow-sm border-t-4 ${border} p-5 flex justify-between items-start hover:-translate-y-1 hover:shadow-md transition-all duration-200
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</p>
                  <p className={`text-4xl font-black ${text}`}>{value}</p>
                </div>
                <div className="text-2xl">{icon}</div>
              </div>
            ))}
          </div>

          {/* BREAKDOWN + HEALTH */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Listing Mix */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700">Listing Mix</h3>
                <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                  {stats.totalListings} total
                </span>
              </div>
              <div className="p-5 flex items-center gap-5">
                {/* SVG Donut */}
                <div className="relative w-24 h-24 shrink-0">
                  <svg width="96" height="96" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="6"/>
                    {stats.totalListings > 0 && <>
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="6"
                        strokeDasharray={`${rentPct} ${100 - rentPct}`} strokeDashoffset="25"/>
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#EF4444" strokeWidth="6"
                        strokeDasharray={`${sellPct} ${100 - sellPct}`} strokeDashoffset={`${25 - rentPct}`}/>
                    </>}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-slate-800 leading-none">{stats.totalListings}</span>
                    <span className="text-xs text-slate-400">total</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  {[
                    { label: 'Rent', value: stats.rentListings, pct: rentPct, color: 'bg-amber-400', text: 'text-amber-600' },
                    { label: 'Sell', value: stats.sellListings, pct: sellPct, color: 'bg-red-400',   text: 'text-red-600'   },
                  ].map(({ label, value, pct, color, text }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-semibold text-slate-600">{label}</span>
                        <span className={`text-xs font-bold ${text}`}>{value} · {pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${color} transition-all duration-1000`}
                          style={{ width: mounted ? `${pct}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-px bg-slate-100 border-t border-slate-100">
                {[
                  { label: 'Per User', value: avgPerUser, icon: '📊' },
                  { label: 'Rent',     value: stats.rentListings, icon: '🔑' },
                  { label: 'Sale',     value: stats.sellListings, icon: '🏷️' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="bg-white text-center py-3">
                    <div className="text-base mb-0.5">{icon}</div>
                    <div className="text-lg font-black text-slate-800">{value}</div>
                    <div className="text-xs text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Health */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700">Platform Health</h3>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"/>
                  Live
                </span>
              </div>
              <div className="p-5 flex flex-col gap-4">
                {[
                  { label: 'User Base',        pct: Math.min(stats.totalUsers * 2, 100),    color: 'bg-blue-500',   stat: `${stats.totalUsers} users`     },
                  { label: 'Listing Activity', pct: Math.min(stats.totalListings * 2, 100), color: 'bg-emerald-500', stat: `${stats.totalListings} total`  },
                  { label: 'Rent Demand',      pct: rentPct,                                 color: 'bg-amber-500',  stat: `${rentPct}% of all`            },
                  { label: 'Sales Pipeline',   pct: sellPct,                                 color: 'bg-red-500',    stat: `${sellPct}% of all`            },
                ].map(({ label, pct, color, stat }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600 w-36 shrink-0">{label}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${color} transition-all duration-1000`}
                        style={{ width: mounted ? `${pct}%` : '0%' }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-20 text-right shrink-0">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LATEST LISTINGS + LATEST USERS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Latest Listings */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700">🏠 Latest Listings</h3>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                  {stats.totalListings} total
                </span>
              </div>

              {stats.latestListings.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <div className="text-4xl mb-2">🏚️</div>
                  <p className="text-sm">No listings yet</p>
                </div>
              ) : (
                stats.latestListings.slice(0, 5).map((l, i) => (
                  <div key={l._id || i} className="flex items-center gap-3 px-5 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-none">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 shrink-0">
                      {l.imgUrls?.[0]
                        ? <img src={`http://localhost:8000/${l.imgUrls[0]}`} alt="" className="w-full h-full object-cover"/>
                        : <div className="w-full h-full flex items-center justify-center text-lg">🏠</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{l.title || l.name || 'Unnamed'}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{l.address || 'No address'}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        l.type === 'rent' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {l.type === 'rent' ? '🔑 Rent' : '💰 Sell'}
                      </span>
                      {l.regularPrice && (
                        <span className="text-xs font-bold text-slate-500">${l.regularPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))
              )}

              <div className="px-5 py-3 bg-slate-50 text-center">
                <button
                  onClick={() => navigate('/admin/listings')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  View all listings →
                </button>
              </div>
            </div>

            {/* Latest Users */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700">👥 Latest Users</h3>
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                  {stats.totalUsers} total
                </span>
              </div>

              {stats.latestUsers.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <div className="text-4xl mb-2">👤</div>
                  <p className="text-sm">No users yet</p>
                </div>
              ) : (
                stats.latestUsers.slice(0, 5).map((u, i) => {
                  const initials = (u.email || 'U').slice(0, 2).toUpperCase()
                  return (
                    <div key={u._id || i} className="flex items-center gap-3 px-5 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-none">
                      <div className={`w-9 h-9 rounded-full shrink-0 ${avatarColors[i % 6]} flex items-center justify-center text-white text-xs font-bold overflow-hidden`}>
                        {u.avatar
                          ? <img src={`http://localhost:8000/${u.avatar}`} alt="" className="w-full h-full object-cover"/>
                          : initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{u.email || 'No email'}</p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {u.role === 'admin'
                          ? <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Admin</span>
                          : <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/><span className="text-xs text-slate-400">Active</span></>
                        }
                      </div>
                    </div>
                  )
                })
              )}

              <div className="px-5 py-3 bg-slate-50 text-center">
                <button
                  onClick={() => navigate('/admin/users')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  View all users →
                </button>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'All Listings',  icon: '🏠', color: 'text-emerald-600 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50', path: '/admin/listings'      },
                { label: 'All Users',     icon: '👥', color: 'text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50',             path: '/admin/users'         },
                { label: 'Rent Listings', icon: '🔑', color: 'text-amber-600 border-amber-200 hover:border-amber-400 hover:bg-amber-50',         path: '/admin/listings/rent' },
                { label: 'Sale Listings', icon: '💰', color: 'text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50',                 path: '/admin/listings/sale' },
              ].map(({ label, icon, color, path }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`flex flex-col items-center gap-2 py-5 px-3 bg-white rounded-xl border-2 font-bold text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${color}`}
                >
                  <span className="text-2xl">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

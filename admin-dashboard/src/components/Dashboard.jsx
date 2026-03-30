import { useEffect, useState } from 'react'
import axios from 'axios'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value)

const statCards = [
  {
    key: 'totalItems',
    label: 'Products listed',
    accent: 'from-red-500 via-red-500 to-amber-500',
    note: 'Across the current product catalog',
  },
  {
    key: 'totalRevenue',
    label: 'Revenue captured',
    accent: 'from-amber-500 via-orange-500 to-yellow-400',
    note: 'Calculated from recorded item performance',
  },
  {
    key: 'totalSold',
    label: 'Units sold',
    accent: 'from-red-600 via-orange-500 to-amber-400',
    note: 'Lifetime units fulfilled',
  },
]

function Dashboard({ setActiveView }) {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalRevenue: 0,
    totalSold: 0,
    lowStockItems: 0,
    topCategory: 'No data yet',
    averagePrice: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/items')
      const items = response.data
      const categoryCounts = items.reduce((accumulator, item) => {
        const category = item.category?.trim() || 'Uncategorized'
        accumulator[category] = (accumulator[category] || 0) + 1
        return accumulator
      }, {})

      const [topCategory = 'No data yet'] =
        Object.entries(categoryCounts).sort((first, second) => second[1] - first[1])[0] ?? []

      const totalItems = items.length
      const totalRevenue = items.reduce((sum, item) => sum + (item.revenue_generated || 0), 0)
      const totalSold = items.reduce((sum, item) => sum + (item.total_sold || 0), 0)
      const lowStockItems = items.filter((item) => (item.available_quantity || 0) <= 10).length
      const averagePrice =
        totalItems > 0 ? items.reduce((sum, item) => sum + (item.price || 0), 0) / totalItems : 0

      setStats({
        totalItems,
        totalRevenue,
        totalSold,
        lowStockItems,
        topCategory,
        averagePrice,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center rounded-[2rem] border border-red-100 bg-white shadow-[var(--shadow-soft)]">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-200 border-t-red-500" />
          <p className="text-sm font-medium text-slate-500">Loading dashboard insights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="overflow-hidden rounded-[1.75rem] border border-red-200 bg-[linear-gradient(135deg,#d82418_0%,#e72a1d_60%,#f3b20c_100%)] p-5 text-white shadow-[var(--shadow-soft)] sm:rounded-[2rem] sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr] lg:gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Dharmjivan Dashboard</p>
            <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight sm:text-4xl">
              A brighter admin experience built around your brand.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85">
              See business metrics, stock status, and catalog performance in a cleaner red-and-gold layout
              inspired by the company logo.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setActiveView('add-item')}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Add product
              </button>
              <button
                onClick={() => setActiveView('items')}
                className="rounded-full border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open catalog
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Top category</p>
              <p className="mt-3 text-2xl font-bold">{stats.topCategory}</p>
              <p className="mt-2 text-sm text-white/75">Highest representation in your current catalog.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-black/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Average price</p>
              <p className="mt-3 text-2xl font-bold">{formatCurrency(stats.averagePrice)}</p>
              <p className="mt-2 text-sm text-white/75">Helps benchmark positioning across products.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <article key={card.key} className="relative overflow-hidden rounded-[1.5rem] border border-red-100 bg-white p-5 shadow-[var(--shadow-soft)]">
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accent}`} />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {card.key === 'totalRevenue' ? formatCurrency(stats[card.key]) : stats[card.key]}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">{card.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-red-100 bg-[var(--panel-strong)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Operations pulse</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">What needs attention today</h3>
            </div>
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Live summary</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-red-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-400">Low stock items</p>
              <p className="mt-3 text-3xl font-extrabold text-red-700">{stats.lowStockItems}</p>
              <p className="mt-2 text-sm text-red-700/75">Products with 10 or fewer units remaining.</p>
            </div>
            <div className="rounded-3xl bg-amber-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-500">Sales momentum</p>
              <p className="mt-3 text-3xl font-extrabold text-amber-700">{stats.totalSold}</p>
              <p className="mt-2 text-sm text-amber-700/75">Total fulfilled units across all products.</p>
            </div>
            <div className="rounded-3xl bg-orange-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Catalog depth</p>
              <p className="mt-3 text-3xl font-extrabold text-orange-700">{stats.totalItems}</p>
              <p className="mt-2 text-sm text-orange-700/75">Active items available to shoppers now.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-red-100 bg-[var(--panel-strong)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Quick actions</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">Move faster</h3>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => setActiveView('add-item')}
              className="flex w-full items-center justify-between rounded-3xl border border-red-100 bg-red-50/60 px-5 py-4 text-left transition hover:border-red-200 hover:bg-red-50"
            >
              <div>
                <p className="font-semibold text-slate-900">Create product entry</p>
                <p className="mt-1 text-sm text-slate-500">Add pricing, category, image, and stock.</p>
              </div>
              <span className="text-xl text-red-500">+</span>
            </button>

            <button
              onClick={() => setActiveView('items')}
              className="flex w-full items-center justify-between rounded-3xl border border-amber-100 bg-amber-50/70 px-5 py-4 text-left transition hover:border-amber-200 hover:bg-amber-50"
            >
              <div>
                <p className="font-semibold text-slate-900">Review product catalog</p>
                <p className="mt-1 text-sm text-slate-500">Inspect product details and remove stale listings.</p>
              </div>
              <span className="text-xl text-amber-500">&rarr;</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

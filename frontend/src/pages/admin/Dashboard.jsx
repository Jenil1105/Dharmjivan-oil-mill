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
    <div className="space-y-4 sm:space-y-4">

      <section className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <article key={card.key} className="relative overflow-hidden rounded-xl border border-red-100 bg-white p-4 shadow-[var(--shadow-soft)]">
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accent}`} />
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{card.label}</p>
            <p className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {card.key === 'totalRevenue' ? formatCurrency(stats[card.key]) : stats[card.key]}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{card.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-red-100 bg-[var(--panel-strong)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Operations pulse</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">What needs attention today</h3>
            </div>
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Live summary</span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-red-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">Low stock</p>
              <p className="mt-2 text-2xl font-extrabold text-red-700">{stats.lowStockItems}</p>
              <p className="mt-1 text-xs text-red-700/75">Items with ≤10 units.</p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-500">Sales</p>
              <p className="mt-2 text-2xl font-extrabold text-amber-700">{stats.totalSold}</p>
              <p className="mt-1 text-xs text-amber-700/75">Total units sold.</p>
            </div>
            <div className="rounded-2xl bg-orange-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">Catalog</p>
              <p className="mt-2 text-2xl font-extrabold text-orange-700">{stats.totalItems}</p>
              <p className="mt-1 text-xs text-orange-700/75">Total live products.</p>
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

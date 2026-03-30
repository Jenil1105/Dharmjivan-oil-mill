import { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCard from './ItemCard'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value || 0)

function ViewItems({ setActiveView, setSelectedItem }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/items')
      setItems(response.data)
    } catch (requestError) {
      setError(`Error fetching items: ${requestError.response?.data?.error || requestError.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return
    }

    try {
      await axios.delete(`http://localhost:3000/items/${id}`)
      setItems((currentItems) => currentItems.filter((item) => item._id !== id))
    } catch (requestError) {
      setError(`Error deleting item: ${requestError.response?.data?.error || requestError.message}`)
    }
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setActiveView('edit-item')
  }

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center rounded-[2rem] border border-red-100 bg-white shadow-[var(--shadow-soft)]">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
          <p className="text-sm font-medium text-slate-500">Loading product catalog...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="flex flex-col gap-4 rounded-[1.5rem] border border-red-100 bg-[var(--panel-strong)] p-5 shadow-[var(--shadow-soft)] sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">Catalog overview</p>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">Product Catalog</h1>
          <p className="mt-2 text-sm text-slate-500">
            Browse all items, monitor stock, and remove outdated entries when needed.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div className="rounded-full bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            {items.length} active products
          </div>
          <button
            onClick={() => setActiveView('add-item')}
            className="rounded-full bg-gradient-to-r from-red-600 to-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Add product
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-red-200 bg-white px-6 py-16 text-center shadow-[var(--shadow-soft)]">
          <h2 className="text-2xl font-bold text-slate-900">No items found yet</h2>
          <p className="mt-3 text-sm text-slate-500">Start building the catalog by adding your first product.</p>
          <button
            onClick={() => setActiveView('add-item')}
            className="mt-6 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Add first item
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewItems

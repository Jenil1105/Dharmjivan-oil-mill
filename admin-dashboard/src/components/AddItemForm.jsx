import { useState } from 'react'
import axios from 'axios'

const initialFormState = {
  name: '',
  description: '',
  price: '',
  discounted_price: '',
  available_quantity: '',
  category: '',
  image_url: '',
}

function AddItemForm({ mode = 'add', initialData = null, onSuccess }) {
  const [formData, setFormData] = useState(initialData ? {
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    discounted_price: initialData.discounted_price || '',
    available_quantity: initialData.available_quantity || '',
    category: initialData.category || '',
    image_url: initialData.image_url || '',
  } : initialFormState)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        discounted_price: parseFloat(formData.discounted_price) || 0,
        available_quantity: parseInt(formData.available_quantity) || 0,
      }

      if (mode === 'edit' && initialData?._id) {
        await axios.put(`http://localhost:3000/items/${initialData._id}`, itemData)
        setMessage('Item updated successfully!')
      } else {
        await axios.post('http://localhost:3000/items', itemData)
        setMessage('Item added successfully!')
      }

      setFormData(initialFormState)
      if (onSuccess) onSuccess()
    } catch (error) {
      setMessage(`Error ${mode === 'edit' ? 'updating' : 'adding'} item: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const inputClassName =
    'w-full rounded-2xl border border-red-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:ring-4 focus:ring-red-100'

  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-[1.5rem] border border-red-100 bg-[var(--panel-strong)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-red-100">
              <img src="/dharmjivan_full.png" alt="Dharmjivan logo" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">Entry form</p>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">Add New Item</h1>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Fill in the core details below to publish a new product to the store inventory.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                Product name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClassName}
                placeholder="Groundnut Oil 1L"
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Oil, Seeds, Snacks"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className={inputClassName}
              placeholder="Describe texture, sourcing, packaging, or ideal use cases."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-semibold text-slate-700">
                Price (INR)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className={inputClassName}
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="discounted_price" className="mb-2 block text-sm font-semibold text-slate-700">
                Discounted price
              </label>
              <input
                type="number"
                id="discounted_price"
                name="discounted_price"
                value={formData.discounted_price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={inputClassName}
                placeholder="Optional"
              />
            </div>

            <div>
              <label htmlFor="available_quantity" className="mb-2 block text-sm font-semibold text-slate-700">
                Available quantity
              </label>
              <input
                type="number"
                id="available_quantity"
                name="available_quantity"
                value={formData.available_quantity}
                onChange={handleChange}
                required
                min="0"
                className={inputClassName}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image_url" className="mb-2 block text-sm font-semibold text-slate-700">
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className={inputClassName}
              placeholder="https://example.com/product-image.jpg"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">Required fields help keep listings complete and searchable.</p>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-red-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? (mode === 'edit' ? 'Updating item...' : 'Saving item...') : mode === 'edit' ? 'Update item' : 'Publish item'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={() => onSuccess?.()}
                className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none sm:w-auto"
              >
                Cancel
              </button>
            )}
          </div>

          {message && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                message.includes('Error')
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-amber-200 bg-amber-50 text-amber-700'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </section>
    </div>
  )
}

export default AddItemForm

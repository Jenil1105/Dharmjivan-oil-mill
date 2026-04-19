import React from 'react'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value || 0)

const ItemCard = ({ item, onDelete, onEdit }) => {
  const discounted = Number(item.discounted_price) > 0
  const lowStock = Number(item.available_quantity) <= 10

  return (
    <article className="w-full max-w-xl flex items-center gap-4 rounded-xl border border-red-100 bg-[var(--panel-strong)] p-3 shadow-sm">

      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-slate-900 truncate">
          {item.name}
        </h3>

        <p className="text-xs text-slate-500 truncate">
          {item.description || 'No description'}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 text-sm">
          <span className="font-bold text-red-600">
            {formatCurrency(item.price)}
          </span>

          {discounted && (
            <span className="text-amber-600">
              {formatCurrency(item.discounted_price)}
            </span>
          )}

          <span className="text-slate-600">
            Stock: {item.available_quantity}
          </span>

          <span className="text-slate-600">
            Sold: {item.total_sold || 0}
          </span>

          <span className="text-slate-600">
            Rev: {formatCurrency(item.revenue_generated)}
          </span>

          {lowStock && (
            <span className="text-red-500 font-medium">
              Low
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 text-xs rounded-md bg-amber-50 text-amber-700 border-1"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-600"
        >
          Delete
        </button>
      </div>

    </article>
  )
}

export default ItemCard
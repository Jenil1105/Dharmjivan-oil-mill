const viewMeta = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Track products, sales, and stock in one place.',
  },
  'add-item': {
    title: 'Add Product',
    subtitle: 'Create a clean product entry.',
  },
  items: {
    title: 'Product Catalog',
    subtitle: 'View and manage existing products.',
  },
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'add-item', label: 'Add Product' },
  { id: 'items', label: 'Catalog' },
]

function Header({ activeView, setActiveView }) {
  const currentView = viewMeta[activeView] ?? viewMeta.dashboard

  return (
    <header className="sticky top-0 z-30 border-b border-red-100 bg-[rgba(255,252,248,0.96)] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-red-100">
              <img src="/dharmjivan_full.png" alt="Dharmjivan logo" className="h-9 w-9 object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-600 sm:text-xs">
                Dharmjivan Oil Mill
              </p>
              <h1 className="truncate text-xl font-extrabold text-slate-900 sm:text-2xl">{currentView.title}</h1>
              <p className="text-sm text-slate-500">{currentView.subtitle}</p>
            </div>
          </div>

          <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            Admin Panel
          </div>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {navigationItems.map((item) => {
            const active = item.id === activeView

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? 'bg-red-600 text-white shadow-lg shadow-red-100'
                    : 'border border-red-100 bg-white text-slate-700 hover:bg-red-50'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header

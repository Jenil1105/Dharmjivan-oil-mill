const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'KPIs and sales health',
    icon: 'grid',
  },
  {
    id: 'add-item',
    label: 'Add Product',
    description: 'Create a new listing',
    icon: 'plus',
  },
  {
    id: 'items',
    label: 'Product Catalog',
    description: 'Manage active inventory',
    icon: 'box',
  },
]

function Icon({ type, active }) {
  const colorClass = active ? 'text-red-600' : 'text-red-100'

  if (type === 'plus') {
    return (
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'box') {
    return (
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 4 7.5 12 12l8-4.5L12 3Z" strokeLinejoin="round" />
        <path d="M4 7.5V16.5L12 21 20 16.5V7.5" strokeLinejoin="round" />
        <path d="M12 12V21" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12h6V4H4v8Zm10 8h6v-6h-6v6Zm0-10h6V4h-6v6ZM4 20h6v-6H4v6Z" strokeLinejoin="round" />
    </svg>
  )
}

function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="hidden w-80 shrink-0 border-r border-red-200 bg-[linear-gradient(180deg,#c81e1e_0%,#e52b1f_68%,#f1a208_100%)] text-white lg:flex lg:flex-col">
      <div className="border-b border-white/15 px-6 py-7">
        <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
              <img src="/dharmjivan_full.png" alt="Dharmjivan logo" className="h-12 w-12 object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-50/90">Dharmjivan</p>
              <h2 className="mt-1 text-2xl font-extrabold">Admin Panel</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-red-50/85">
            Manage stock, pricing, and business performance with a theme matched to the company identity.
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.28em] text-red-50/75">Workspace</p>
        <ul className="mt-4 space-y-2">
          {menuItems.map((item) => {
            const active = activeView === item.id

            return (
              <li key={item.id}>
                <button
                  className={`group w-full rounded-2xl border px-4 py-4 text-left transition duration-200 ${
                    active
                      ? 'border-white/30 bg-white text-red-700 shadow-xl'
                      : 'border-transparent bg-white/0 hover:border-white/15 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveView(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                        active ? 'bg-red-50' : 'bg-black/10'
                      }`}
                    >
                      <Icon type={item.icon} active={active} />
                    </span>
                    <div>
                      <p className={`text-sm font-semibold ${active ? 'text-red-700' : 'text-red-50'}`}>{item.label}</p>
                      <p className={`text-xs ${active ? 'text-red-500' : 'text-red-50/70'}`}>{item.description}</p>
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-6 pb-6">
        <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-50/75">Brand palette</p>
          <div className="mt-4 flex gap-3">
            <span className="h-10 w-10 rounded-full bg-[#df2518] ring-2 ring-white/35" />
            <span className="h-10 w-10 rounded-full bg-[#f7c90a] ring-2 ring-white/35" />
            <span className="h-10 w-10 rounded-full bg-white ring-2 ring-white/35" />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

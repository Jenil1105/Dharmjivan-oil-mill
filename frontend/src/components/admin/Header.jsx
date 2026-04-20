const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin' },
  { id: 'items', label: 'Catalog', href: '/admin/items' },
  { id: 'add-item', label: 'Add Product', href: '/admin/add-item' },
]

function Header({ activeView, setActiveView }) {

  return (
    <header className="sticky top-0 z-30 border-b border-red-100 bg-[rgba(255,252,248,0.96)] backdrop-blur-xl">

      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="/admin" className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-red-100">
              <img src="/dharmjivan_full.png" alt="Dharmjivan logo" className="h-9 w-9 object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-[20px] font-bold uppercase tracking-[0.28em] text-red-600 sm:text-sm">
                Dharmjivan Oil Mill
              </p>

            </div>
          </a>

          <nav className="flex gap-5 overflow-x-auto ">
            {navigationItems.map((item) => {
              const isActive = typeof window !== 'undefined' && window.location.pathname === item.href;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveView(item.id);
                  }}
                  className={`min-w-[100px] border text-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${isActive
                    ? 'border-transparent bg-red-600 text-white shadow-md shadow-red-100'
                    : 'border-red-100 bg-white text-slate-700 hover:bg-red-50'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = 'http://localhost:3000/?logout=true';
              }}
              className="min-w-[100px] border border-red-100 bg-white text-slate-700 hover:bg-red-50 text-center whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition cursor-pointer"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

    </header>
  )
}

export default Header

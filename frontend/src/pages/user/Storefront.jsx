import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../styles/user-globals.css';

function Storefront() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const userFromUrl = urlParams.get('user');

    if (tokenFromUrl && userFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      localStorage.setItem('user', userFromUrl);
      setUser(JSON.parse(userFromUrl));
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchItems();
    } else {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!token || !storedUser) {
        window.location.href = 'http://localhost:3000';
      } else {
        setUser(JSON.parse(storedUser));
        fetchItems();
      }
    }

    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'http://localhost:3000/?logout=true';
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value || 0);

  return (
    <div className="font-manrope">
      <div className="background-glow" />
      
      <nav className="fixed top-0 w-full flex justify-between items-center px-[5%] py-4 bg-glass-bg backdrop-blur-lg border-b border-glass-border z-[100] transition-all duration-300">
        <a href="#" className="flex items-center gap-3.5 no-underline">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <img src="/dharmjivan_full.png" alt="Dharmjivan logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="text-[1.125rem] font-extrabold uppercase tracking-[0.15em] text-primary">
            Dharmjivan Oil Mill
          </div>
        </a>
        <div className="flex items-center gap-6">
          <button className="bg-none border-none text-[1.25rem] text-slate-900 cursor-pointer relative transition-all duration-200 hover:-translate-y-0.5 hover:text-primary outline-none" aria-label="Cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {cart.length > 0 && <span className="absolute -top-2 -right-2.5 bg-primary text-white text-[0.7rem] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-bg-base">{cart.length}</span>}
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              className="bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-transform duration-200 hover:scale-105 outline-none" 
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Account"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-500 text-white rounded-full flex items-center justify-center font-bold text-[1.1rem] shadow-[0_4px_12px_rgba(220,38,38,0.2)] border-2 border-white">
                {user ? user.name.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
              </div>
            </button>

            {showDropdown && (
              <div className="absolute top-[calc(100%+1rem)] right-0 w-[240px] bg-glass-bg backdrop-blur-xl border border-glass-border rounded-[1.25rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-3 z-[1000] origin-top-right animate-dropdown-fade">
                <div className="px-4 py-3">
                  <p className="font-extrabold text-slate-900 text-base mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{user?.name}</p>
                  <p className="text-[0.8rem] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">{user?.email}</p>
                </div>
                <div className="h-px bg-glass-border my-2" />
                <a href="#" className="group flex items-center gap-3 px-4 py-3 text-slate-900 no-underline text-[0.9rem] font-semibold rounded-xl transition-all duration-200 border-none bg-none w-full text-left cursor-pointer hover:bg-primary/5 hover:text-primary">
                  <i className="fa-solid fa-user-gear text-slate-500 group-hover:text-primary transition-colors"></i> Profile
                </a>
                <a href="#" className="group flex items-center gap-3 px-4 py-3 text-slate-900 no-underline text-[0.9rem] font-semibold rounded-xl transition-all duration-200 border-none bg-none w-full text-left cursor-pointer hover:bg-primary/5 hover:text-primary">
                  <i className="fa-solid fa-box-open text-slate-500 group-hover:text-primary transition-colors"></i> Past Orders
                </a>
                <div className="h-px bg-glass-border my-2" />
                <button className="group flex items-center gap-3 px-4 py-3 text-slate-900 no-underline text-[0.9rem] font-semibold rounded-xl transition-all duration-200 border-none bg-none w-full text-left cursor-pointer hover:bg-red-50 hover:text-primary outline-none" onClick={() => setShowLogoutModal(true)}>
                  <i className="fa-solid fa-right-from-bracket text-slate-500 group-hover:text-primary transition-colors"></i> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[2000] transition-all duration-300 ${showLogoutModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`bg-white w-[90%] max-w-[440px] rounded-[2rem] p-10 text-center shadow-2xl transition-all duration-300 ${showLogoutModal ? 'translate-y-0' : 'translate-y-5'}`}>
          <div className="w-16 h-16 bg-red-50 text-primary rounded-[1.25rem] flex items-center justify-center text-2xl mx-auto mb-6">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 className="text-[1.5rem] font-extrabold text-slate-900 mb-3">Wait, are you sure?</h2>
          <p className="text-slate-500 leading-relaxed mb-8">You're about to log out from your account. You'll need to log in again to place orders.</p>
          <div className="flex gap-4">
            <button className="flex-1 p-3.5 rounded-2xl border border-glass-border bg-white text-slate-900 font-bold cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 outline-none" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </button>
            <button className="flex-1 p-3.5 rounded-2xl border-none bg-primary text-white font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:bg-primary-hover hover:-translate-y-0.5 outline-none" onClick={handleLogout}>
              Yes, Log Out
            </button>
          </div>
        </div>
      </div>

      <main className="pt-32 px-[5%] pb-16 max-w-[1400px] mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">Premium Store</h1>
          <p className="text-slate-500 text-lg max-w-[600px] mx-auto">Explore our catalog of 100% pure, natural, and cold-pressed products crafted to elevate your daily routine.</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-slate-500 font-semibold">
            <div className="w-10 h-10 border-4 border-red-100 border-t-primary rounded-full animate-spin"></div>
            <p>Loading the finest selection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <article key={item._id} className="group bg-white rounded-[1.5rem] p-6 border border-red-100/40 shadow-soft transition-all duration-500 flex flex-col relative overflow-hidden hover:-translate-y-2 hover:shadow-hover hover:border-red-300/50">
                <div className="w-full aspect-square rounded-2xl product-image-gradient flex items-center justify-center mb-6 relative overflow-hidden">
                  {item.category && (
                    <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest text-primary shadow-sm">
                      {item.category}
                    </span>
                  )}
                  <img 
                    src={item.image_url || '/dharmjivan_full.png'} 
                    alt={item.name} 
                    className="w-4/5 h-4/5 object-contain"
                    onError={(e) => { e.target.src = '/dharmjivan_full.png' }}
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[1.25rem] font-bold text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-[0.875rem] text-slate-500 leading-relaxed mb-6 flex-1">{item.description}</p>
                  
                  <div className="flex justify-between items-end mt-auto">
                    <div className="flex flex-col">
                      {item.discounted_price ? (
                        <>
                          <span className="text-[0.875rem] line-through text-slate-400 mb-[-0.25rem]">{formatCurrency(item.price)}</span>
                          <span className="text-[1.5rem] font-extrabold text-slate-900">{formatCurrency(item.discounted_price)}</span>
                        </>
                      ) : (
                        <span className="text-[1.5rem] font-extrabold text-slate-900">{formatCurrency(item.price)}</span>
                      )}
                    </div>
                    
                    <button 
                      className="bg-primary text-white border-none w-12 h-12 rounded-2xl flex items-center justify-center text-[1.1rem] cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:bg-primary-hover hover:scale-105 hover:rounded-xl active:scale-95 outline-none" 
                      onClick={() => addToCart(item)}
                      aria-label="Add to cart"
                      title="Add to cart"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
            
            {items.length === 0 && !loading && (
              <div className="col-span-full text-center py-16 text-slate-500">
                <h2 className="text-2xl font-bold mb-2">No products found</h2>
                <p>Check back later or contact support.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Storefront;

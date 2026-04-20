import { useState, useRef, useEffect } from 'react';

function Navbar({ user, cartCount, showLogoutModal, setShowLogoutModal }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
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
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2.5 bg-primary text-white text-[0.7rem] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-bg-base">
              {cartCount}
            </span>
          )}
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
              <button 
                className="group flex items-center gap-3 px-4 py-3 text-slate-900 no-underline text-[0.9rem] font-semibold rounded-xl transition-all duration-200 border-none bg-none w-full text-left cursor-pointer hover:bg-red-50 hover:text-primary outline-none" 
                onClick={() => {
                  setShowDropdown(false);
                  setShowLogoutModal(true);
                }}
              >
                <i className="fa-solid fa-right-from-bracket text-slate-500 group-hover:text-primary transition-colors"></i> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

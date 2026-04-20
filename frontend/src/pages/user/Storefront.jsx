import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/user-globals.css';
import Navbar from '../../components/user/Navbar';
import ProductCard from '../../components/user/ProductCard';
import LogoutModal from '../../components/user/LogoutModal';

function Storefront() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
      
      <Navbar 
        user={user} 
        cartCount={cart.length} 
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <main className="pt-32 px-[5%] pb-16 max-w-[1700px] mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Premium Store</h1>
          <p className="text-slate-500 text-base max-w-[600px] mx-auto">
            Explore our catalog of 100% pure, natural, and cold-pressed products crafted to elevate your daily routine.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-slate-500 font-semibold">
            <div className="w-10 h-10 border-4 border-red-100 border-t-primary rounded-full animate-spin"></div>
            <p>Loading the finest selection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 sm:gap-8">
            {items.map((item) => (
              <ProductCard 
                key={item._id} 
                item={item} 
                formatCurrency={formatCurrency}
                addToCart={addToCart}
              />
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


import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/user.css';

function Storefront() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchItems();
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
    window.location.href = 'http://localhost:3000';
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value || 0);

  return (
    <div className="storefront-root">
      <div className="background-glow"></div>
      
      <nav>
        <a href="#" className="logo">
          <div className="logo-box">
            <img src="/dharmjivan_full.png" alt="Dharmjivan logo" className="logo-img" />
          </div>
          <div className="logo-text">
            Dharmjivan Oil Mill
          </div>
        </a>
        <div className="nav-actions">
          <button className="cart-btn" aria-label="Cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>

      <main className="storefront">
        <header className="store-header">
          <h1>Premium Store</h1>
          <p>Explore our catalog of 100% pure, natural, and cold-pressed products crafted to elevate your daily routine.</p>
        </header>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading the finest selection...</p>
          </div>
        ) : (
          <div className="product-grid">
            {items.map((item) => (
              <article key={item._id} className="product-card">
                <div className="product-image-container">
                  {item.category && <span className="product-category">{item.category}</span>}
                  <img 
                    src={item.image_url || '/dharmjivan_full.png'} 
                    alt={item.name} 
                    className="product-image"
                    onError={(e) => { e.target.src = '/dharmjivan_full.png' }}
                  />
                </div>
                
                <div className="product-info">
                  <h3 className="product-title">{item.name}</h3>
                  <p className="product-description">{item.description}</p>
                  
                  <div className="product-footer">
                    <div className="price-container">
                      {item.discounted_price ? (
                        <>
                          <span className="product-old-price">{formatCurrency(item.price)}</span>
                          <span className="product-price">{formatCurrency(item.discounted_price)}</span>
                        </>
                      ) : (
                        <span className="product-price">{formatCurrency(item.price)}</span>
                      )}
                    </div>
                    
                    <button 
                      className="add-to-cart-btn" 
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
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <h2>No products found</h2>
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

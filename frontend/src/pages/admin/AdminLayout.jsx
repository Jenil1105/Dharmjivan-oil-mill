import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/admin/Header';
import Dashboard from './Dashboard';
import AddItemForm from './AddItemForm';
import ViewItems from './ViewItems';
import Footer from '../../components/admin/Footer';
import '../../styles/admin.css';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeView, setInternalActiveView] = useState(() => {
    const path = location.pathname;
    if (path === '/admin/add-item') return 'add-item';
    if (path === '/admin/items') return 'items';
    return 'dashboard';
  });

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const userFromUrl = urlParams.get('user');

    if (tokenFromUrl && userFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      localStorage.setItem('user', userFromUrl);
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!token || !storedUser) {
        window.location.href = 'http://localhost:3000';
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        if (user.role !== 'admin') {
          window.location.href = 'http://localhost:3000';
          return;
        }
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'http://localhost:3000';
        return;
      }
    }

    const handlePopState = () => {
      const path = location.pathname;
      if (path === '/admin/add-item') setInternalActiveView('add-item');
      else if (path === '/admin/items') setInternalActiveView('items');
      else setInternalActiveView('dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.pathname]);

  const setActiveView = (view) => {
    let path = '/admin';
    if (view === 'add-item') path = '/admin/add-item';
    if (view === 'items' || view === 'edit-item') path = '/admin/items';
    navigate(path);
    setInternalActiveView(view);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />
      case 'add-item':
        return <AddItemForm onSuccess={() => setActiveView('items')} />
      case 'items':
        return <ViewItems setActiveView={setActiveView} setSelectedItem={setSelectedItem} />
      case 'edit-item':
        return (
          <AddItemForm
            mode="edit"
            initialData={selectedItem}
            onSuccess={() => setActiveView('items')}
          />
        )
      default:
        return <Dashboard setActiveView={setActiveView} />
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-slate-900 admin-dashboard-root">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-8rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(223,37,24,0.16),_transparent_68%)] blur-2xl" />
        <div className="absolute bottom-[-12rem] right-[-8rem] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(247,201,10,0.16),_transparent_70%)] blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <Header activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">{renderContent()}</div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

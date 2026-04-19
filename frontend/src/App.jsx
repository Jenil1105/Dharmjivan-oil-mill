import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Storefront from './pages/user/Storefront';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<Storefront />} />
      </Routes>
    </Router>
  );
}

export default App;

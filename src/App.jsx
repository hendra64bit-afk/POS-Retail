import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Login from './pages/Login';
import Layout from './components/Layout';

// Placeholder Pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const POS = React.lazy(() => import('./pages/POS'));
const Products = React.lazy(() => import('./pages/Products'));
const Purchases = React.lazy(() => import('./pages/Purchases'));
const Cashflow = React.lazy(() => import('./pages/Cashflow'));
const History = React.lazy(() => import('./pages/History'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Users = React.lazy(() => import('./pages/Users'));
const Shift = React.lazy(() => import('./pages/Shift'));
const Settings = React.lazy(() => import('./pages/Settings'));

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { currentUser } = useStore();
  if (!currentUser) return <Navigate to="/" />;
  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/pos" />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  const { initFirebase, isInitialized } = useStore();

  React.useEffect(() => {
    initFirebase();
  }, [initFirebase]);

  if (!isInitialized) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Memuat konfigurasi sistem (atau periksa konfigurasi Firebase Anda di src/firebase.js)...</div>;
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>} />
          <Route path="/pos" element={<ProtectedRoute><POS /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute requireAdmin><Products /></ProtectedRoute>} />
          <Route path="/purchases" element={<ProtectedRoute requireAdmin><Purchases /></ProtectedRoute>} />
          <Route path="/cashflow" element={<ProtectedRoute requireAdmin><Cashflow /></ProtectedRoute>} />
          <Route path="/shift" element={<ProtectedRoute><Shift /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute requireAdmin><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute requireAdmin><Settings /></ProtectedRoute>} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Truck, 
  Wallet, 
  History, 
  FileText, 
  Users, 
  LogOut,
  Building2,
  Clock,
  Settings
} from 'lucide-react';

const Layout = ({ children }) => {
  const { currentUser, currentBranch, logout, activeShift, closeShift, cashflows, storeSettings } = useStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [endCashInput, setEndCashInput] = React.useState('');
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getExpectedCash = () => {
    const branchCashflows = cashflows.filter(
      cf => cf.branchId === currentBranch?.id
    );
    return branchCashflows.reduce((sum, cf) => sum + (cf.type === 'in' ? cf.amount : -cf.amount), 0);
  };

  const handleLogout = () => {
    if (activeShift) {
      setShowLogoutModal(true);
    } else {
      doLogout();
    }
  };

  const doLogout = () => {
    logout();
    navigate('/');
  };

  const handleCloseShift = (e) => {
    e.preventDefault();
    const expectedCash = getExpectedCash();
    const endCash = Number(endCashInput.replace(/\D/g, '')) || 0;
    const difference = endCash - expectedCash;
    closeShift(endCash, expectedCash, difference);
    setShowLogoutModal(false);
    doLogout();
  };

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', adminOnly: true },
    { to: '/pos', icon: <ShoppingCart size={20} />, label: 'Kasir', adminOnly: false },
    { to: '/products', icon: <Package size={20} />, label: 'Manajemen Produk', adminOnly: true },
    { to: '/purchases', icon: <Truck size={20} />, label: 'Pembelian Produk', adminOnly: true },
    { to: '/cashflow', icon: <Wallet size={20} />, label: 'Manajemen Kas', adminOnly: true },
    { to: '/shift', icon: <Clock size={20} />, label: 'Shift & Kasir', adminOnly: false },
    { to: '/history', icon: <History size={20} />, label: 'History Penjualan', adminOnly: false },
    { to: '/reports', icon: <FileText size={20} />, label: 'Laporan Laba Rugi', adminOnly: true },
    { to: '/settings', icon: <Settings size={20} />, label: 'Pengaturan', adminOnly: true }
  ].filter(item => !item.adminOnly || currentUser?.role === 'admin');

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        backgroundColor: 'var(--surface-color)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 1rem'
      }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
          <div style={{ background: 'var(--primary-color)', color: 'white', padding: storeSettings?.logo ? '0' : '0.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', flexShrink: 0 }}>
            {storeSettings?.logo ? (
              <img src={storeSettings.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Building2 size={24} />
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '1.125rem', margin: 0 }}>{storeSettings?.name || 'POS System'}</h2>
            <p style={{ fontSize: '0.75rem', margin: 0 }}>Multi-Branch</p>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--primary-color)' : 'var(--text-main)',
                backgroundColor: isActive ? '#eff6ff' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 500 : 400,
                transition: 'all var(--transition-fast)'
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem' }}>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 500, fontSize: '0.875rem', margin: 0 }}>{currentUser?.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentBranch?.name}
              </p>
            </div>
            <button onClick={handleLogout} className="btn btn-icon" style={{ color: 'var(--danger-color)' }} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header style={{
          backgroundColor: 'var(--surface-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '1.25rem', margin: 0 }}>
            {currentBranch?.name}
          </h1>
          <div className="flex items-center gap-3">
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: isOnline ? '#ecfdf5' : '#fef2f2',
                color: isOnline ? '#059669' : '#dc2626',
                border: `1px solid ${isOnline ? '#a7f3d0' : '#fecaca'}`
              }}
            >
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: isOnline ? '#10b981' : '#ef4444',
                boxShadow: `0 0 0 2px ${isOnline ? '#d1fae5' : '#fee2e2'}`
              }} />
              {isOnline ? 'Online' : 'Offline'}
            </div>
            <div className="badge badge-success">
              {currentUser?.role === 'admin' ? 'Administrator' : 'Kasir'}
            </div>
          </div>
        </header>
        
        <div className="page-container">
          {children}
        </div>
      </main>

      {/* Logout / Tutup Kas Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '1rem',
            width: '100%', maxWidth: '440px', padding: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ marginBottom: '0.25rem', marginTop: 0 }}>Tutup Kas (Akhir Shift)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Anda harus menutup kas sebelum logout.</p>
            
            <div style={{
              background: '#eff6ff', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem'
            }}>
              <div className="flex justify-between items-center">
                <span style={{ color: '#3b82f6', fontWeight: 500 }}>Saldo Kas Sistem</span>
                <span style={{ fontWeight: 700, color: '#1d4ed8' }}>Rp {getExpectedCash().toLocaleString('id-ID')}</span>
              </div>
            </div>

            <form onSubmit={handleCloseShift}>
              <div className="form-group">
                <label className="form-label">Uang Fisik di Laci (Rp)</label>
                <input
                  autoFocus
                  className="form-input w-full"
                  style={{ fontSize: '1.25rem', fontWeight: 600, textAlign: 'right' }}
                  placeholder="0"
                  value={endCashInput}
                  onChange={(e) => {
                    const num = e.target.value.replace(/\D/g, '');
                    setEndCashInput(num ? Number(num).toLocaleString('id-ID') : '');
                  }}
                  required
                />
              </div>

              {endCashInput !== '' && (
                <div style={{
                  background: (Number(endCashInput.replace(/\D/g, '')) - getExpectedCash()) === 0 ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${(Number(endCashInput.replace(/\D/g, '')) - getExpectedCash()) === 0 ? '#bbf7d0' : '#fecaca'}`,
                  borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 500 }}>Selisih Kas</span>
                  <span style={{ fontWeight: 700, color: (Number(endCashInput.replace(/\D/g, '')) - getExpectedCash()) === 0 ? '#16a34a' : '#dc2626' }}>
                    Rp {(Number(endCashInput.replace(/\D/g, '')) - getExpectedCash()).toLocaleString('id-ID')}
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}>
                  Tutup Kas & Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

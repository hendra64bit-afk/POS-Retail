import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Store } from 'lucide-react';

const Login = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  const { login, startShift, activeShift } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(pin)) {
      if (!useStore.getState().activeShift) {
        startShift(); // Auto start shift using last closing cash
      }
      const role = useStore.getState().currentUser?.role;
      if (role === 'cashier') {
        navigate('/pos');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('PIN tidak valid. Silakan coba lagi.');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--background-main)' 
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#eff6ff', color: 'var(--primary-color)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}>
          <Store size={32} />
        </div>
        <h2 style={{ marginBottom: '0.5rem' }}>Selamat Datang</h2>
        <p style={{ marginBottom: '2rem' }}>Silakan masukkan PIN Anda untuk masuk</p>
        
        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: 'var(--danger-color)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">PIN Akses</label>
            <input 
              type="password" 
              className="form-input" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Masukkan PIN"
              required
              style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5em' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            Masuk
          </button>
          
          <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <p>Hint PIN Admin: 1234</p>
            <p>Hint PIN Kasir: 1111</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

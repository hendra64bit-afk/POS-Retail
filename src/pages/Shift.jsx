import React from 'react';
import { useStore } from '../store/useStore';
import { Clock, Wallet, CheckCircle } from 'lucide-react';

const Shift = () => {
  const { shifts, activeShift, cashflows, currentBranch, users, updateClosedShift, currentUser } = useStore();
  const [editingShift, setEditingShift] = React.useState(null);
  const [editEndCash, setEditEndCash] = React.useState('');

  const getCashierName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const getExpectedCash = () => {
    const branchCashflows = cashflows.filter(
      cf => cf.branchId === currentBranch?.id
    );
    return branchCashflows.reduce((sum, cf) => sum + (cf.type === 'in' ? cf.amount : -cf.amount), 0);
  };

  const branchShifts = shifts
    .filter(s => s.branchId === currentBranch?.id)
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .reverse();

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingShift) return;
    const newCash = Number(editEndCash.replace(/\D/g, '')) || 0;
    updateClosedShift(editingShift.id, newCash);
    setEditingShift(null);
    setEditEndCash('');
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.25rem' }}>Manajemen Shift & Kas</h2>
        <p>Ringkasan status kas untuk shift saat ini dan riwayat sebelumnya</p>
      </div>

      <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '2rem' }}>
        {/* Status Shift Aktif */}
        <div className="card" style={{ background: activeShift ? '#eff6ff' : '#f8fafc', border: `1px solid ${activeShift ? '#bfdbfe' : '#e2e8f0'}`, gridColumn: 'span 2' }}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: activeShift ? '#1d4ed8' : '#64748b' }}>
            {activeShift ? <Clock size={20} /> : <CheckCircle size={20} />} 
            {activeShift ? 'Shift Aktif' : 'Tidak Ada Shift Aktif'}
          </h3>
          
          {activeShift ? (
            <div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>
                Kasir: <strong>{getCashierName(activeShift.userId)}</strong> &bull; Dimulai sejak: {new Date(activeShift.startTime).toLocaleString('id-ID')}
              </p>
              <div style={{ background: '#ffffff', borderRadius: '0.5rem', padding: '1rem', border: '1px solid #bfdbfe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem' }}>
                  <span style={{ color: '#1d4ed8', fontWeight: 500 }}>Estimasi Saldo Saat Ini</span>
                  <span style={{ fontWeight: 700, color: '#1d4ed8' }}>Rp {getExpectedCash().toLocaleString('id-ID')}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem', marginBottom: 0 }}>
                *Klik Logout (kiri bawah) untuk melakukan Tutup Kas dan menyimpan shift ini.
              </p>
            </div>
          ) : (
            <p style={{ margin: 0, color: '#64748b' }}>Silakan login ulang untuk membuka shift baru.</p>
          )}
        </div>
      </div>

      {/* Riwayat Shift */}
      <div className="card">
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Riwayat Tutup Kas</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Kasir</th>
                <th>Waktu Buka</th>
                <th>Waktu Tutup</th>
                <th style={{ textAlign: 'right' }}>Buka Kas</th>
                <th style={{ textAlign: 'right' }}>Saldo Sistem</th>
                <th style={{ textAlign: 'right' }}>Kas Fisik</th>
                <th style={{ textAlign: 'right' }}>Selisih</th>
                {currentUser?.role === 'admin' && <th style={{ textAlign: 'right' }}>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {branchShifts.filter(s => s.status === 'closed').length === 0 ? (
                <tr><td colSpan={currentUser?.role === 'admin' ? "8" : "7"} style={{ textAlign: 'center', padding: '2rem' }}>Belum ada histori tutup kas</td></tr>
              ) : branchShifts.filter(s => s.status === 'closed').map(shift => (
                <tr key={shift.id}>
                  <td>{getCashierName(shift.userId)}</td>
                  <td>{new Date(shift.startTime).toLocaleString('id-ID')}</td>
                  <td>{new Date(shift.endTime).toLocaleString('id-ID')}</td>
                  <td style={{ textAlign: 'right' }}>Rp {shift.startCash.toLocaleString('id-ID')}</td>
                  <td style={{ textAlign: 'right' }}>Rp {shift.expectedCash.toLocaleString('id-ID')}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>Rp {shift.endCash.toLocaleString('id-ID')}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: shift.difference === 0 ? '#16a34a' : '#dc2626' }}>
                    {shift.difference > 0 ? '+' : ''}Rp {shift.difference.toLocaleString('id-ID')}
                  </td>
                  {currentUser?.role === 'admin' && (
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary btn-icon" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      onClick={() => {
                        setEditingShift(shift);
                        setEditEndCash(shift.endCash.toString());
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingShift && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '1rem',
            width: '100%', maxWidth: '400px', padding: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ marginBottom: '1.5rem', marginTop: 0 }}>Edit Kas Fisik</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label className="form-label">Uang Fisik (Rp)</label>
                <input
                  autoFocus
                  className="form-input w-full"
                  style={{ fontSize: '1.25rem', fontWeight: 600, textAlign: 'right' }}
                  value={editEndCash}
                  onChange={(e) => {
                    const num = e.target.value.replace(/\D/g, '');
                    setEditEndCash(num ? Number(num).toLocaleString('id-ID') : '');
                  }}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingShift(null)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shift;

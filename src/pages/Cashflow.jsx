import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus } from 'lucide-react';

const Cashflow = () => {
  const { cashflows, addCashflow, currentBranch } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'out',
    category: 'Operasional',
    amount: 0,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCashflow({
      branchId: currentBranch.id,
      ...formData,
      amount: Number(formData.amount)
    });
    setIsFormOpen(false);
    setFormData({ type: 'out', category: 'Operasional', amount: 0, description: '' });
  };

  const branchCashflows = cashflows.filter(c => c.branchId === currentBranch?.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const totalBalance = branchCashflows.reduce((sum, cf) => sum + (cf.type === 'in' ? cf.amount : -cf.amount), 0);
  
  const totalSelisih = branchCashflows
    .filter(cf => cf.category === 'Selisih Kasir')
    .reduce((sum, cf) => sum + (cf.type === 'in' ? cf.amount : -cf.amount), 0);

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Manajemen Arus Kas</h2>
          <p>Catat pengeluaran operasional dan pemasukan lainnya</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#991b1b', display: 'block', fontWeight: 600 }}>Total Selisih Kasir</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: totalSelisih === 0 ? 'var(--text-muted)' : (totalSelisih > 0 ? 'var(--success-color)' : 'var(--danger-color)') }}>
              {totalSelisih > 0 ? '+' : ''}Rp {totalSelisih.toLocaleString('id-ID')}
            </span>
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#1d4ed8', display: 'block', fontWeight: 600 }}>Total Saldo Kas Tunai</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: totalBalance >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
              Rp {totalBalance.toLocaleString('id-ID')}
            </span>
          </div>
          <button className="btn btn-primary" onClick={() => setIsFormOpen(!isFormOpen)}>
            <Plus size={18} /> Tambah Transaksi
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="card" style={{ marginBottom: '1.5rem', maxWidth: '600px' }}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Tipe</label>
                <select className="form-select" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="in">Pemasukan (+)</option>
                  <option value="out">Pengeluaran (-)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Operasional">Operasional (Listrik, Air)</option>
                  <option value="Gaji">Gaji Karyawan</option>
                  <option value="Selisih Kasir">Selisih Kasir / Penyesuaian</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Nominal (Rp)</label>
                <input required type="number" min="0" className="form-input" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Keterangan</label>
                <input required className="form-input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Batal</button>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Tipe</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th style={{ textAlign: 'right' }}>Nominal</th>
            </tr>
          </thead>
          <tbody>
            {branchCashflows.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada histori kas</td></tr>
            ) : branchCashflows.map(cf => (
              <tr key={cf.id}>
                <td>{new Date(cf.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                <td>
                  <span className={`badge ${cf.type === 'in' ? 'badge-success' : 'badge-danger'}`}>
                    {cf.type === 'in' ? 'Masuk' : 'Keluar'}
                  </span>
                </td>
                <td>{cf.category}</td>
                <td>{cf.description}</td>
                <td style={{ textAlign: 'right', fontWeight: 600, color: cf.type === 'in' ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  {cf.type === 'in' ? '+' : '-'} Rp {cf.amount.toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cashflow;

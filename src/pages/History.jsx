import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import InvoiceModal from '../components/InvoiceModal';
import { Download } from 'lucide-react';

const History = () => {
  const { sales, products, users, currentBranch, returnSaleItem } = useStore();
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const selectedSale = sales.find(s => s.id === selectedSaleId);

  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [filterDate, setFilterDate] = useState(''); // YYYY-MM-DD
  const [filterMethod, setFilterMethod] = useState('all'); // 'all', 'tunai', 'transfer'

  const branchSales = sales
    .filter(s => {
      if (s.branchId !== currentBranch?.id) return false;
      
      const saleDate = new Date(s.date);
      if (filterDate) {
        const selectedDate = new Date(filterDate);
        if (saleDate.getDate() !== selectedDate.getDate() || saleDate.getMonth() !== selectedDate.getMonth() || saleDate.getFullYear() !== selectedDate.getFullYear()) {
          return false;
        }
      } else if (filterMonth) {
        const [year, month] = filterMonth.split('-');
        if (saleDate.getFullYear() !== parseInt(year) || (saleDate.getMonth() + 1) !== parseInt(month)) {
          return false;
        }
      }
      
      if (filterMethod !== 'all' && s.paymentMethod !== filterMethod) {
        return false;
      }

      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleExportCSV = () => {
    if (branchSales.length === 0) {
      alert('Tidak ada data untuk diekspor.');
      return;
    }

    const headers = ['ID Transaksi', 'Waktu', 'Metode Pembayaran', 'Jumlah Item', 'Status Retur', 'Total (Rp)'];
    
    const rows = branchSales.map(sale => {
      const invoiceNo = sale.invoiceNo || sale.id.slice(0, 8).toUpperCase();
      const time = new Date(sale.date).toLocaleString('id-ID').replace(/,/g, '');
      const method = sale.paymentMethod === 'transfer' ? 'Transfer' : 'Tunai';
      const itemsCount = sale.items.reduce((sum, item) => sum + item.quantity, 0);
      const isReturned = sale.isReturned ? 'Diretur Penuh' : '-';
      const total = sale.totalAmount;
      return `"${invoiceNo}","${time}","${method}",${itemsCount},"${isReturned}",${total}`;
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Riwayat_Penjualan_${currentBranch?.name.replace(/\s+/g, '_') || 'Toko'}_${filterDate || filterMonth || 'Semua'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.25rem' }}>History Penjualan</h2>
        <p>Riwayat transaksi kasir untuk {currentBranch?.name}</p>
      </div>

      <div className="flex justify-between items-end gap-4" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Bulan</label>
            <input 
              type="month" 
              className="form-input" 
              value={filterMonth} 
              onChange={e => { setFilterMonth(e.target.value); setFilterDate(''); }} 
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Tanggal Spesifik</label>
            <input 
              type="date" 
              className="form-input" 
              value={filterDate} 
              onChange={e => { setFilterDate(e.target.value); if(e.target.value) setFilterMonth(''); }} 
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Metode Pembayaran</label>
            <select 
              className="form-input" 
              value={filterMethod} 
              onChange={e => setFilterMethod(e.target.value)}
            >
              <option value="all">Semua Metode</option>
              <option value="tunai">Tunai</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
        </div>
        <button onClick={handleExportCSV} className="btn btn-secondary flex items-center gap-2">
          <Download size={18} /> Export Excel (CSV)
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Waktu</th>
                <th>Metode</th>
                <th>Jumlah Item</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {branchSales.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada transaksi</td></tr>
              ) : branchSales.map(sale => (
                <tr key={sale.id}>
                  <td style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                    {(sale.invoiceNo || sale.id.slice(0, 8).toUpperCase())}
                  </td>
                  <td>
                    {new Date(sale.date).toLocaleDateString('id-ID', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td>
                    {sale.paymentMethod === 'transfer'
                      ? <span className="badge badge-success">💳 Transfer</span>
                      : <span className="badge" style={{ background: '#fef9c3', color: '#854d0e' }}>💵 Tunai</span>
                    }
                  </td>
                  <td>
                    {/* Klik untuk tampilkan invoice */}
                    <button
                      onClick={() => setSelectedSaleId(sale.id)}
                      style={{
                        background: '#eff6ff', border: '1px solid #bfdbfe',
                        borderRadius: '999px', padding: '0.2rem 0.75rem',
                        color: '#2563eb', fontWeight: 600, cursor: 'pointer',
                        fontSize: '0.8rem', transition: 'all 150ms',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#dbeafe'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#eff6ff'; }}
                      title="Klik untuk lihat invoice dan retur per item"
                    >
                      {sale.items.reduce((sum, item) => sum + item.quantity, 0)} item 🧾
                    </button>
                    {sale.isReturned && (
                      <span style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 600, marginLeft: '0.5rem', padding: '0.2rem 0.5rem', background: '#fee2e2', borderRadius: '4px' }}>
                        Diretur Penuh
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600, textDecoration: sale.isReturned ? 'line-through' : 'none', color: sale.isReturned ? '#94a3b8' : 'inherit' }}>
                    Rp {sale.totalAmount.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedSale && (
        <InvoiceModal
          type="sale"
          data={selectedSale}
          branchName={currentBranch?.name}
          products={products}
          users={users}
          onClose={() => setSelectedSaleId(null)}
          onReturnItem={returnSaleItem}
        />
      )}
    </div>
  );
};

export default History;

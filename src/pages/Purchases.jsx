import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Trash2, Truck } from 'lucide-react';
import InvoiceModal from '../components/InvoiceModal';

const Purchases = () => {
  const { products, addPurchase, deletePurchase, purchases, currentBranch } = useStore();
  const [isFormOpen, setIsFormOpen]     = useState(false);
  const [supplier, setSupplier]         = useState('');
  const [items, setItems]               = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const handleAddItem = () => {
    if (products.length === 0) return alert('Tambahkan produk terlebih dahulu di menu Manajemen Produk.');
    setItems([...items, { productId: products[0].id, quantity: 1, cost: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return alert('Tambahkan setidaknya 1 produk');

    const totalAmount = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.cost)), 0);

    addPurchase({
      branchId: currentBranch.id,
      supplier,
      totalAmount,
      items: items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        cost: Number(item.cost),
      })),
    });

    setIsFormOpen(false);
    setSupplier('');
    setItems([]);
  };

  const handleDeletePurchase = (purchaseId) => {
    if (window.confirm('Yakin ingin menghapus riwayat pembelian ini? Stok dan HPP barang akan otomatis dikembalikan.')) {
      deletePurchase(purchaseId);
    }
  };

  const branchPurchases = purchases
    .filter(p => p.branchId === currentBranch?.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Pembelian Produk</h2>
          <p>Catat kulakan/pembelian stok dari supplier untuk {currentBranch?.name}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(!isFormOpen)}>
          <Truck size={18} /> {isFormOpen ? 'Tutup Form' : 'Catat Pembelian Baru'}
        </button>
      </div>

      {isFormOpen && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ maxWidth: '400px' }}>
              <label className="form-label">Nama Supplier</label>
              <input
                required className="form-input"
                value={supplier}
                onChange={e => setSupplier(e.target.value)}
                placeholder="Contoh: PT. Sumber Makmur"
              />
            </div>

            <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Item Pembelian</h4>
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-center" style={{ marginBottom: '0.75rem' }}>
                  <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                    <select className="form-select" value={item.productId} onChange={e => updateItem(index, 'productId', e.target.value)}>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} (SKU: {p.sku})</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <input type="number" min="1" required className="form-input" placeholder="Qty" value={item.quantity} onChange={e => updateItem(index, 'quantity', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <input type="number" min="0" required className="form-input" placeholder="Harga Beli (Satuan)" value={item.cost} onChange={e => updateItem(index, 'cost', e.target.value)} />
                  </div>
                  <div style={{ width: '120px', fontWeight: 500 }}>
                    Rp {(Number(item.quantity) * Number(item.cost)).toLocaleString('id-ID')}
                  </div>
                  <button type="button" className="btn btn-icon btn-danger" onClick={() => removeItem(index)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={handleAddItem} style={{ marginTop: '0.5rem' }}>
                <Plus size={16} /> Tambah Baris
              </button>
            </div>

            <div className="flex justify-between items-center" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                Total: Rp {items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.cost)), 0).toLocaleString('id-ID')}
              </div>
              <button type="submit" className="btn btn-primary">Simpan Pembelian & Update HPP</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Supplier</th>
              <th>Jumlah Item</th>
              <th>Total Pembelian</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {branchPurchases.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada histori pembelian</td></tr>
            ) : branchPurchases.map(purchase => (
              <tr key={purchase.id}>
                <td>
                  {new Date(purchase.date).toLocaleDateString('id-ID', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </td>
                <td style={{ fontWeight: 500 }}>{purchase.supplier}</td>
                <td>
                  {/* Klik untuk tampilkan detail pembelian */}
                  <button
                    onClick={() => setSelectedPurchase(purchase)}
                    style={{
                      background: '#fdf2f8', border: '1px solid #f0abfc',
                      borderRadius: '999px', padding: '0.2rem 0.75rem',
                      color: '#9333ea', fontWeight: 600, cursor: 'pointer',
                      fontSize: '0.8rem', transition: 'all 150ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fae8ff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fdf2f8'; }}
                    title="Klik untuk lihat detail pembelian"
                  >
                    {purchase.items.length} jenis produk 📋
                  </button>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--danger-color)' }}>
                  Rp {purchase.totalAmount?.toLocaleString('id-ID')}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-icon btn-danger" 
                    title="Hapus Pembelian"
                    onClick={() => handleDeletePurchase(purchase.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Purchase Detail Modal */}
      {selectedPurchase && (
        <InvoiceModal
          type="purchase"
          data={selectedPurchase}
          branchName={currentBranch?.name}
          products={products}
          onClose={() => setSelectedPurchase(null)}
        />
      )}
    </div>
  );
};

export default Purchases;

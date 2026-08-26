import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Edit, Trash2, ChevronDown, ClipboardList, Search } from 'lucide-react';

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct, currentBranch } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  // State for Opname Modal
  const [opnameModal, setOpnameModal] = useState({ isOpen: false, product: null, actualStock: '', note: '' });
  const { addOpname } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  // Ambil kategori unik dari semua produk yang ada
  const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];

  // Tutup dropdown kategori saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    unit: '',
    price: 0,
    image: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 300 * 1024) {
        alert('Ukuran gambar maksimal adalah 300 KB!');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, { ...formData, price: Number(formData.price) });
    } else {
      addProduct({ ...formData, price: Number(formData.price) });
    }
    closeForm();
  };

  const openForm = (product = null) => {
    if (product) {
      setFormData({ sku: product.sku, name: product.name, category: product.category, unit: product.unit || '', price: product.price, image: product.image || '' });
      setEditingId(product.id);
    } else {
      setFormData({ sku: '', name: '', category: '', unit: '', price: 0, image: '' });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  const handleOpnameSubmit = (e) => {
    e.preventDefault();
    const actualStock = parseInt(opnameModal.actualStock);
    if (!isNaN(actualStock) && actualStock >= 0) {
      addOpname(opnameModal.product.id, currentBranch.id, actualStock, opnameModal.note);
      setOpnameModal({ isOpen: false, product: null, actualStock: '', note: '' });
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Manajemen Produk</h2>
          <p>Kelola daftar produk dan pantau stok di {currentBranch?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Cari SKU, Nama, Kategori..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem', width: '250px' }}
            />
          </div>
          <button className="btn btn-primary" onClick={() => openForm()} style={{ whiteSpace: 'nowrap' }}>
            <Plus size={18} /> Tambah Produk
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Gambar Produk</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" style={{ flex: 1, padding: '0.5rem' }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">SKU</label>
                <input required className="form-input" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Nama Produk</label>
                <input required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group" ref={categoryRef} style={{ position: 'relative' }}>
                <label className="form-label">Kategori</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    className="form-input"
                    placeholder="Pilih atau ketik kategori baru"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    onFocus={() => setIsCategoryOpen(true)}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsCategoryOpen(prev => !prev)}
                    style={{
                      position: 'absolute', right: '0.5rem', top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', cursor: 'pointer', padding: '0.25rem',
                      color: 'var(--text-secondary)', display: 'flex', alignItems: 'center'
                    }}
                  >
                    <ChevronDown size={16} style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>
                </div>
                {isCategoryOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 9999,
                    background: '#ffffff', border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                    marginTop: '0.25rem', overflow: 'hidden'
                  }}>
                    {uniqueCategories.length === 0 ? (
                      <div style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.875rem' }}>
                        Belum ada kategori tersimpan
                      </div>
                    ) : (
                      uniqueCategories
                        .filter(cat => cat.toLowerCase().includes(formData.category.toLowerCase()) || formData.category === '')
                        .map(cat => (
                          <div
                            key={cat}
                            onMouseDown={() => {
                              setFormData({...formData, category: cat});
                              setIsCategoryOpen(false);
                            }}
                            style={{
                              padding: '0.625rem 1rem', cursor: 'pointer',
                              fontSize: '0.875rem',
                              background: formData.category === cat ? '#eff6ff' : '#ffffff',
                              color: formData.category === cat ? '#2563eb' : '#0f172a',
                              fontWeight: formData.category === cat ? 600 : 400,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = formData.category === cat ? '#eff6ff' : '#ffffff'; e.currentTarget.style.color = formData.category === cat ? '#2563eb' : '#0f172a'; }}
                          >
                            {cat}
                          </div>
                        ))
                    )}
                    {formData.category && !uniqueCategories.includes(formData.category) && (
                      <div
                        onMouseDown={() => setIsCategoryOpen(false)}
                        style={{
                          padding: '0.625rem 1rem', cursor: 'pointer',
                          fontSize: '0.875rem', borderTop: uniqueCategories.length > 0 ? '1px solid #e2e8f0' : 'none',
                          color: '#2563eb', fontStyle: 'italic', background: '#ffffff'
                        }}
                      >
                        + Tambah "{formData.category}" sebagai kategori baru
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Satuan</label>
                <input required className="form-input" placeholder="Contoh: pcs, kg, liter" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Harga Jual (Rp)</label>
                <input required type="number" className="form-input" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={closeForm}>Batal</button>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* Opname Modal */}
      {opnameModal.isOpen && (() => {
        const product = opnameModal.product;
        const systemStock = product?.stocks?.[currentBranch?.id] || 0;
        const actualStock = opnameModal.actualStock === '' ? '' : parseInt(opnameModal.actualStock);
        const difference = actualStock === '' ? '' : actualStock - systemStock;
        const isDiffNegative = difference !== '' && difference < 0;
        const isDiffPositive = difference !== '' && difference > 0;
        const diffColor = isDiffNegative ? 'var(--danger-color)' : isDiffPositive ? 'var(--success-color)' : 'inherit';

        return (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Opname Stok - {product.name}</h3>
              <form onSubmit={handleOpnameSubmit}>
                <div className="form-group">
                  <label className="form-label">Stok Sistem (Saat Ini)</label>
                  <input className="form-input" disabled value={systemStock} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stok Fisik (Aktual)</label>
                  <input required type="number" min="0" className="form-input" value={opnameModal.actualStock} onChange={e => setOpnameModal({...opnameModal, actualStock: e.target.value})} autoFocus />
                </div>
                <div className="form-group">
                  <label className="form-label">Selisih</label>
                  <input className="form-input" disabled style={{ color: diffColor, fontWeight: 600 }} value={difference} />
                </div>
                <div className="form-group">
                  <label className="form-label">Catatan (Opsional)</label>
                  <input className="form-input" placeholder="Contoh: Barang rusak atau salah catat" value={opnameModal.note} onChange={e => setOpnameModal({...opnameModal, note: e.target.value})} />
                </div>
                <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setOpnameModal({ isOpen: false, product: null, actualStock: '', note: '' })}>Batal</button>
                  <button type="submit" className="btn btn-primary" disabled={actualStock === '' || actualStock === systemStock}>Simpan Opname</button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nama Produk</th>
              <th>Gambar</th>
              <th>Kategori</th>
              <th>Satuan</th>
              <th>Harga Jual</th>
              <th>HPP (Rata-rata)</th>
              <th>Stok (Cabang Ini)</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr><td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>Belum ada produk</td></tr>
            ) : filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td style={{ fontWeight: 500 }}>{product.name}</td>
                <td>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '10px' }}>No Img</div>
                  )}
                </td>
                <td><span className="badge badge-success">{product.category}</span></td>
                <td>{product.unit || '-'}</td>
                <td>Rp {product.price?.toLocaleString('id-ID')}</td>
                <td>Rp {product.cogs?.toLocaleString('id-ID') || 0}</td>
                <td>
                  <span className={`badge ${product.stocks[currentBranch?.id] > 5 ? 'badge-success' : 'badge-warning'}`}>
                    {product.stocks[currentBranch?.id] || 0}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-icon btn-secondary" title="Opname Stok" onClick={() => setOpnameModal({ isOpen: true, product: product, actualStock: '', note: '' })}><ClipboardList size={16} /></button>
                    <button className="btn btn-icon btn-secondary" onClick={() => openForm(product)}><Edit size={16} /></button>
                    <button className="btn btn-icon btn-danger" onClick={() => deleteProduct(product.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

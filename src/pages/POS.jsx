import React, { useState, useMemo, useRef } from 'react';
import { useStore } from '../store/useStore';
import { ShoppingCart, Search, Trash2, CheckCircle, Banknote, ArrowLeftRight, Printer, X } from 'lucide-react';

/* ─── Komponen Modal Pembayaran ─────────────────────────────────────── */
const PaymentModal = ({ totalAmount, onClose, onConfirm }) => {
  const [method, setMethod]       = useState('cash');   // 'cash' | 'transfer'
  const [cashInput, setCashInput] = useState('');

  const paid    = Number(cashInput.replace(/\D/g, '')) || 0;
  const change  = paid - totalAmount;
  const isValid = method === 'transfer' || paid >= totalAmount;

  const handleInput = (val) => {
    const num = val.replace(/\D/g, '');
    setCashInput(num ? Number(num).toLocaleString('id-ID') : '');
  };

  const handleConfirm = () => {
    onConfirm({
      method,
      paid: method === 'transfer' ? totalAmount : paid,
      change: method === 'transfer' ? 0 : change,
    });
  };

  return (
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
        {/* Header */}
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Pilih Metode Pembayaran</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Total */}
        <div style={{
          background: '#eff6ff', borderRadius: '0.75rem',
          padding: '1rem 1.25rem', marginBottom: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ color: '#3b82f6', fontWeight: 500 }}>Total Tagihan</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d4ed8' }}>
            Rp {totalAmount.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Pilihan Metode */}
        <div className="flex gap-2" style={{ marginBottom: '1.5rem' }}>
          {[
            { id: 'cash', label: 'Tunai', icon: <Banknote size={20} /> },
            { id: 'transfer', label: 'Transfer', icon: <ArrowLeftRight size={20} /> },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => { setMethod(m.id); setCashInput(''); }}
              style={{
                flex: 1, padding: '0.875rem', borderRadius: '0.625rem',
                border: `2px solid ${method === m.id ? '#2563eb' : '#e2e8f0'}`,
                background: method === m.id ? '#eff6ff' : '#ffffff',
                color: method === m.id ? '#2563eb' : '#64748b',
                fontWeight: method === m.id ? 700 : 500,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '0.5rem',
                transition: 'all 150ms ease',
              }}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Input Uang Tunai */}
        {method === 'cash' && (
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
              Uang Diterima
            </label>
            <input
              autoFocus
              className="form-input w-full"
              style={{ fontSize: '1.125rem', fontWeight: 600, textAlign: 'right' }}
              placeholder="0"
              value={cashInput}
              onChange={e => handleInput(e.target.value)}
            />
            {/* Shortcut nominal */}
            <div className="flex gap-2" style={{ marginTop: '0.75rem', flexWrap: 'wrap' }}>
              {[10000, 20000, 50000, 100000].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => handleInput(String(n))}
                  style={{
                    padding: '0.375rem 0.75rem', borderRadius: '999px',
                    border: '1px solid #e2e8f0', background: '#f8fafc',
                    fontSize: '0.75rem', cursor: 'pointer', color: '#374151',
                  }}
                >
                  {(n / 1000).toFixed(0)}rb
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleInput(String(totalAmount))}
                style={{
                  padding: '0.375rem 0.75rem', borderRadius: '999px',
                  border: '1px solid #2563eb', background: '#eff6ff',
                  fontSize: '0.75rem', cursor: 'pointer', color: '#2563eb', fontWeight: 600,
                }}
              >
                Uang Pas
              </button>
            </div>
          </div>
        )}

        {/* Kembalian */}
        {method === 'cash' && cashInput !== '' && (
          <div style={{
            background: change >= 0 ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${change >= 0 ? '#bbf7d0' : '#fecaca'}`,
            borderRadius: '0.625rem', padding: '0.875rem 1.25rem',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '1.25rem',
          }}>
            <span style={{ fontWeight: 500, color: change >= 0 ? '#166534' : '#991b1b' }}>
              {change >= 0 ? 'Kembalian' : 'Kurang'}
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: change >= 0 ? '#16a34a' : '#dc2626' }}>
              Rp {Math.abs(change).toLocaleString('id-ID')}
            </span>
          </div>
        )}

        {/* Info Transfer */}
        {method === 'transfer' && (
          <div style={{
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '0.625rem', padding: '0.875rem 1.25rem', marginBottom: '1.25rem',
          }}>
            <p style={{ color: '#166534', margin: 0, fontSize: '0.875rem' }}>
              💳 Pastikan nominal transfer sudah diterima sebelum menekan tombol Konfirmasi.
            </p>
          </div>
        )}

        {/* Tombol Konfirmasi */}
        <button
          className="btn btn-primary w-full"
          style={{ padding: '0.875rem', fontSize: '1rem', borderRadius: '0.625rem' }}
          disabled={!isValid}
          onClick={handleConfirm}
        >
          <CheckCircle size={18} /> Konfirmasi Pembayaran
        </button>
      </div>
    </div>
  );
};

/* ─── Komponen Invoice Printout ─────────────────────────────────────── */
const InvoiceModal = ({ invoice, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open('', '_blank', 'width=400,height=600');
    win.document.write(`
      <html>
        <head>
          <title>Invoice ${invoice.invoiceNo}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Courier New', monospace; font-size: 12px; width: 300px; margin: 0 auto; padding: 8px; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .divider { border-top: 1px dashed #000; margin: 6px 0; }
            .row { display: flex; justify-content: space-between; }
            .right { text-align: right; }
            .mt { margin-top: 6px; }
            .lg { font-size: 14px; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 300);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10001,
      background: 'rgba(0,0,0,0.55)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '1rem',
        width: '100%', maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        display: 'flex', flexDirection: 'column', maxHeight: '90vh',
      }}>
        {/* Toolbar */}
        <div className="flex justify-between items-center" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0 }}>Invoice Transaksi</h3>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="btn btn-primary"
              style={{ gap: '0.4rem', padding: '0.5rem 1rem' }}
            >
              <Printer size={16} /> Print
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Struk */}
        <div style={{ overflowY: 'auto', padding: '1.5rem' }}>
          <div
            ref={printRef}
            style={{ fontFamily: "'Courier New', monospace", fontSize: '13px', lineHeight: 1.6 }}
          >
            {/* Kepala */}
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>{invoice.branchName}</div>
              <div style={{ fontSize: '11px', color: '#555' }}>Sistem Kasir POS</div>
            </div>
            <div style={{ borderTop: '1px dashed #999', margin: '8px 0' }} />

            <div style={{ fontSize: '11px', color: '#555' }}>No: {invoice.invoiceNo}</div>
            <div style={{ fontSize: '11px', color: '#555' }}>Tgl: {invoice.date}</div>
            <div style={{ fontSize: '11px', color: '#555' }}>Kasir: {invoice.cashierName}</div>
            <div style={{ borderTop: '1px dashed #999', margin: '8px 0' }} />

            {/* Item */}
            {invoice.items.map((item, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555' }}>{item.qty} x Rp {item.price.toLocaleString('id-ID')}</span>
                  <span style={{ fontWeight: 600 }}>Rp {((item.price - (item.discount || 0)) * item.qty).toLocaleString('id-ID')}</span>
                </div>
                {item.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#dc2626' }}>
                    <span>Diskon per item: Rp {item.discount.toLocaleString('id-ID')}</span>
                    <span>- Rp {(item.discount * item.qty).toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>
            ))}

            <div style={{ borderTop: '1px dashed #999', margin: '8px 0' }} />

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>
              <span>TOTAL</span>
              <span>Rp {invoice.total.toLocaleString('id-ID')}</span>
            </div>

            <div style={{ borderTop: '1px dashed #999', margin: '8px 0' }} />

            {/* Pembayaran */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>Metode</span>
              <span style={{ fontWeight: 600 }}>{invoice.method === 'cash' ? '💵 Tunai' : '💳 Transfer'}</span>
            </div>
            {invoice.method === 'cash' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>Dibayar</span>
                  <span>Rp {invoice.paid.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                  <span>Kembalian</span>
                  <span>Rp {invoice.change.toLocaleString('id-ID')}</span>
                </div>
              </>
            )}

            <div style={{ borderTop: '1px dashed #999', margin: '12px 0' }} />
            <div style={{ textAlign: 'center', fontSize: '11px', color: '#777' }}>
              Terima kasih telah berbelanja!<br />Barang yang sudah dibeli tidak dapat dikembalikan.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Halaman POS Utama ──────────────────────────────────────────────── */
const POS = () => {
  const { products, addSale, addCashflow, currentBranch, currentUser } = useStore();
  const [searchTerm, setSearchTerm]       = useState('');
  const [cart, setCart]                   = useState([]);
  const [showPayment, setShowPayment]     = useState(false);
  const [invoice, setInvoice]             = useState(null);

  const searchInputRef = useRef(null);

  const availableProducts = useMemo(() => {
    return products.filter(p =>
      (p.stocks[currentBranch?.id] || 0) > 0 &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, currentBranch, searchTerm]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.productId === product.id);
    const currentStock = product.stocks[currentBranch?.id] || 0;
    if (existing) {
      if (existing.quantity >= currentStock) return alert('Stok tidak mencukupi');
      setCart(cart.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { productId: product.id, product, quantity: 1, price: product.price, cogs: product.cogs, discount: 0 }]);
    }
  };

  const handleScan = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      // Find exact match by SKU
      const exactMatch = products.find(p => p.sku.toLowerCase() === searchTerm.toLowerCase());
      if (exactMatch) {
        if ((exactMatch.stocks[currentBranch?.id] || 0) > 0) {
          addToCart(exactMatch);
          setSearchTerm('');
        } else {
          alert('Stok tidak mencukupi');
        }
      }
    }
  };

  const updateDiscount = (productId, newDiscount) => {
    const discount = parseInt(newDiscount) || 0;
    setCart(cart.map(item => item.productId === productId ? { ...item, discount } : item));
  };

  const updateQuantity = (productId, newQty) => {
    const qty = parseInt(newQty);
    if (isNaN(qty) || qty < 1) return;
    const product = products.find(p => p.id === productId);
    const currentStock = product.stocks[currentBranch?.id] || 0;
    if (qty > currentStock) return alert('Stok tidak mencukupi');
    setCart(cart.map(item => item.productId === productId ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + ((item.price - (item.discount || 0)) * item.quantity), 0);

  const handlePaymentConfirm = ({ method, paid, change }) => {
    const invoiceNo = `INV-${Date.now()}`;
    const now = new Date();

    // Simpan penjualan
    addSale({
      branchId: currentBranch.id,
      userId: currentUser.id,
      totalAmount,
      paymentMethod: method,
      invoiceNo,
      items: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        cogs: item.cogs,
        discount: item.discount || 0,
      })),
    });

    // Cashflow only if paid with cash
    if (method === 'cash') {
      addCashflow({
        branchId: currentBranch.id,
        type: 'in',
        category: 'Penjualan',
        amount: totalAmount,
        description: `Penjualan Kasir (${cart.length} item) - Tunai`,
      });
    }

    // Buat data invoice
    setInvoice({
      invoiceNo,
      branchName: currentBranch.name,
      cashierName: currentUser.name,
      date: now.toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: cart.map(item => ({
        name: item.product.name,
        qty: item.quantity,
        price: item.price,
        discount: item.discount || 0,
      })),
      total: totalAmount,
      method,
      paid,
      change,
    });

    setShowPayment(false);
    setCart([]);
    
    // Refocus the scanner input after payment
    setTimeout(() => {
      if (searchInputRef.current) searchInputRef.current.focus();
    }, 100);
  };

  return (
    <>
      <div className="flex gap-4" style={{ height: 'calc(100vh - 120px)' }}>
        {/* Produk */}
        <div className="card" style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem', position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              ref={searchInputRef}
              autoFocus
              type="text"
              className="form-input w-full"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Scan Barcode SKU atau Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleScan}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div className="grid grid-cols-3 gap-4">
              {availableProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.sku}</div>
                    <div style={{ fontWeight: 600, margin: '0.25rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</div>
                    <div style={{ color: 'var(--primary-color)', fontWeight: 500 }}>Rp {product.price?.toLocaleString('id-ID')}</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                      Stok: {product.stocks[currentBranch?.id] || 0}
                    </div>
                  </div>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '0.5rem', marginLeft: '0.75rem' }} />
                  ) : (
                    <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '0.5rem', marginLeft: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '10px' }}>No Image</div>
                  )}
                </div>
              ))}
              {availableProducts.length === 0 && (
                <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Tidak ada produk tersedia (Stok habis atau belum ditambahkan).
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Keranjang & Checkout */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <ShoppingCart size={20} />
            <h3 style={{ margin: 0 }}>Keranjang</h3>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>Keranjang masih kosong</div>
            ) : (
              <div className="flex flex-col gap-2">
                {cart.map(item => (
                  <div key={item.productId} style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                      <div className="flex items-center gap-2">
                        <div style={{ fontWeight: 500 }}>{item.product.name}</div>
                        {item.product.image ? (
                          <img src={item.product.image} alt={item.product.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                        ) : (
                          <div style={{ width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '10px' }}>No Img</div>
                        )}
                      </div>
                      <button className="btn-icon" onClick={() => removeFromCart(item.productId)} style={{ color: 'var(--danger-color)', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                      <div style={{ color: 'var(--primary-color)' }}>Rp {item.price?.toLocaleString('id-ID')}</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          className="form-input"
                          style={{ width: '60px', padding: '0.25rem', textAlign: 'center' }}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center" style={{ fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Diskon per item:</span>
                      <input
                        type="number"
                        min="0"
                        className="form-input"
                        style={{ width: '100px', padding: '0.25rem', textAlign: 'right' }}
                        placeholder="Rp 0"
                        value={item.discount || ''}
                        onChange={(e) => updateDiscount(item.productId, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
              <span>Total:</span>
              <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <button
              className="btn btn-primary w-full"
              style={{ padding: '1rem', fontSize: '1.125rem' }}
              disabled={cart.length === 0}
              onClick={() => setShowPayment(true)}
            >
              <CheckCircle size={20} /> Bayar Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Modal Pembayaran */}
      {showPayment && (
        <PaymentModal
          totalAmount={totalAmount}
          onClose={() => setShowPayment(false)}
          onConfirm={handlePaymentConfirm}
        />
      )}

      {/* Modal Invoice */}
      {invoice && (
        <InvoiceModal
          invoice={invoice}
          onClose={() => setInvoice(null)}
        />
      )}
    </>
  );
};

export default POS;

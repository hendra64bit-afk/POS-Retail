import React, { useRef } from 'react';
import { X, Printer } from 'lucide-react';
import { useStore } from '../store/useStore';

/**
 * InvoiceModal — digunakan untuk penjualan (sale) maupun pembelian (purchase).
 *
 * Props:
 *  - type: 'sale' | 'purchase'
 *  - data: objek sale atau purchase dari store
 *  - branchName: nama cabang
 *  - products: array produk (untuk resolve nama produk dari productId)
 *  - users: array user (untuk resolve nama kasir dari userId) — opsional
 *  - onClose: fn tutup modal
 */
const InvoiceModal = ({ type = 'sale', data, branchName, products = [], users = [], onClose, onReturnItem }) => {
  const printRef = useRef();
  const { storeSettings } = useStore();

  if (!data) return null;

  /* ── Resolve nama produk ───────────────────────────── */
  const getProductName = (productId) => {
    const p = products.find(p => p.id === productId);
    return p ? p.name : productId;
  };

  const getProductSku = (productId) => {
    const p = products.find(p => p.id === productId);
    return p ? p.sku : '-';
  };

  const getUserName = (userId) => {
    const u = users.find(u => u.id === userId);
    return u ? u.name : '-';
  };

  /* ── Data dinamis berdasar type ────────────────────── */
  const isSale = type === 'sale';
  const docNo  = isSale
    ? (data.invoiceNo || data.id?.slice(0, 8).toUpperCase())
    : `PO-${data.id?.slice(0, 8).toUpperCase()}`;

  const dateStr = new Date(data.date).toLocaleString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const items = (data.items || []).map(item => {
    const effectiveQty = item.quantity - (item.returnedQty || 0);
    const price = isSale ? item.price : item.cost;
    const discount = item.discount || 0;
    return {
      productId: item.productId,
      name: isSale ? getProductName(item.productId) : getProductName(item.productId),
      sku: getProductSku(item.productId),
      originalQty: item.quantity,
      qty: effectiveQty,
      returnedQty: item.returnedQty || 0,
      price: price,
      discount: discount,
      total: effectiveQty * (price - discount),
    };
  }).filter(item => item.originalQty > 0);

  const grandTotal = data.totalAmount ?? items.reduce((s, i) => s + i.total, 0);

  /* ── Print ─────────────────────────────────────────── */
  const handlePrint = () => {
    const win = window.open('', '_blank', 'width=420,height=700');
    win.document.write(`
      <html>
        <head>
          <title>${isSale ? 'Invoice' : 'Purchase Order'} ${docNo}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Courier New', monospace; font-size: 12px;
                   width: 300px; margin: 0 auto; padding: 12px; color: #111; }
            .center { text-align: center; }
            .right  { text-align: right; }
            .bold   { font-weight: bold; }
            .divider { border-top: 1px dashed #555; margin: 8px 0; }
            .row { display: flex; justify-content: space-between; }
            .label { color: #555; }
            .item-name { font-weight: 600; margin-bottom: 2px; }
            .totals { margin-top: 4px; }
            .no-print { display: none !important; }
          </style>
        </head>
        <body>${printRef.current.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 350);
  };

  /* ── Render ────────────────────────────────────────── */
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', borderRadius: '1rem',
        width: '100%', maxWidth: '420px', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>

        {/* ── Toolbar ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0',
        }}>
          <h3 style={{ margin: 0 }}>{isSale ? 'Invoice Penjualan' : 'Detail Pembelian'}</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: 'none',
                background: '#2563eb', color: '#fff', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.875rem',
              }}
            >
              <Printer size={15} /> Print
            </button>
            <button onClick={onClose} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
              display: 'flex', alignItems: 'center',
            }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── Struk ── */}
        <div style={{ overflowY: 'auto', padding: '1.5rem' }}>
          <div
            ref={printRef}
            style={{ fontFamily: "'Courier New', monospace", fontSize: '13px', lineHeight: 1.65, color: '#111' }}
          >
            {/* Header toko */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>{storeSettings?.name || 'POS System'}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{branchName}</div>
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
                {isSale ? 'Struk Pembayaran' : 'Purchase Order'}
              </div>
            </div>

            <div style={{ borderTop: '1px dashed #888', margin: '8px 0' }} />

            {/* Meta */}
            <div style={{ fontSize: '11px', color: '#444', marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>No</span>
                <span style={{ fontWeight: 600 }}>{docNo}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tanggal</span>
                <span>{dateStr}</span>
              </div>
              {isSale && data.userId && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Kasir</span>
                  <span>{getUserName(data.userId)}</span>
                </div>
              )}
              {!isSale && data.supplier && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Supplier</span>
                  <span>{data.supplier}</span>
                </div>
              )}
              {isSale && data.paymentMethod && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Metode</span>
                  <span style={{ fontWeight: 600 }}>
                    {data.paymentMethod === 'cash' ? '💵 Tunai' : '💳 Transfer'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px dashed #888', margin: '8px 0' }} />

            {/* Items */}
            {items.map((item, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item.name} {item.returnedQty > 0 ? <span style={{ color: '#dc2626', fontSize: '10px' }}>(Retur: {item.returnedQty})</span> : ''}</span>
                  {isSale && onReturnItem && item.originalQty > item.returnedQty && (
                    <button 
                      className="no-print"
                      onClick={() => {
                        const retQty = parseInt(window.prompt(`Berapa banyak ${item.name} yang ingin diretur? (Maks: ${item.originalQty - item.returnedQty})`, "1"));
                        if (retQty > 0 && retQty <= (item.originalQty - item.returnedQty)) {
                          onReturnItem(data.id, item.productId, retQty);
                        }
                      }}
                      style={{
                        background: '#fee2e2', border: '1px solid #fecaca',
                        borderRadius: '4px', padding: '2px 6px',
                        color: '#dc2626', cursor: 'pointer', fontSize: '10px'
                      }}
                    >
                      Retur
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: '#555' }}>SKU: {item.sku}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>{item.qty} x Rp {item.price.toLocaleString('id-ID')}</span>
                  <span style={{ fontWeight: 600 }}>Rp {item.total.toLocaleString('id-ID')}</span>
                </div>
                {item.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#dc2626' }}>
                    <span>Diskon per item: Rp {item.discount.toLocaleString('id-ID')}</span>
                    <span>- Rp {(item.discount * item.qty).toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>
            ))}

            <div style={{ borderTop: '1px dashed #888', margin: '8px 0' }} />

            {/* Total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontWeight: 700, fontSize: '14px', marginBottom: '6px',
            }}>
              <span>TOTAL</span>
              <span style={{ color: isSale ? '#16a34a' : '#dc2626' }}>
                Rp {grandTotal.toLocaleString('id-ID')}
              </span>
            </div>

            <div style={{ borderTop: '1px dashed #888', margin: '8px 0' }} />

            {/* Footer */}
            <div style={{ textAlign: 'center', fontSize: '11px', color: '#777', marginTop: '8px' }}>
              {isSale
                ? 'Terima kasih telah berbelanja!\nBarang yang sudah dibeli tidak dapat dikembalikan.'
                : 'Dokumen pembelian resmi.\nHarap simpan sebagai bukti transaksi.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;

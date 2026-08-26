import React from 'react';
import { useStore } from '../store/useStore';
import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { isToday, isThisMonth, parseISO } from 'date-fns';

const StatCard = ({ title, value, icon, color }) => (
  <div className="card flex items-center" style={{ gap: '1rem' }}>
    <div style={{ backgroundColor: color, color: 'white', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: '0.875rem' }}>{title}</p>
      <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { sales, products, currentBranch } = useStore();

  const branchSales = sales.filter(s => s.branchId === currentBranch?.id);
  
  const todaySales = branchSales.filter(s => isToday(parseISO(s.date)));
  const todayRevenue = todaySales.reduce((sum, s) => sum + s.totalAmount, 0);
  
  const monthSales = branchSales.filter(s => isThisMonth(parseISO(s.date)));
  const monthRevenue = monthSales.reduce((sum, s) => sum + s.totalAmount, 0);

  const lowStockProducts = products.filter(p => (p.stocks[currentBranch?.id] || 0) <= 5);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboard Overview</h2>
      
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2rem' }}>
        <StatCard 
          title="Pendapatan Hari Ini" 
          value={`Rp ${todayRevenue.toLocaleString('id-ID')}`} 
          icon={<DollarSign size={24} />} 
          color="var(--success-color)" 
        />
        <StatCard 
          title="Transaksi Hari Ini" 
          value={todaySales.length} 
          icon={<ShoppingCart size={24} />} 
          color="var(--primary-color)" 
        />
        <StatCard 
          title="Pendapatan Bulan Ini" 
          value={`Rp ${monthRevenue.toLocaleString('id-ID')}`} 
          icon={<TrendingUp size={24} />} 
          color="#8b5cf6" 
        />
        <StatCard 
          title="Produk Stok Menipis" 
          value={lowStockProducts.length} 
          icon={<Package size={24} />} 
          color="var(--warning-color)" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Transaksi Terbaru</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {branchSales.slice().reverse().slice(0, 5).map(sale => (
                  <tr key={sale.id}>
                    <td>{new Date(sale.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td style={{ fontWeight: 600 }}>Rp {sale.totalAmount.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
                {branchSales.length === 0 && (
                  <tr><td colSpan="2" style={{ textAlign: 'center' }}>Belum ada transaksi</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Peringatan Stok</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Sisa Stok</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.slice(0, 5).map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <span className="badge badge-danger">
                        {product.stocks[currentBranch?.id] || 0}
                      </span>
                    </td>
                  </tr>
                ))}
                {lowStockProducts.length === 0 && (
                  <tr><td colSpan="2" style={{ textAlign: 'center' }}>Semua stok aman</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

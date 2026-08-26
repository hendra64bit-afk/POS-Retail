import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { isWithinInterval, startOfMonth, endOfMonth, parseISO, format } from 'date-fns';
import { id } from 'date-fns/locale';

const Reports = () => {
  const { sales, cashflows, opnames, currentBranch } = useStore();
  const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  const dateObject = new Date(`${reportMonth}-01`);
  const interval = {
    start: startOfMonth(dateObject),
    end: endOfMonth(dateObject)
  };

  // Filter data for the selected month and branch
  const branchSales = sales.filter(s => s.branchId === currentBranch?.id && isWithinInterval(parseISO(s.date), interval));
  const branchCashflows = cashflows.filter(c => c.branchId === currentBranch?.id && isWithinInterval(parseISO(c.date), interval));

  // Calculations
  const totalRevenue = branchSales.reduce((sum, s) => sum + s.totalAmount, 0);
  
  const totalCOGS = branchSales.reduce((sum, sale) => {
    return sum + sale.items.reduce((itemSum, item) => itemSum + (item.quantity * item.cogs), 0);
  }, 0);

  const grossProfit = totalRevenue - totalCOGS;

  const expenses = branchCashflows.filter(c => c.type === 'out').reduce((sum, c) => sum + c.amount, 0);

  const branchOpnames = (opnames || []).filter(o => o.branchId === currentBranch?.id && isWithinInterval(parseISO(o.date), interval));
  const opnameLoss = branchOpnames.filter(o => o.difference < 0).reduce((sum, o) => sum + (Math.abs(o.difference) * o.cogsAtOpname), 0);

  const netProfit = grossProfit - expenses - opnameLoss;

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Laporan Laba Rugi</h2>
          <p>Periode: {format(dateObject, 'MMMM yyyy', { locale: id })}</p>
        </div>
        <div className="form-group" style={{ width: '200px' }}>
          <input 
            type="month" 
            className="form-input" 
            value={reportMonth} 
            onChange={(e) => setReportMonth(e.target.value)} 
          />
        </div>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Laporan Laba Rugi ({currentBranch?.name})</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem 0', fontWeight: 600 }} colSpan="2">Pendapatan Penjualan</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 0', paddingLeft: '2rem' }}>Penjualan Kotor</td>
              <td style={{ textAlign: 'right' }}>Rp {totalRevenue.toLocaleString('id-ID')}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 0', paddingLeft: '2rem' }}>Harga Pokok Penjualan (HPP)</td>
              <td style={{ textAlign: 'right', color: 'var(--danger-color)' }}>(Rp {totalCOGS.toLocaleString('id-ID')})</td>
            </tr>
            <tr style={{ borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)' }}>
              <td style={{ padding: '1rem 0', fontWeight: 600 }}>Laba Kotor</td>
              <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '1.125rem' }}>Rp {grossProfit.toLocaleString('id-ID')}</td>
            </tr>
            
            <tr>
              <td style={{ padding: '1rem 0 0.75rem 0', fontWeight: 600 }} colSpan="2">Biaya Operasional</td>
            </tr>
            {branchCashflows.filter(c => c.type === 'out').map(expense => (
              <tr key={expense.id}>
                <td style={{ padding: '0.5rem 0', paddingLeft: '2rem', color: 'var(--text-muted)' }}>{expense.category} - {expense.description}</td>
                <td style={{ textAlign: 'right', color: 'var(--danger-color)' }}>(Rp {expense.amount.toLocaleString('id-ID')})</td>
              </tr>
            ))}
            {opnameLoss > 0 && (
              <tr>
                <td style={{ padding: '0.5rem 0', paddingLeft: '2rem', color: 'var(--text-muted)' }}>Beban Selisih Kurang Stok (Opname)</td>
                <td style={{ textAlign: 'right', color: 'var(--danger-color)' }}>(Rp {opnameLoss.toLocaleString('id-ID')})</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: '0.5rem 0', paddingLeft: '2rem', fontWeight: 500 }}>Total Biaya Operasional</td>
              <td style={{ textAlign: 'right', color: 'var(--danger-color)' }}>(Rp {(expenses + opnameLoss).toLocaleString('id-ID')})</td>
            </tr>


            <tr style={{ borderTop: '2px dashed var(--border-color)' }}>
              <td style={{ padding: '1.5rem 0', fontWeight: 700, fontSize: '1.25rem' }}>LABA BERSIH</td>
              <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '1.5rem', color: netProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
                Rp {netProfit.toLocaleString('id-ID')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

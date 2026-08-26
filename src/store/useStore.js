import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { 
  collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, 
  writeBatch, getDocs 
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Helper to write to a collection
const addDocToDb = async (colName, data) => {
  const id = data.id || uuidv4();
  await setDoc(doc(db, colName, id), { ...data, id });
};

const updateDocInDb = async (colName, id, data) => {
  await updateDoc(doc(db, colName, id), data);
};

const deleteDocFromDb = async (colName, id) => {
  await deleteDoc(doc(db, colName, id));
};

export const useStore = create(
  persist(
    (set, get) => ({
  // --- Auth & Session ---
  currentUser: null,
  currentBranch: null,
  isInitialized: false,
  
  login: (pin) => {
    const user = get().users.find(u => u.pin === pin);
    if (user) {
      const branch = get().branches.find(b => b.id === user.branchId);
      
      // Look for active shift
      const activeShift = get().shifts.find(s => s.userId === user.id && s.branchId === branch.id && s.status === 'active');
      
      set({ currentUser: user, currentBranch: branch, activeShift: activeShift || null });
      return true;
    }
    return false;
  },
  logout: () => set({ currentUser: null, currentBranch: null, activeShift: null }),
  
  switchBranch: (branchId) => {
    const branch = get().branches.find(b => b.id === branchId);
    if (branch) set({ currentBranch: branch });
  },

  // --- Data ---
  storeSettings: { name: 'POS System' },
  branches: [],
  users: [],
  products: [],
  purchases: [],
  sales: [],
  cashflows: [],
  shifts: [],
  opnames: [],
  activeShift: null,

  // --- Initializer ---
  initFirebase: async () => {
    if (get().isInitialized) return;
    
    try {
      const collections = ['branches', 'users', 'products', 'purchases', 'sales', 'cashflows', 'shifts', 'opnames'];
      
      // Check and seed initial data if branches/users are empty
      const branchesSnap = await getDocs(collection(db, 'branches'));
      if (branchesSnap.empty) {
        await addDocToDb('branches', { id: 'b1', name: 'Cabang Utama', address: 'Jl. Merdeka No. 1' });
        await addDocToDb('branches', { id: 'b2', name: 'Cabang Selatan', address: 'Jl. Sudirman No. 45' });
      }
      const usersSnap = await getDocs(collection(db, 'users'));
      if (usersSnap.empty) {
        await addDocToDb('users', { id: 'u1', name: 'Admin Pusat', role: 'admin', branchId: 'b1', pin: '1234' });
        await addDocToDb('users', { id: 'u2', name: 'Kasir Utama', role: 'cashier', branchId: 'b1', pin: '1111' });
        await addDocToDb('users', { id: 'u3', name: 'Kasir Selatan', role: 'cashier', branchId: 'b2', pin: '2222' });
      }

      // Set up real-time listeners
      collections.forEach(colName => {
        onSnapshot(collection(db, colName), (snapshot) => {
          const data = snapshot.docs.map(doc => doc.data());
          set({ [colName]: data });
          
          // Update activeShift when shifts change
          if (colName === 'shifts') {
            const current = get().currentUser;
            const branch = get().currentBranch;
            if (current && branch) {
              const active = data.find(s => s.userId === current.id && s.branchId === branch.id && s.status === 'active');
              set({ activeShift: active || null });
            }
          }
        }, (error) => {
          console.error(`Error listening to ${colName}:`, error);
        });
      });
      
      onSnapshot(doc(db, 'settings', 'store'), (docSnap) => {
        if (docSnap.exists()) {
          set({ storeSettings: docSnap.data() });
        } else {
          setDoc(doc(db, 'settings', 'store'), { name: 'POS System' }).catch(console.error);
        }
      });
      
      set({ isInitialized: true });
    } catch (error) {
      console.error("Firebase Init Error:", error);
      alert("Gagal terhubung ke Firebase. Pastikan Rules Firestore Anda sudah diset ke Test Mode (allow read, write: if true;). Cek console browser untuk detail error.");
    }
  },

  // --- Actions ---
  // Product
  addProduct: async (product) => {
    await addDocToDb('products', { ...product, cogs: 0, stocks: {} });
  },
  updateProduct: async (id, updated) => {
    await updateDocInDb('products', id, updated);
  },
  deleteProduct: async (id) => {
    await deleteDocFromDb('products', id);
  },

  // Stock Opname
  addOpname: async (productId, branchId, actualStock, note) => {
    const product = get().products.find(p => p.id === productId);
    if (!product) return;

    const systemStock = (product.stocks && product.stocks[branchId]) ? product.stocks[branchId] : 0;
    const difference = actualStock - systemStock;
    if (difference === 0) return;

    let newCogs = product.cogs || 0;
    if (difference > 0) {
      const currentTotalStock = Object.values(product.stocks || {}).reduce((a, b) => a + b, 0);
      const currentTotalValue = currentTotalStock * (product.cogs || 0);
      const newTotalStock = currentTotalStock + difference;
      newCogs = newTotalStock > 0 ? (currentTotalValue + 0) / newTotalStock : 0;
    }

    const batch = writeBatch(db);
    
    // Add opname record
    const opnameRef = doc(db, 'opnames', uuidv4());
    batch.set(opnameRef, {
      id: opnameRef.id,
      date: new Date().toISOString(),
      productId,
      branchId,
      systemStock,
      actualStock,
      difference,
      cogsAtOpname: product.cogs || 0,
      note
    });

    // Update product stock and cogs
    const productRef = doc(db, 'products', productId);
    batch.update(productRef, {
      [`stocks.${branchId}`]: actualStock,
      cogs: newCogs
    });

    await batch.commit();
  },

  // Purchase (Updates COGS and Stock)
  addPurchase: async (purchase) => {
    const batch = writeBatch(db);
    const purchaseId = uuidv4();
    const purchaseRef = doc(db, 'purchases', purchaseId);
    
    batch.set(purchaseRef, { ...purchase, id: purchaseId, date: new Date().toISOString() });

    const products = get().products;
    
    purchase.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const currentStock = Object.values(product.stocks || {}).reduce((a, b) => a + b, 0);
        const currentTotalValue = currentStock * (product.cogs || 0);
        const newTotalValue = item.quantity * item.cost;
        const newTotalStock = currentStock + item.quantity;
        const newCogs = newTotalStock > 0 ? (currentTotalValue + newTotalValue) / newTotalStock : 0;
        
        const branchStock = (product.stocks[purchase.branchId] || 0) + item.quantity;
        
        const productRef = doc(db, 'products', item.productId);
        batch.update(productRef, {
          [`stocks.${purchase.branchId}`]: branchStock,
          cogs: newCogs
        });
      }
    });

    await batch.commit();
  },

  deletePurchase: async (purchaseId) => {
    const purchase = get().purchases.find(p => p.id === purchaseId);
    if (!purchase) return;

    const batch = writeBatch(db);
    batch.delete(doc(db, 'purchases', purchaseId));

    const products = get().products;
    
    purchase.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const currentTotalStock = Object.values(product.stocks || {}).reduce((a, b) => a + b, 0);
        const currentTotalValue = currentTotalStock * (product.cogs || 0);
        const removedValue = item.quantity * item.cost;
        const newTotalStock = currentTotalStock - item.quantity;
        
        let newCogs = 0;
        if (newTotalStock > 0) {
          newCogs = (currentTotalValue - removedValue) / newTotalStock;
          newCogs = Math.max(0, newCogs); 
        }

        const currentBranchStock = product.stocks[purchase.branchId] || 0;
        const newBranchStock = Math.max(0, currentBranchStock - item.quantity);

        const productRef = doc(db, 'products', item.productId);
        batch.update(productRef, {
          [`stocks.${purchase.branchId}`]: newBranchStock,
          cogs: newCogs
        });
      }
    });

    await batch.commit();
  },

  // Sales
  addSale: async (sale) => {
    const batch = writeBatch(db);
    const saleId = uuidv4();
    const saleRef = doc(db, 'sales', saleId);
    
    batch.set(saleRef, { ...sale, id: saleId, date: new Date().toISOString() });

    const products = get().products;
    
    sale.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const currentBranchStock = product.stocks[sale.branchId] || 0;
        const newBranchStock = Math.max(0, currentBranchStock - item.quantity);
        
        const productRef = doc(db, 'products', item.productId);
        batch.update(productRef, {
          [`stocks.${sale.branchId}`]: newBranchStock
        });
      }
    });

    await batch.commit();
  },

  returnSaleItem: async (saleId, productId, returnQty) => {
    const sale = get().sales.find(s => s.id === saleId);
    if (!sale) return;

    const itemIndex = sale.items.findIndex(i => i.productId === productId);
    if (itemIndex < 0) return;
    const item = { ...sale.items[itemIndex] };

    const currentReturnedQty = item.returnedQty || 0;
    const availableToReturn = item.quantity - currentReturnedQty;
    if (returnQty <= 0 || returnQty > availableToReturn) return;

    item.returnedQty = currentReturnedQty + returnQty;
    const updatedItems = [...sale.items];
    updatedItems[itemIndex] = item;
    
    let isReturned = sale.isReturned;
    let returnedAt = sale.returnedAt;
    const allReturned = updatedItems.every(i => (i.returnedQty || 0) === i.quantity);
    if (allReturned) {
      isReturned = true;
      returnedAt = new Date().toISOString();
    }

    const returnedAmount = returnQty * (item.price - (item.discount || 0));
    const newTotalAmount = (sale.totalAmount || 0) - returnedAmount;

    const batch = writeBatch(db);

    const saleRef = doc(db, 'sales', saleId);
    batch.update(saleRef, {
      items: updatedItems,
      isReturned: isReturned || false,
      returnedAt: returnedAt || null,
      totalAmount: newTotalAmount
    });

    const product = get().products.find(p => p.id === productId);
    if (product) {
      const currentBranchStock = product.stocks[sale.branchId] || 0;
      const productRef = doc(db, 'products', productId);
      batch.update(productRef, {
        [`stocks.${sale.branchId}`]: currentBranchStock + returnQty
      });
    }

    if (sale.paymentMethod === 'cash') {
      const cashflowId = uuidv4();
      const cashflowRef = doc(db, 'cashflows', cashflowId);
      batch.set(cashflowRef, {
        id: cashflowId,
        date: new Date().toISOString(),
        branchId: sale.branchId,
        type: 'out',
        category: 'Retur Penjualan',
        amount: returnedAmount,
        description: `Retur Item (Qty: ${returnQty}) - Inv: ${sale.invoiceNo || sale.id.slice(0, 8).toUpperCase()}`,
      });
    }

    await batch.commit();
  },

  // Cashflow
  addCashflow: async (cashflow) => {
    await addDocToDb('cashflows', { ...cashflow, date: new Date().toISOString() });
  },
  
  // User Management
  addUser: async (user) => {
    await addDocToDb('users', user);
  },
  updateUser: async (id, updated) => {
    await updateDocInDb('users', id, updated);
  },
  deleteUser: async (id) => {
    await deleteDocFromDb('users', id);
  },
  
  // Branch Management
  addBranch: async (branch) => {
    await addDocToDb('branches', branch);
  },
  updateBranch: async (id, updated) => {
    await updateDocInDb('branches', id, updated);
    // Note: currentBranch will be automatically updated by the snapshot listener because 
    // when get().branches updates, we could hook a listener. However, Zustand's state 
    // won't automatically sync currentBranch if it's stored as a copy.
    // For now we'll just let the user re-login if branch is updated, or sync it manually.
  },
  
  // Store Settings
  updateStoreSettings: async (settings) => {
    await updateDocInDb('settings', 'store', settings);
  },

  // Shift Management
  startShift: async () => {
    const current = get().currentUser;
    const branch = get().currentBranch;
    if (!current || !branch) return;
    
    const branchShifts = get().shifts.filter(s => s.branchId === branch.id && s.status === 'closed');
    const lastShift = branchShifts.sort((a, b) => new Date(b.endTime) - new Date(a.endTime))[0];
    const startCash = lastShift ? lastShift.endCash : 0;

    await addDocToDb('shifts', {
      userId: current.id,
      branchId: branch.id,
      startTime: new Date().toISOString(),
      startCash: startCash,
      status: 'active'
    });
  },

  closeShift: async (endCash, expectedCash, difference) => {
    const active = get().activeShift;
    if (!active) return;
    
    const batch = writeBatch(db);
    const newCashflowId = uuidv4();
    
    const shiftRef = doc(db, 'shifts', active.id);
    batch.update(shiftRef, {
      endTime: new Date().toISOString(),
      endCash: Number(endCash),
      expectedCash: Number(expectedCash),
      difference: Number(difference),
      status: 'closed',
      cashflowId: Number(difference) !== 0 ? newCashflowId : null
    });
    
    if (Number(difference) !== 0) {
      const cfRef = doc(db, 'cashflows', newCashflowId);
      batch.set(cfRef, {
        id: newCashflowId,
        date: new Date().toISOString(),
        branchId: active.branchId,
        type: Number(difference) > 0 ? 'in' : 'out',
        category: 'Selisih Kasir',
        amount: Math.abs(Number(difference)),
        description: `Penyesuaian Tutup Kas (Otomatis)`,
      });
    }
    
    await batch.commit();
  },

  updateClosedShift: async (shiftId, newEndCash) => {
    const shift = get().shifts.find(s => s.id === shiftId);
    if (!shift) return;
    
    const newDifference = Number(newEndCash) - shift.expectedCash;
    const batch = writeBatch(db);
    
    const shiftRef = doc(db, 'shifts', shiftId);
    
    let newCashflowId = shift.cashflowId;
    
    if (shift.cashflowId) {
      batch.delete(doc(db, 'cashflows', shift.cashflowId));
      newCashflowId = null;
    }
    
    if (newDifference !== 0) {
      newCashflowId = uuidv4();
      const cfRef = doc(db, 'cashflows', newCashflowId);
      batch.set(cfRef, {
        id: newCashflowId,
        date: new Date().toISOString(),
        branchId: shift.branchId,
        type: newDifference > 0 ? 'in' : 'out',
        category: 'Selisih Kasir',
        amount: Math.abs(newDifference),
        description: `Penyesuaian Edit Tutup Kas (Otomatis)`,
      });
    }
    
    batch.update(shiftRef, {
      endCash: Number(newEndCash),
      difference: newDifference,
      cashflowId: newCashflowId
    });
    
    await batch.commit();
  },
    }),
    {
      name: 'pos-session-storage', // only persist session state
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentBranch: state.currentBranch,
        activeShift: state.activeShift
      })
    }
  )
);

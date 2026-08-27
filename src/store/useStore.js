import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { 
  collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, 
  writeBatch, getDocs, query, where 
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
      listeners: [], // to store unsub functions
      
      clearListeners: () => {
        get().listeners.forEach(unsub => unsub && unsub());
        set({ listeners: [] });
      },

      login: async (username, pin) => {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('username', '==', username.toLowerCase()), where('pin', '==', pin));
          const snap = await getDocs(q);
          
          if (!snap.empty) {
            const user = snap.docs[0].data();
            
            // Get branch directly
            let branch = null;
            if (user.branchId) {
              const branchesRef = collection(db, 'branches');
              const bq = query(branchesRef, where('id', '==', user.branchId));
              const bSnap = await getDocs(bq);
              if (!bSnap.empty) {
                branch = bSnap.docs[0].data();
              }
            }
            
            set({ currentUser: user, currentBranch: branch });
            await get().loadStoreData(user.storeId);
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },

      logout: () => {
        get().clearListeners();
        set({ 
          currentUser: null, currentBranch: null, activeShift: null,
          branches: [], users: [], products: [], purchases: [], 
          sales: [], cashflows: [], shifts: [], opnames: [],
          storeSettings: { name: 'POS System' }
        });
      },
      
      switchBranch: (branchId) => {
        const branch = get().branches.find(b => b.id === branchId);
        if (branch) {
           set({ currentBranch: branch });
           // Check for active shift in new branch
           const current = get().currentUser;
           const active = get().shifts.find(s => s.userId === current.id && s.branchId === branchId && s.status === 'active');
           set({ activeShift: active || null });
        }
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

      loadStoreData: async (storeId) => {
        if (!storeId) return;
        get().clearListeners();
        
        const collections = ['branches', 'users', 'products', 'purchases', 'sales', 'cashflows', 'shifts', 'opnames'];
        const newListeners = [];
        
        collections.forEach(colName => {
          const q = query(collection(db, colName), where('storeId', '==', storeId));
          const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data());
            set({ [colName]: data });
            
            // Re-evaluate active shift when shifts update
            if (colName === 'shifts') {
              const current = get().currentUser;
              const branch = get().currentBranch;
              if (current && branch) {
                const active = data.find(s => s.userId === current.id && s.branchId === branch.id && s.status === 'active');
                set({ activeShift: active || null });
              }
            }
          }, (err) => console.error(`Error listening to ${colName}:`, err));
          newListeners.push(unsub);
        });
        
        const settingsQ = query(collection(db, 'settings'), where('storeId', '==', storeId));
        const setUnsub = onSnapshot(settingsQ, (snapshot) => {
           if (!snapshot.empty) {
             set({ storeSettings: snapshot.docs[0].data() });
           }
        });
        newListeners.push(setUnsub);
        
        set({ listeners: newListeners });
      },

      // --- Initializer ---
      initFirebase: async () => {
        if (get().isInitialized) return;
        
        try {
          // Check for legacy data (migration)
          const usersSnap = await getDocs(collection(db, 'users'));
          if (!usersSnap.empty) {
            const firstUser = usersSnap.docs[0].data();
            if (!firstUser.storeId) {
              console.log("Legacy data without storeId detected. Running background migration to 'store-1'...");
              // We run a background migration
              const migrateCol = async (col) => {
                const snap = await getDocs(collection(db, col));
                const batch = writeBatch(db);
                let count = 0;
                snap.docs.forEach(docSnap => {
                  if (!docSnap.data().storeId) {
                    batch.update(docSnap.ref, { storeId: 'store-1' });
                    count++;
                  }
                });
                if (count > 0) await batch.commit();
              };
              const collections = ['branches', 'users', 'products', 'purchases', 'sales', 'cashflows', 'shifts', 'opnames'];
              for (const col of collections) {
                await migrateCol(col).catch(e => console.error("Migration error on", col, e));
              }
              // Settings migration
              const sSnap = await getDocs(collection(db, 'settings'));
              const sBatch = writeBatch(db);
              sSnap.docs.forEach(d => {
                if (!d.data().storeId) sBatch.update(d.ref, { storeId: 'store-1' });
              });
              await sBatch.commit().catch(e => {});
              console.log("Migration complete.");
            }
          }

          // Resume session if exists
          const current = get().currentUser;
          if (current && current.storeId) {
            await get().loadStoreData(current.storeId);
          }
          
          set({ isInitialized: true });
        } catch (error) {
          console.error("Firebase Init Error:", error);
          set({ isInitialized: true });
        }
      },

      // --- Actions ---
      
      // Helper to attach storeId
      getStoreId: () => {
        const storeId = get().currentUser?.storeId;
        if (!storeId) throw new Error("Store ID not found in current session.");
        return storeId;
      },

      // Product
      addProduct: async (product) => {
        await addDocToDb('products', { ...product, cogs: 0, stocks: {}, storeId: get().getStoreId() });
      },
      updateProduct: async (id, updated) => {
        await updateDocInDb('products', id, updated);
      },
      deleteProduct: async (id) => {
        await deleteDocFromDb('products', id);
      },

      // Stock Opname
      addOpname: async (productId, branchId, actualStock, note) => {
        const storeId = get().getStoreId();
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
        const opnameRef = doc(db, 'opnames', uuidv4());
        batch.set(opnameRef, {
          id: opnameRef.id,
          storeId,
          date: new Date().toISOString(),
          productId,
          branchId,
          systemStock,
          actualStock,
          difference,
          cogsAtOpname: product.cogs || 0,
          note
        });

        const productRef = doc(db, 'products', productId);
        batch.update(productRef, {
          [`stocks.${branchId}`]: actualStock,
          cogs: newCogs
        });

        await batch.commit();
      },

      // Transfer Stock
      transferStock: async (productId, fromBranchId, toBranchId, qty) => {
        const product = get().products.find(p => p.id === productId);
        if (!product) return;

        const currentFromStock = product.stocks[fromBranchId] || 0;
        const currentToStock = product.stocks[toBranchId] || 0;

        if (currentFromStock < qty) {
          throw new Error('Stok tidak mencukupi di cabang asal!');
        }

        const batch = writeBatch(db);
        const productRef = doc(db, 'products', productId);
        
        batch.update(productRef, {
          [`stocks.${fromBranchId}`]: currentFromStock - qty,
          [`stocks.${toBranchId}`]: currentToStock + qty
        });

        await batch.commit();
      },

      // Purchase
      addPurchase: async (purchase) => {
        const storeId = get().getStoreId();
        const batch = writeBatch(db);
        const purchaseId = uuidv4();
        const purchaseRef = doc(db, 'purchases', purchaseId);
        
        batch.set(purchaseRef, { ...purchase, id: purchaseId, storeId, date: new Date().toISOString() });

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
        const storeId = get().getStoreId();
        const batch = writeBatch(db);
        const saleId = uuidv4();
        const saleRef = doc(db, 'sales', saleId);
        
        batch.set(saleRef, { ...sale, id: saleId, storeId, date: new Date().toISOString() });

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
        const storeId = get().getStoreId();
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
            storeId,
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
        await addDocToDb('cashflows', { ...cashflow, storeId: get().getStoreId(), date: new Date().toISOString() });
      },
      
      // User Management
      addUser: async (user) => {
        await addDocToDb('users', { ...user, storeId: get().getStoreId() });
      },
      updateUser: async (id, updated) => {
        await updateDocInDb('users', id, updated);
      },
      deleteUser: async (id) => {
        await deleteDocFromDb('users', id);
      },
      
      // Branch Management
      addBranch: async (branch) => {
        await addDocToDb('branches', { ...branch, storeId: get().getStoreId() });
      },
      updateBranch: async (id, updated) => {
        await updateDocInDb('branches', id, updated);
      },
      
      // Store Settings
      updateStoreSettings: async (settings) => {
        const storeId = get().getStoreId();
        await updateDocInDb('settings', `store_${storeId}`, { ...settings, storeId });
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
          storeId: get().getStoreId(),
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
            storeId: get().getStoreId(),
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
            storeId: get().getStoreId(),
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
      name: 'pos-session-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentBranch: state.currentBranch,
        activeShift: state.activeShift
      })
    }
  )
);

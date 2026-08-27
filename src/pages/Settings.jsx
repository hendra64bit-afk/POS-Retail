import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Save, Store, MapPin, Edit, Plus, Image as ImageIcon } from 'lucide-react';
import Users from './Users';

const Settings = () => {
  const { storeSettings, updateStoreSettings, branches, updateBranch, addBranch } = useStore();
  
  const [storeName, setStoreName] = useState(storeSettings?.name || 'POS System');
  const [storeLogo, setStoreLogo] = useState(storeSettings?.logo || null);
  
  const [editingBranch, setEditingBranch] = useState(null);
  const [branchData, setBranchData] = useState({ name: '', address: '' });
  
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [newBranchData, setNewBranchData] = useState({ name: '', address: '' });

  const handleSaveStore = (e) => {
    e.preventDefault();
    updateStoreSettings({ name: storeName, logo: storeLogo });
    alert('Pengaturan toko berhasil disimpan!');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('Ukuran file terlalu besar! Maksimal 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditBranch = (branch) => {
    setEditingBranch(branch.id);
    setBranchData({ name: branch.name, address: branch.address });
  };

  const handleSaveBranch = (e) => {
    e.preventDefault();
    updateBranch(editingBranch, branchData);
    setEditingBranch(null);
  };

  const handleAddBranch = (e) => {
    e.preventDefault();
    addBranch(newBranchData);
    setIsAddingBranch(false);
    setNewBranchData({ name: '', address: '' });
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.25rem' }}>Pengaturan</h2>
        <p>Kelola profil toko utama dan data cabang Anda</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Pengaturan Toko Utama */}
        <div className="card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
            <Store size={20} color="var(--primary-color)" />
            <h3 style={{ margin: 0 }}>Profil Toko Utama</h3>
          </div>
          
          <form onSubmit={handleSaveStore}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Nama Toko (Global)</label>
              <input 
                required 
                className="form-input" 
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                placeholder="Contoh: Maju Jaya Sejahtera"
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Nama ini akan ditampilkan pada sistem dan header struk.
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Logo Toko (Opsional)</label>
              <div className="flex items-center gap-4">
                {storeLogo ? (
                  <img src={storeLogo} alt="Logo Toko" style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
                ) : (
                  <div style={{ width: '64px', height: '64px', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <ImageIcon size={24} />
                  </div>
                )}
                <div>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ fontSize: '0.875rem' }} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: 0 }}>
                    Format JPG, PNG. Maksimal 2MB. Logo akan muncul di sidebar.
                  </p>
                  {storeLogo && (
                    <button type="button" onClick={() => setStoreLogo(null)} style={{ fontSize: '0.75rem', color: 'var(--danger-color)', background: 'none', border: 'none', padding: 0, marginTop: '0.5rem', cursor: 'pointer' }}>
                      Hapus Logo
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Simpan Pengaturan
              </button>
            </div>
          </form>
        </div>

        {/* Pengaturan Cabang */}
        <div className="card">
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-center gap-2">
              <MapPin size={20} color="var(--primary-color)" />
              <h3 style={{ margin: 0 }}>Daftar Cabang</h3>
            </div>
            {!isAddingBranch && (
              <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => setIsAddingBranch(true)}>
                <Plus size={16} /> Tambah
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {isAddingBranch && (
              <div style={{ padding: '1rem', border: '2px dashed var(--primary-color)', borderRadius: 'var(--radius-md)', background: '#eff6ff' }}>
                <form onSubmit={handleAddBranch}>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: 'var(--primary-color)' }}>Tambah Cabang Baru</h4>
                  <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Nama Cabang</label>
                    <input 
                      required 
                      autoFocus
                      className="form-input" 
                      value={newBranchData.name}
                      onChange={e => setNewBranchData({...newBranchData, name: e.target.value})}
                      placeholder="Contoh: Cabang Jakarta Pusat"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Alamat</label>
                    <input 
                      required 
                      className="form-input" 
                      value={newBranchData.address}
                      onChange={e => setNewBranchData({...newBranchData, address: e.target.value})}
                      placeholder="Contoh: Jl. Sudirman No. 1"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => setIsAddingBranch(false)}>Batal</button>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Tambah</button>
                  </div>
                </form>
              </div>
            )}

            {branches.map(branch => (
              <div key={branch.id} style={{ 
                padding: '1rem', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)' 
              }}>
                {editingBranch === branch.id ? (
                  <form onSubmit={handleSaveBranch}>
                    <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Nama Cabang</label>
                      <input 
                        required 
                        className="form-input" 
                        value={branchData.name}
                        onChange={e => setBranchData({...branchData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Alamat</label>
                      <input 
                        required 
                        className="form-input" 
                        value={branchData.address}
                        onChange={e => setBranchData({...branchData, address: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => setEditingBranch(null)}>Batal</button>
                      <button type="submit" className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Simpan</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{branch.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{branch.address}</div>
                    </div>
                    <button 
                      className="btn btn-icon btn-secondary" 
                      onClick={() => startEditBranch(branch)}
                      title="Edit Cabang"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Users />
      </div>
    </div>
  );
};

export default Settings;

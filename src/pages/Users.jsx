import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Users = () => {
  const { users, branches, currentUser, addUser, updateUser, deleteUser } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: 'cashier',
    branchId: branches[0]?.id || '',
    pin: ''
  });

  // Protect this route, only admins can view it (just in case they navigate directly)
  if (currentUser?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi PIN
    if (formData.pin.length !== 6) {
      alert("PIN harus tepat 6 angka.");
      return;
    }

    // Validasi Username karakter
    if (!/^[a-zA-Z]+$/.test(formData.username)) {
      alert("Username hanya boleh mengandung huruf (tanpa spasi, angka, atau simbol).");
      return;
    }

    // Validasi Username unik
    const isUsernameExists = users.some(u => 
      u.username?.toLowerCase() === formData.username.toLowerCase() && u.id !== editingId
    );
    
    if (isUsernameExists) {
      alert("Username sudah digunakan oleh akun lain. Silakan gunakan username yang berbeda.");
      return;
    }

    if (editingId) {
      updateUser(editingId, formData);
    } else {
      addUser(formData);
    }
    closeForm();
  };

  const openForm = (user = null) => {
    if (user) {
      setFormData({ name: user.name, username: user.username || '', role: user.role, branchId: user.branchId, pin: user.pin });
      setEditingId(user.id);
    } else {
      setFormData({ name: '', username: '', role: 'cashier', branchId: branches[0]?.id || '', pin: '' });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="card">
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Manajemen Pengguna</h2>
          <p>Kelola akses staff kasir dan admin cabang</p>
        </div>
        <button className="btn btn-primary" onClick={() => openForm()}>
          <Plus size={18} /> Tambah Staff
        </button>
      </div>

      {isFormOpen && (
        <div className="card" style={{ marginBottom: '1.5rem', maxWidth: '600px' }}>
          <h3 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Staff' : 'Tambah Staff Baru'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input required className="form-input" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value.toLowerCase().replace(/[^a-z]/g, '')})} placeholder="Hanya huruf" />
              </div>
              <div className="form-group">
                <label className="form-label">PIN Akses (6 Digit)</label>
                <input required type="password" maxLength="6" minLength="6" className="form-input" value={formData.pin} onChange={e => setFormData({...formData, pin: e.target.value.replace(/\D/g, '')})} placeholder="6 digit angka" />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select className="form-select" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="cashier">Kasir</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Cabang</label>
                <select className="form-select" value={formData.branchId} onChange={e => setFormData({...formData, branchId: e.target.value})}>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={closeForm}>Batal</button>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Lengkap</th>
              <th>Username</th>
              <th>Role</th>
              <th>Cabang Utama</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: 500 }}>{user.name}</td>
                <td>{user.username || '-'}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-warning' : 'badge-success'}`}>
                    {user.role === 'admin' ? 'Administrator' : 'Kasir'}
                  </span>
                </td>
                <td>{branches.find(b => b.id === user.branchId)?.name || 'Tidak Diketahui'}</td>
                <td style={{ textAlign: 'right' }}>
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-icon btn-secondary" onClick={() => openForm(user)}><Edit size={16} /></button>
                    {user.id !== currentUser.id && ( // Prevent self-deletion
                      <button className="btn btn-icon btn-danger" onClick={() => deleteUser(user.id)}><Trash2 size={16} /></button>
                    )}
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

export default Users;

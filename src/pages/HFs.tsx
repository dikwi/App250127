import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, Loader2 } from 'lucide-react';
import { hfsApi } from '../lib/api';
import type { HFS } from '../types/database';

export default function HFs() {
  const [hfs, setHfs] = useState<HFS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<HFS, 'id' | 'created_at'>>({
    name: '',
    code: '',
    address: ''
  });

  useEffect(() => {
    loadHfs();
  }, []);

  const loadHfs = async () => {
    try {
      const data = await hfsApi.getAll();
      setHfs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const newHfs = await hfsApi.create(formData);
      setHfs([...hfs, newHfs]);
      setIsAdding(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add HFS');
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const updatedHfs = await hfsApi.update(id, formData);
      setHfs(hfs.map(item => item.id === id ? updatedHfs : item));
      setIsEditing(null);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update HFS');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this HFS?')) return;
    
    try {
      await hfsApi.delete(id);
      setHfs(hfs.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete HFS');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', code: '', address: '' });
  };

  const startEdit = (hfs: HFS) => {
    setIsEditing(hfs.id);
    setFormData({
      name: hfs.name,
      code: hfs.code,
      address: hfs.address
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">HFS Management</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add HFS
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isAdding && (
              <tr>
                <td className="px-6 py-4">New</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={handleAdd}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      resetForm();
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )}
            {hfs.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">
                  {isEditing === item.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {isEditing === item.id ? (
                    <input
                      type="text"
                      value={formData.code}
                      onChange={e => setFormData({ ...formData, code: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    item.code
                  )}
                </td>
                <td className="px-6 py-4">
                  {isEditing === item.id ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    item.address
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {isEditing === item.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          resetForm();
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

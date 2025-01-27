import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { profilesApi } from '../lib/api';
import type { Profile } from '../types/database';

const ROLES = ['admin', 'manager', 'user'];

export default function Profiles() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await profilesApi.getAll();
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Profile>) => {
    try {
      const updated = await profilesApi.update(id, updates);
      setProfiles(profiles.map(p => p.id === id ? updated : p));
      setEditingProfile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;
    
    try {
      await profilesApi.delete(id);
      setProfiles(profiles.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(profile => (
              <tr key={profile.id} className="border-t border-gray-300">
                <td className="px-4 py-2">{profile.username}</td>
                <td className="px-4 py-2">{profile.full_name || '-'}</td>
                <td className="px-4 py-2">{profile.role}</td>
                <td className="px-4 py-2">
                  {editingProfile?.id === profile.id ? (
                    <div className="flex gap-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={editingProfile.role}
                        onChange={(e) => setEditingProfile({
                          ...editingProfile,
                          role: e.target.value
                        })}
                      >
                        {ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleUpdate(profile.id, editingProfile)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProfile(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProfile(profile)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
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

import { supabase } from './supabase';
import type { Database, HFS, Staff, Item, Profile } from '../types/database';

export const hfsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('hfs')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as HFS[];
  },

  getById: async (id: number) => {
    const { data, error } = await supabase
      .from('hfs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as HFS;
  },

  create: async (hfs: Database['public']['Tables']['hfs']['Insert']) => {
    const { data, error } = await supabase
      .from('hfs')
      .insert(hfs)
      .select()
      .single();
    
    if (error) throw error;
    return data as HFS;
  },

  update: async (id: number, updates: Database['public']['Tables']['hfs']['Update']) => {
    const { data, error } = await supabase
      .from('hfs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as HFS;
  },

  delete: async (id: number) => {
    const { error } = await supabase
      .from('hfs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const staffApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('staff')
      .select('*, hf_details:hfs(*)')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Staff[];
  },

  getById: async (id: number) => {
    const { data, error } = await supabase
      .from('staff')
      .select('*, hf_details:hfs(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Staff;
  },

  create: async (staff: Database['public']['Tables']['staff']['Insert']) => {
    const { data, error } = await supabase
      .from('staff')
      .insert(staff)
      .select('*, hf_details:hfs(*)')
      .single();
    
    if (error) throw error;
    return data as Staff;
  },

  update: async (id: number, updates: Database['public']['Tables']['staff']['Update']) => {
    const { data, error } = await supabase
      .from('staff')
      .update(updates)
      .eq('id', id)
      .select('*, hf_details:hfs(*)')
      .single();
    
    if (error) throw error;
    return data as Staff;
  },

  delete: async (id: number) => {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const itemsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*, hf_details:hfs(*)')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Item[];
  },

  getById: async (id: number) => {
    const { data, error } = await supabase
      .from('items')
      .select('*, hf_details:hfs(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Item;
  },

  create: async (item: Database['public']['Tables']['items']['Insert']) => {
    const { data, error } = await supabase
      .from('items')
      .insert(item)
      .select('*, hf_details:hfs(*)')
      .single();
    
    if (error) throw error;
    return data as Item;
  },

  update: async (id: number, updates: Database['public']['Tables']['items']['Update']) => {
    const { data, error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', id)
      .select('*, hf_details:hfs(*)')
      .single();
    
    if (error) throw error;
    return data as Item;
  },

  delete: async (id: number) => {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const profilesApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('username', { ascending: true });
    
    if (error) throw error;
    return data as Profile[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  update: async (id: string, updates: Database['public']['Tables']['profiles']['Update']) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

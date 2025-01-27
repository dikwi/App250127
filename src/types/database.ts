export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  role: string;
  updated_at?: string;
}

export interface HFS {
  id: number;
  name: string;
  code: string;
  address: string;
  created_at?: string;
}

export type Department = 'OPD' | 'IPD' | 'EMR' | 'LABS' | 'ECHO' | 'XRAY';
export type ItemCategory = 'MEDICINE' | 'SUPPLY' | 'EQUIPMENT' | 'OTHER';

export interface Staff {
  id: number;
  name: string;
  role: string;
  phone: string;
  department: Department;
  active: boolean;
  hf: number;
  hf_details?: HFS;
  created_at?: string;
}

export interface Item {
  id: number;
  name: string;
  generic: string;
  phone?: string;
  type: ItemCategory;
  active: boolean;
  hf: number;
  hf_details?: HFS;
  created_at?: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'updated_at'>>;
      };
      hfs: {
        Row: HFS;
        Insert: Omit<HFS, 'id' | 'created_at'>;
        Update: Partial<Omit<HFS, 'id' | 'created_at'>>;
      };
      staff: {
        Row: Staff;
        Insert: Omit<Staff, 'id' | 'created_at'>;
        Update: Partial<Omit<Staff, 'id' | 'created_at'>>;
      };
      items: {
        Row: Item;
        Insert: Omit<Item, 'id' | 'created_at'>;
        Update: Partial<Omit<Item, 'id' | 'created_at'>>;
      };
    };
  };
}

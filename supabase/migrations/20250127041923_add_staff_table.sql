-- Create enum for department
CREATE TYPE department AS ENUM ('OPD', 'IPD', 'EMR', 'LABS', 'ECHO', 'XRAY');

-- Create staff table
CREATE TABLE IF NOT EXISTS public.staff (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  department department NOT NULL,
  active BOOLEAN DEFAULT true,
  hf BIGINT REFERENCES public.hfs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Staff members are viewable by authenticated users"
  ON public.staff
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff members can be created by authenticated users"
  ON public.staff
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff members can be updated by authenticated users"
  ON public.staff
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Staff members can be deleted by authenticated users"
  ON public.staff
  FOR DELETE
  TO authenticated
  USING (true);

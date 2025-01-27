-- Create HFS table
CREATE TABLE IF NOT EXISTS public.hfs (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL,
  code varchar NOT NULL,
  address varchar NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hfs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read HFS"
  ON public.hfs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert HFS"
  ON public.hfs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update HFS"
  ON public.hfs
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete HFS"
  ON public.hfs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hfs_code ON public.hfs(code);
CREATE INDEX IF NOT EXISTS idx_hfs_name ON public.hfs(name);

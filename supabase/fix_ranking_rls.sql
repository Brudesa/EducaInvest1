-- Enable RLS on the table (good practice to ensure policies are active)
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

-- Drop existing restrictive policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.perfis;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.perfis;
DROP POLICY IF EXISTS "Users can update own profile" ON public.perfis;

-- Create a policy that allows EVERYONE (anon and authenticated) to SELECT (read) all rows
-- This is necessary for the Global Ranking to work
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.perfis FOR SELECT 
USING (true);

-- Allow users to INSERT their own profile (usually handled by triggers, but good to have)
CREATE POLICY "Users can insert their own profile" 
ON public.perfis FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to UPDATE only their own profile
CREATE POLICY "Users can update own profile" 
ON public.perfis FOR UPDATE 
USING (auth.uid() = id);

-- Verify the change (Optional - just for the user to see output)
SELECT * FROM pg_policies WHERE tablename = 'perfis';

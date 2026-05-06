-- Supabase Setup SQL
-- Run this in your Supabase SQL Editor to set up the counter system

-- 1. Ensure the counter table exists (it should already exist based on your schema)
-- If not, create it:
-- CREATE TABLE IF NOT EXISTS public.counter (
--   id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   created_at timestamp with time zone NOT NULL DEFAULT now(),
--   value bigint DEFAULT 0
-- );

-- 2. Insert initial counter row if it doesn't exist
INSERT INTO public.counter (value)
SELECT 0
WHERE NOT EXISTS (SELECT 1 FROM public.counter WHERE id = 1);

-- 3. Create a function for atomic counter increment
-- This ensures thread-safe increments even with multiple concurrent users
CREATE OR REPLACE FUNCTION increment_counter(counter_id bigint)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_value bigint;
BEGIN
  UPDATE public.counter
  SET value = value + 1
  WHERE id = counter_id
  RETURNING value INTO new_value;
  
  RETURN new_value;
END;
$$;

-- 4. Enable Row Level Security (RLS) on the counter table
ALTER TABLE public.counter ENABLE ROW LEVEL SECURITY;

-- 5. Create policies to allow public read access
CREATE POLICY "Allow public read access"
ON public.counter
FOR SELECT
TO public
USING (true);

-- 6. Create policy to allow public updates (for the increment function)
CREATE POLICY "Allow public updates"
ON public.counter
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 7. Enable Realtime for the counter table
-- This allows real-time subscriptions to counter changes
-- Note: You may also need to enable this in the Supabase Dashboard:
-- Database > Replication > Enable for 'counter' table

ALTER PUBLICATION supabase_realtime ADD TABLE public.counter;

-- Verification queries (optional - run these to check setup)
-- SELECT * FROM public.counter;
-- SELECT increment_counter(1);
-- SELECT * FROM public.counter;

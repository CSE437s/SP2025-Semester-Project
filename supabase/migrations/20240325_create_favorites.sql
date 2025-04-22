-- Create the favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    resort_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, resort_name)
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own favorites"
    ON public.favorites
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
    ON public.favorites
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
    ON public.favorites
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX favorites_user_id_idx ON public.favorites(user_id);
CREATE INDEX favorites_resort_name_idx ON public.favorites(resort_name);

-- Grant permissions
GRANT ALL ON public.favorites TO authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated; 
-- Create VIP access table
CREATE TABLE public.vip_access (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    is_vip BOOLEAN NOT NULL DEFAULT false,
    granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE public.vip_access ENABLE ROW LEVEL SECURITY;

-- Users can read their own VIP status
CREATE POLICY "Users can view their own VIP status"
ON public.vip_access
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only service role can manage VIP access (admins via edge functions)
CREATE POLICY "Service role can manage VIP access"
ON public.vip_access
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to check VIP status (security definer to bypass RLS)
CREATE OR REPLACE FUNCTION public.is_vip(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.vip_access
    WHERE user_id = _user_id
      AND is_vip = true
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_vip_access_updated_at
BEFORE UPDATE ON public.vip_access
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.video_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  pexels_video_id bigint NOT NULL,
  downloaded_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.video_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own downloads"
  ON public.video_downloads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own downloads"
  ON public.video_downloads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

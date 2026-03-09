import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Search, Play, Download, Loader2, Film, Clock, User, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { usePlan } from "@/contexts/PlanContext";

interface PexelsVideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
}

interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  url: string;
  image: string;
  user: { name: string; url: string };
  video_files: PexelsVideoFile[];
}

interface SearchResult {
  total_results: number;
  page: number;
  per_page: number;
  videos: PexelsVideo[];
}

const MyVideos: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<PexelsVideo | null>(null);
  const [downloadCount, setDownloadCount] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();
  const { planFeatures } = usePlan();

  const videoLimit = planFeatures?.videoCount ?? 0;
  const remainingDownloads = Math.max(0, videoLimit - downloadCount);
  const canDownload = remainingDownloads > 0;

  // Fetch current download count
  const fetchDownloadCount = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { count, error } = await supabase
      .from("video_downloads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    if (!error && count !== null) setDownloadCount(count);
  }, []);

  useEffect(() => {
    fetchDownloadCount();
  }, [fetchDownloadCount]);

  const searchVideos = useCallback(async (page = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("video-search", {
        body: { query: query.trim(), page, per_page: 15 },
      });
      if (error) throw error;
      setResults(data as SearchResult);
    } catch (err: any) {
      toast({ title: "Search failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [query, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchVideos();
  };

  const getBestFile = (files: PexelsVideoFile[]) =>
    files.find((f) => f.quality === "hd") || files.find((f) => f.quality === "sd") || files[0];

  const handleDownload = async (video: PexelsVideo) => {
    if (!canDownload) {
      toast({ title: "Download limit reached", description: `Your plan allows ${videoLimit} video downloads.`, variant: "destructive" });
      return;
    }

    const file = getBestFile(video.video_files);
    if (!file) return;

    setDownloading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Not signed in", description: "Please sign in to download videos.", variant: "destructive" });
        return;
      }

      // Record the download
      const { error } = await supabase.from("video_downloads").insert({
        user_id: user.id,
        pexels_video_id: video.id,
      });

      if (error) throw error;

      window.open(file.link, "_blank");
      setDownloadCount((prev) => prev + 1);
      toast({ title: "Download started", description: `${remainingDownloads - 1} downloads remaining.` });
    } catch (err: any) {
      toast({ title: "Download failed", description: err.message, variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  };

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 px-1 sm:px-0">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">Video Library</h1>
          <p className="text-muted-foreground mt-1">
            Search free stock videos powered by Pexels — preview, download, and use in your projects.
          </p>
        </div>
        <Badge variant={canDownload ? "default" : "destructive"} className="text-sm whitespace-nowrap mt-1">
          {canDownload ? (
            <><Download className="h-3.5 w-3.5 mr-1" />{remainingDownloads}/{videoLimit} left</>
          ) : (
            <><Lock className="h-3.5 w-3.5 mr-1" />Limit reached</>
          )}
        </Badge>
      </div>

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for videos… e.g. 'aerial city', 'nature sunset'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
        </div>
        <Button onClick={() => searchVideos()} disabled={loading || !query.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {results.total_results.toLocaleString()} results found
            </p>
            {results.total_results > results.per_page && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={results.page <= 1 || loading} onClick={() => searchVideos(results.page - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={results.page * results.per_page >= results.total_results || loading} onClick={() => searchVideos(results.page + 1)}>Next</Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.videos.map((video) => (
              <Card key={video.id} className="group overflow-hidden cursor-pointer border-border hover:border-primary/40 transition-colors" onClick={() => setPreviewVideo(video)}>
                <div className="relative aspect-video bg-muted">
                  <img src={video.image} alt={`Video by ${video.user.name}`} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Play className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/60 text-white border-0 text-xs">
                    <Clock className="h-3 w-3 mr-1" />{formatDuration(video.duration)}
                  </Badge>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                    <User className="h-3 w-3" />{video.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{video.width}×{video.height}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!results && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Film className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium text-foreground">Search stock videos</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Type a keyword above to browse thousands of free HD videos from Pexels.
          </p>
        </div>
      )}

      {/* Preview dialog */}
      <Dialog open={!!previewVideo} onOpenChange={() => setPreviewVideo(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {previewVideo && (
            <>
              <DialogHeader className="p-4 pb-0">
                <DialogTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-primary" />Video by {previewVideo.user.name}
                </DialogTitle>
              </DialogHeader>
              <div className="aspect-video bg-black">
                <video src={getBestFile(previewVideo.video_files)?.link} controls autoPlay className="w-full h-full" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span>{previewVideo.width}×{previewVideo.height}</span>
                  <span>{formatDuration(previewVideo.duration)}</span>
                </div>
                <Button onClick={() => handleDownload(previewVideo)} disabled={!canDownload || downloading}>
                  {downloading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : !canDownload ? (
                    <Lock className="h-4 w-4 mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {!canDownload ? "Limit Reached" : "Download HD"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyVideos;

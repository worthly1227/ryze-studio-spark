import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Wand2, Sparkles, Download, Check, Lock, Image, ArrowLeft, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const MAX_CREDITS = 5;

// Mock image generation - returns placeholder images
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=600&fit=crop",
];

interface GeneratedImage {
  id: number;
  url: string;
  prompt: string;
}

const EntryLevelSession: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionActive = location.state?.sessionActive === true;

  const [prompt, setPrompt] = useState("");
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [finalDownloadId, setFinalDownloadId] = useState<number | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const creditsRemaining = MAX_CREDITS - creditsUsed;
  const canGenerate = creditsRemaining > 0 && !sessionCompleted;
  const hasSelection = selectedImageId !== null;
  const isFinalized = finalDownloadId !== null;

  // Redirect if no active session
  if (!sessionActive) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto" />
            <h2 className="font-heading font-bold text-xl">No Active Session</h2>
            <p className="text-muted-foreground text-sm">
              Purchase an Entry Level Pass to start generating AI images.
            </p>
            <Button onClick={() => navigate("/")} className="font-heading">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || !canGenerate) return;

    setGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now(),
        url: MOCK_IMAGES[creditsUsed % MOCK_IMAGES.length],
        prompt: prompt.trim(),
      };
      setGeneratedImages(prev => [...prev, newImage]);
      setCreditsUsed(prev => prev + 1);
      setPrompt("");
      setGenerating(false);
      toast({
        title: `Image generated! (${creditsUsed + 1}/${MAX_CREDITS} used)`,
        description: creditsUsed + 1 >= MAX_CREDITS
          ? "All credits used. Select your final image to download."
          : `${MAX_CREDITS - creditsUsed - 1} generation${MAX_CREDITS - creditsUsed - 1 !== 1 ? "s" : ""} remaining.`,
      });
    }, 2000);
  }, [prompt, canGenerate, creditsUsed]);

  const handleSelectFinal = () => {
    if (selectedImageId === null) return;
    setFinalDownloadId(selectedImageId);
    setSessionCompleted(true);
    toast({
      title: "✅ Final image selected!",
      description: "Your download is now unlocked. Session complete.",
    });
  };

  const handleDownload = () => {
    const finalImage = generatedImages.find(img => img.id === finalDownloadId);
    if (!finalImage) return;
    // Simulate download
    const link = document.createElement("a");
    link.href = finalImage.url;
    link.download = `ryze-ai-image-${finalImage.id}.jpg`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download started!", description: "Your final AI image is downloading." });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-heading">Exit</span>
          </button>
          <div className="flex items-center gap-3">
            <Badge variant={sessionCompleted ? "destructive" : "secondary"} className="font-heading text-xs">
              {sessionCompleted
                ? "Session Complete"
                : `${creditsRemaining} credit${creditsRemaining !== 1 ? "s" : ""} remaining`}
            </Badge>
            <div className="flex gap-1">
              {Array.from({ length: MAX_CREDITS }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i < creditsUsed ? "bg-primary" : "bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Prompt Section */}
        <Card className={`border-primary/20 transition-opacity ${sessionCompleted ? "opacity-50 pointer-events-none" : ""}`}>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-lg">Describe your image</h2>
              </div>
              <Textarea
                placeholder="e.g. Place my product on a marble table in a luxury bathroom with soft lighting..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none text-base border-primary/20 focus:border-primary/50"
                disabled={!canGenerate}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {["Luxury Studio", "Outdoor", "Minimalist", "Lifestyle"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20 transition-colors text-xs"
                      onClick={() => canGenerate && setPrompt(prev => prev ? `${prev}, ${tag.toLowerCase()} setting` : `${tag} setting`)}
                    >
                      + {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || !canGenerate || generating}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                >
                  {generating ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Generating…
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" /> Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        {generatedImages.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-xl">
                Your Generations ({generatedImages.length}/{MAX_CREDITS})
              </h2>
              {!isFinalized && generatedImages.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {hasSelection ? "Click 'Confirm Selection' to finalize" : "Click an image to select it as your final"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {generatedImages.map((img) => {
                  const isSelected = selectedImageId === img.id;
                  const isFinal = finalDownloadId === img.id;

                  return (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group"
                    >
                      <button
                        onClick={() => !isFinalized && setSelectedImageId(img.id)}
                        disabled={isFinalized}
                        className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                          isFinal
                            ? "border-primary ring-2 ring-primary/30"
                            : isSelected
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/40"
                        } ${isFinalized && !isFinal ? "opacity-40" : ""}`}
                      >
                        <img
                          src={img.url}
                          alt={img.prompt}
                          className="w-full h-full object-cover"
                        />
                        {/* Selection overlay */}
                        {(isSelected || isFinal) && (
                          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              {isFinal ? (
                                <Download className="w-4 h-4 text-primary-foreground" />
                              ) : (
                                <Check className="w-4 h-4 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                        )}
                      </button>
                      {/* Prompt label */}
                      <p className="text-[10px] text-muted-foreground mt-1.5 line-clamp-2 leading-tight">
                        {img.prompt}
                      </p>
                      {isFinal && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                          Final
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Empty state */}
        {generatedImages.length === 0 && !generating && (
          <div className="text-center py-16">
            <Image className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg text-muted-foreground">No images yet</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Describe your product scene above and hit Generate to start.
            </p>
          </div>
        )}

        {/* Action bar */}
        {generatedImages.length > 0 && (
          <Card className="border-primary/20">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {isFinalized ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm">Session complete</p>
                        <p className="text-xs text-muted-foreground">Your final image is ready for download.</p>
                      </div>
                    </div>
                    <Button onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                      <Download className="w-4 h-4 mr-2" /> Download Final Image
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm">Download locked</p>
                        <p className="text-xs text-muted-foreground">
                          {hasSelection
                            ? "Confirm your selection to unlock the download."
                            : "Select an image from the gallery to unlock."}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleSelectFinal}
                      disabled={!hasSelection}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                    >
                      <Check className="w-4 h-4 mr-2" /> Confirm Selection
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EntryLevelSession;

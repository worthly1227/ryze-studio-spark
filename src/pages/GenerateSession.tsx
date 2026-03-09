import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Wand2, Sparkles, Download, Check, Lock, Image, ArrowLeft, Upload,
  CheckCircle2, ArrowRight, PartyPopper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { usePlan } from "@/contexts/PlanContext";

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

const GenerateSession: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan, planFeatures } = usePlan();

  const [prompt, setPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [finalDownloadId, setFinalDownloadId] = useState<number | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const maxCredits = planFeatures?.generationCredits ?? 5;
  const creditsRemaining = maxCredits - creditsUsed;
  const canGenerate = creditsRemaining > 0 && !sessionCompleted;
  const hasSelection = selectedImageId !== null;
  const isFinalized = finalDownloadId !== null;

  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || !canGenerate || !uploadedFile) return;

    setGenerating(true);
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now(),
        url: MOCK_IMAGES[creditsUsed % MOCK_IMAGES.length],
        prompt: prompt.trim(),
      };
      setGeneratedImages((prev) => [...prev, newImage]);
      setCreditsUsed((prev) => prev + 1);
      setPrompt("");
      setGenerating(false);
      toast({
        title: `Image generated! (${creditsUsed + 1}/${maxCredits} credits used)`,
        description:
          creditsUsed + 1 >= maxCredits
            ? "All credits used. Select your final image to download."
            : `${maxCredits - creditsUsed - 1} generation${maxCredits - creditsUsed - 1 !== 1 ? "s" : ""} remaining.`,
      });
    }, 2000);
  }, [prompt, canGenerate, creditsUsed, maxCredits, uploadedFile]);

  if (!currentPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto" />
            <h2 className="font-heading font-bold text-xl">No Active Session</h2>
            <p className="text-muted-foreground text-sm">
              Purchase a plan to start generating AI images.
            </p>
            <Button onClick={() => navigate("/plans")} className="font-heading">
              <ArrowLeft className="w-4 h-4 mr-2" /> View Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file.name);
  };

  const handleFileSelect = () => {
    setUploadedFile(`product-image-${Date.now()}.jpg`);
  };

  const handleSelectFinal = () => {
    if (selectedImageId === null) return;
    setFinalDownloadId(selectedImageId);
    setSessionCompleted(true);
    toast({
      title: "✅ Final image selected!",
      description: "Your download is now unlocked.",
    });
  };

  const handleDownload = () => {
    const finalImage = generatedImages.find((img) => img.id === finalDownloadId);
    if (!finalImage) return;
    const link = document.createElement("a");
    link.href = finalImage.url;
    link.download = `ryze-ai-image-${finalImage.id}.jpg`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download started!" });
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/plans")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-heading hidden sm:inline">Exit</span>
            </button>
            <Badge variant="outline" className="font-heading text-xs hidden sm:flex">
              {currentPlan}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={sessionCompleted ? "destructive" : "secondary"}
              className="font-heading text-xs"
            >
              {sessionCompleted
                ? "Session Complete"
                : `${creditsRemaining}/${maxCredits} credits left`}
            </Badge>
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(maxCredits, 20) }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < creditsUsed ? "bg-primary" : "bg-muted-foreground/20"
                  }`}
                />
              ))}
              {maxCredits > 20 && (
                <span className="text-[10px] text-muted-foreground ml-1">+{maxCredits - 20}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Image Upload */}
        <Card className={`border-primary/20 transition-opacity ${sessionCompleted ? "opacity-50 pointer-events-none" : ""}`}>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Upload className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-semibold text-base sm:text-lg">
                Upload Your Product Image
              </h2>
            </div>
            {uploadedFile ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-heading truncate flex-1">{uploadedFile}</span>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Change
                </button>
              </div>
            ) : (
              <motion.div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={handleFileSelect}
                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                  dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                <Upload className={`w-8 h-8 mx-auto mb-2 ${dragOver ? "text-primary" : "text-muted-foreground"}`} />
                <p className="font-heading font-semibold text-sm">Drag & drop your product image</p>
                <p className="text-muted-foreground text-xs mt-1">or click to browse · JPG, PNG, WEBP</p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Prompt Section */}
        <Card className={`border-primary/20 transition-opacity ${sessionCompleted ? "opacity-50 pointer-events-none" : ""}`}>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-semibold text-base sm:text-lg">Describe your image</h2>
            </div>
            <Textarea
              placeholder="e.g. Place my product on a marble table in a luxury bathroom with soft lighting..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[80px] sm:min-h-[100px] resize-none text-sm sm:text-base border-primary/20 focus:border-primary/50"
              disabled={!canGenerate}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
              <div className="flex gap-2 flex-wrap">
                {["Luxury Studio", "Outdoor", "Minimalist", "Lifestyle"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20 transition-colors text-xs"
                    onClick={() =>
                      canGenerate &&
                      setPrompt((prev) =>
                        prev ? `${prev}, ${tag.toLowerCase()} setting` : `${tag} setting`
                      )
                    }
                  >
                    + {tag}
                  </Badge>
                ))}
              </div>
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || !canGenerate || generating || !uploadedFile}
                className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto"
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
            {!uploadedFile && (
              <p className="text-xs text-destructive mt-2">⬆ Upload a product image first to generate</p>
            )}
          </CardContent>
        </Card>

        {/* Gallery */}
        {generatedImages.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h2 className="font-heading font-bold text-lg sm:text-xl">
                Your Generations ({generatedImages.length})
              </h2>
              {!isFinalized && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {hasSelection ? "Click 'Confirm Selection' to finalize" : "Click an image to select"}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
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
                        <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
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
          <div className="text-center py-12 sm:py-16">
            <Image className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-base sm:text-lg text-muted-foreground">No images yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground/70 mt-1">
              Upload your product image, describe what you want, and hit Generate.
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
                        <PartyPopper className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm">
                          {creditsUsed} credit{creditsUsed !== 1 ? "s" : ""} used
                        </p>
                        <p className="text-xs text-muted-foreground">Your image is ready for download!</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
                        <Download className="w-4 h-4 mr-2" /> Download
                      </Button>
                      <Button onClick={handleGoToDashboard} variant="outline" className="font-heading">
                        Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
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
                          {hasSelection ? "Confirm your selection to unlock." : "Select an image from the gallery."}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleSelectFinal}
                      disabled={!hasSelection}
                      className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto"
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

export default GenerateSession;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "@/contexts/PlanContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload, Check, ArrowRight, ArrowLeft, Image, Film, LayoutTemplate,
  MessageSquare, Calendar, Sparkles, PartyPopper, CheckCircle2, Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const VIDEO_STYLES = [
  { id: "product-showcase", label: "Product Showcase", desc: "Clean product reveals with smooth transitions" },
  { id: "lifestyle", label: "Lifestyle Montage", desc: "Brand-aligned lifestyle content" },
  { id: "ugc-style", label: "UGC Style", desc: "Authentic user-generated feel" },
  { id: "tutorial", label: "How-To / Tutorial", desc: "Step-by-step instructional clips" },
];

const MOCK_TEMPLATES = Array.from({ length: 12 }, (_, i) => ({
  id: `t${i + 1}`,
  name: `Template ${i + 1}`,
  category: ["Social Post", "Story", "Ad Banner", "Product Card"][i % 4],
}));

const PlanSetup: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan, planFeatures, updateSetupProgress } = usePlan();
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [selectedVideoStyles, setSelectedVideoStyles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!currentPlan || !planFeatures) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="font-heading font-bold text-xl mb-2">No Plan Selected</h2>
            <p className="text-muted-foreground text-sm mb-4">Please choose a plan first.</p>
            <Button onClick={() => navigate("/plans")} className="bg-primary text-primary-foreground">
              View Plans <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Build steps dynamically based on plan
  const steps: { key: string; label: string; icon: React.ElementType }[] = [
    { key: "welcome", label: "Welcome", icon: Sparkles },
    { key: "upload", label: "Image Upload", icon: Upload },
  ];
  if (planFeatures.hasTemplates) steps.push({ key: "templates", label: "Templates", icon: LayoutTemplate });
  if (planFeatures.hasShortFormVideo) steps.push({ key: "videos", label: "Video Options", icon: Film });
  if (planFeatures.hasManagedPosting || planFeatures.hasStrategySessions || planFeatures.hasUGC) {
    steps.push({ key: "advanced", label: "Advanced Services", icon: MessageSquare });
  }
  steps.push({ key: "complete", label: "Complete", icon: PartyPopper });

  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;
  const currentStepKey = steps[step]?.key;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileSelect = () => {
    // Mock file selection
    const mockNames = [`product-image-${uploadedFiles.length + 1}.jpg`, `brand-photo-${uploadedFiles.length + 2}.png`];
    setUploadedFiles((prev) => [...prev, ...mockNames]);
  };

  const handleNext = () => {
    if (currentStepKey === "upload") updateSetupProgress("imageUpload", true);
    if (currentStepKey === "templates") updateSetupProgress("templateSelection", true);
    if (currentStepKey === "videos") updateSetupProgress("videoOptions", true);
    if (currentStepKey === "advanced") updateSetupProgress("advancedServices", true);

    if (step < totalSteps - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsLoading(false);
      }, 400);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  const toggleTemplate = (id: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : prev.length < (planFeatures.templateCount || 10) ? [...prev, id] : prev
    );
  };

  const toggleVideoStyle = (id: string) => {
    setSelectedVideoStyles((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const servicesList = [
    planFeatures.hasManagedPosting && { icon: MessageSquare, label: "Managed Social Posting", desc: "Chat with our team to manage your social content" },
    planFeatures.hasStrategySessions && { icon: Calendar, label: "Strategy Sessions", desc: `${planFeatures.strategyFrequency} strategy calls with our creative team` },
    planFeatures.hasUGC && { icon: Film, label: `UGC Videos (${planFeatures.ugcCount})`, desc: "Select and manage your UGC video content" },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-heading font-bold text-sm hidden sm:inline">Ryze Studios</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-heading">{currentPlan}</Badge>
            <span className="text-xs text-muted-foreground">Step {step + 1} of {totalSteps}</span>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepKey}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* WELCOME */}
            {currentStepKey === "welcome" && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
                >
                  <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>
                <div>
                  <h1 className="font-heading font-black text-2xl sm:text-4xl mb-2">Welcome to {currentPlan}!</h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Let's get you set up. We'll walk through a few quick steps to personalize your experience.
                  </p>
                </div>

                <Card className="text-left max-w-md mx-auto">
                  <CardContent className="p-5 space-y-3">
                    <p className="font-heading font-semibold text-sm mb-3">Your plan includes:</p>
                    <div className="space-y-2">
                      <ServiceItem icon={Image} label="Image Uploads" included />
                      <ServiceItem icon={LayoutTemplate} label={`${planFeatures.templateCount} Templates`} included={planFeatures.hasTemplates} />
                      <ServiceItem icon={Film} label={`${planFeatures.videoCount} Short-Form Videos`} included={planFeatures.hasShortFormVideo} />
                      <ServiceItem icon={Film} label={`${planFeatures.ugcCount} UGC Videos`} included={planFeatures.hasUGC} />
                      <ServiceItem icon={MessageSquare} label="Managed Social Posting" included={planFeatures.hasManagedPosting} />
                      <ServiceItem icon={Calendar} label="Strategy Sessions" included={planFeatures.hasStrategySessions} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* IMAGE UPLOAD */}
            {currentStepKey === "upload" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-heading font-bold text-xl sm:text-2xl mb-1">Upload Your Images</h2>
                  <p className="text-muted-foreground text-sm">Upload product photos, brand assets, or any images you'd like us to work with.</p>
                </div>

                <motion.div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={handleFileSelect}
                  className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
                    dragOver ? "border-primary bg-primary/5 cyan-glow-sm" : "border-border hover:border-primary/30"
                  }`}
                >
                  <Upload className={`w-10 h-10 mx-auto mb-3 ${dragOver ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-heading font-semibold">Drag & drop your images here</p>
                  <p className="text-muted-foreground text-sm mt-1">or click to browse · JPG, PNG, WEBP up to 50MB</p>
                </motion.div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-heading font-semibold text-sm">{uploadedFiles.length} file(s) uploaded</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE SELECTION */}
            {currentStepKey === "templates" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-heading font-bold text-xl sm:text-2xl mb-1">Choose Your Templates</h2>
                  <p className="text-muted-foreground text-sm">
                    Select up to {planFeatures.templateCount} templates for your content.
                    ({selectedTemplates.length}/{planFeatures.templateCount} selected)
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {MOCK_TEMPLATES.map((t) => {
                    const isSelected = selectedTemplates.includes(t.id);
                    return (
                      <Card
                        key={t.id}
                        onClick={() => toggleTemplate(t.id)}
                        className={`cursor-pointer transition-all hover:border-primary/30 ${
                          isSelected ? "border-primary ring-1 ring-primary bg-primary/5" : ""
                        }`}
                      >
                        <CardContent className="p-3">
                          <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center mb-2 relative">
                            <LayoutTemplate className="w-6 h-6 text-muted-foreground" />
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <p className="font-heading font-medium text-xs truncate">{t.name}</p>
                          <p className="text-[10px] text-muted-foreground">{t.category}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIDEO OPTIONS */}
            {currentStepKey === "videos" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-heading font-bold text-xl sm:text-2xl mb-1">Video Preferences</h2>
                  <p className="text-muted-foreground text-sm">
                    Select your preferred video styles. You have {planFeatures.videoCount} short-form video(s)
                    {planFeatures.hasUGC ? ` + ${planFeatures.ugcCount} UGC video(s)` : ""} included.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VIDEO_STYLES.map((v) => {
                    const isSelected = selectedVideoStyles.includes(v.id);
                    return (
                      <Card
                        key={v.id}
                        onClick={() => toggleVideoStyle(v.id)}
                        className={`cursor-pointer transition-all hover:border-primary/30 ${
                          isSelected ? "border-primary ring-1 ring-primary bg-primary/5" : ""
                        }`}
                      >
                        <CardContent className="p-4 flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "bg-primary/20" : "bg-muted"
                          }`}>
                            <Film className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <p className="font-heading font-semibold text-sm">{v.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{v.desc}</p>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-primary ml-auto flex-shrink-0 mt-1" />}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ADVANCED SERVICES */}
            {currentStepKey === "advanced" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-heading font-bold text-xl sm:text-2xl mb-1">Advanced Services</h2>
                  <p className="text-muted-foreground text-sm">
                    These premium features are available in your client portal.
                  </p>
                </div>
                <div className="space-y-3">
                  {servicesList.map((svc: any, i: number) => (
                    <Card key={i} className="border-primary/20">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svc.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-heading font-semibold">{svc.label}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{svc.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  You'll access these services from your dashboard after setup.
                </p>
              </div>
            )}

            {/* COMPLETE */}
            {currentStepKey === "complete" && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
                >
                  <PartyPopper className="w-10 h-10 text-primary" />
                </motion.div>
                <div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl mb-2">You're All Set!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Your {currentPlan} plan is configured. Head to your dashboard to start creating.
                  </p>
                </div>
                <div className="max-w-sm mx-auto space-y-2 text-left">
                  <SetupCheck label="Images uploaded" done={uploadedFiles.length > 0} />
                  {planFeatures.hasTemplates && <SetupCheck label="Templates selected" done={selectedTemplates.length > 0} />}
                  {planFeatures.hasShortFormVideo && <SetupCheck label="Video preferences set" done={selectedVideoStyles.length > 0} />}
                  {servicesList.length > 0 && <SetupCheck label="Advanced services reviewed" done />}
                </div>
                <Button onClick={handleFinish} size="lg" className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
                  Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStepKey !== "complete" && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
              className="font-heading gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={isLoading || (currentStepKey === "upload" && uploadedFiles.length === 0)}
              className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
              ) : (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

function ServiceItem({ icon: Icon, label, included }: { icon: React.ElementType; label: string; included: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {included ? (
        <Check className="w-4 h-4 text-primary flex-shrink-0" />
      ) : (
        <div className="w-4 h-4 rounded-full border border-border flex-shrink-0" />
      )}
      <span className={`text-sm ${included ? "text-foreground" : "text-muted-foreground line-through"}`}>{label}</span>
    </div>
  );
}

function SetupCheck({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1.5">
      {done ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <div className="w-4 h-4 rounded-full border border-border" />}
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default PlanSetup;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight, ArrowLeft, Check, Upload, Palette, Globe, ShoppingBag,
  Camera, Sparkles, Users, BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const industries = [
  "Beauty & Skincare", "Fashion & Apparel", "Food & Beverage",
  "Health & Wellness", "Home & Living", "Tech & Gadgets",
  "Fitness & Sports", "Pets", "Other",
];

const goals = [
  { label: "AI Product Photography", icon: Camera, desc: "Studio-grade product shots" },
  { label: "UGC Videos", icon: Users, desc: "Creator-made social content" },
  { label: "Social Media Management", icon: Globe, desc: "Posting & scheduling" },
  { label: "Brand Strategy", icon: Sparkles, desc: "Growth consulting" },
  { label: "Ad Creatives", icon: BarChart3, desc: "Performance marketing assets" },
  { label: "E-commerce Assets", icon: ShoppingBag, desc: "Listings & storefronts" },
];

const steps = ["Brand Info", "Industry", "Goals", "Ready"];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const canNext = () => {
    if (step === 0) return brandName.trim().length > 0;
    if (step === 1) return selectedIndustry !== "";
    if (step === 2) return selectedGoals.length > 0;
    return true;
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="h-14 border-b border-border flex items-center px-6 gap-3 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/")}>
        <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 rounded-lg object-cover" />
        <span className="font-heading font-bold text-lg tracking-tight">Ryze Studios</span>
      </div>

      {/* Progress */}
      <div className="max-w-xl mx-auto w-full px-6 pt-8">
        <div className="flex items-center gap-2 mb-2">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-heading font-bold transition-colors ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground cyan-glow-sm" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 rounded-full transition-colors ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-8">Step {step + 1} of {steps.length} - {steps[step]}</p>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-6">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1">Tell us about your brand</h2>
                  <p className="text-muted-foreground text-sm">We'll use this to personalize your creative experience.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand name *</Label>
                    <Input id="brand" placeholder="e.g. GlowCo Beauty" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="website" placeholder="https://yourbrand.com" value={website} onChange={(e) => setWebsite(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">What does your brand sell? (optional)</Label>
                    <Textarea id="desc" placeholder="We sell premium organic skincare products..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                  </div>
                  <div className="glass-card p-4 flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Upload your logo</p>
                      <p className="text-xs text-muted-foreground">PNG, SVG, or JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1">What's your industry?</h2>
                  <p className="text-muted-foreground text-sm">This helps us tailor templates and strategies for your niche.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`p-4 rounded-xl border text-sm font-medium text-left transition-all ${selectedIndustry === ind ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/40 text-foreground/80"}`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1">What are you looking for?</h2>
                  <p className="text-muted-foreground text-sm">Select all the services that interest you. You can always change this later.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goals.map((goal) => {
                    const selected = selectedGoals.includes(goal.label);
                    return (
                      <button
                        key={goal.label}
                        onClick={() => toggleGoal(goal.label)}
                        className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          <goal.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${selected ? "text-primary" : "text-foreground/80"}`}>{goal.label}</p>
                          <p className="text-xs text-muted-foreground">{goal.desc}</p>
                        </div>
                        {selected && (
                          <div className="ml-auto mt-0.5">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="text-center space-y-6 py-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto cyan-glow">
                  <Sparkles className="w-9 h-9 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-3xl mb-2">You're all set!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Your creative workspace is ready. Explore your dashboard, submit your first production request, or browse the marketplace.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                  {[
                    { icon: Palette, label: "Set up Brand Kit" },
                    { icon: Camera, label: "First AI Edit" },
                    { icon: ShoppingBag, label: "Browse Marketplace" },
                  ].map((action) => (
                    <div key={action.label} className="glass-card p-4 text-center hover:border-primary/40 transition-colors cursor-pointer">
                      <action.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-xs font-medium">{action.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pb-12">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="gap-1 text-muted-foreground">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            <Button onClick={next} disabled={!canNext()} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-6 gap-1">
              {step === steps.length - 1 ? "Go to Dashboard" : "Continue"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

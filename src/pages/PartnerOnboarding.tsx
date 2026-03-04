import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight, ArrowLeft, Check, Globe, Building2, Users, Palette,
  Sparkles, Shield, Upload, Clock, Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const clientVolumes = [
  "1–5 clients",
  "6–20 clients",
  "21–50 clients",
  "50+ clients",
];

const services = [
  { label: "AI Product Photography", desc: "White-label AI edits for your clients" },
  { label: "UGC Video Production", desc: "Creator-made content under your brand" },
  { label: "Social Media Management", desc: "Managed posting for client accounts" },
  { label: "Brand Strategy", desc: "Growth consulting you can resell" },
  { label: "Ad Creatives", desc: "Performance marketing assets" },
  { label: "Full Creative Outsourcing", desc: "End-to-end production" },
];

const steps = ["Company Info", "Client Volume", "Services", "White-Label", "Submitted"];

const PartnerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [aboutBusiness, setAboutBusiness] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [brandColor, setBrandColor] = useState("#00D4FF");
  const [customDomain, setCustomDomain] = useState("");

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const canNext = () => {
    if (step === 0) return companyName.trim().length > 0 && contactName.trim().length > 0;
    if (step === 1) return selectedVolume !== "";
    if (step === 2) return selectedServices.length > 0;
    return true;
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="h-14 border-b border-border flex items-center px-6 gap-3">
        <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 rounded-lg object-cover" />
        <span className="font-heading font-bold text-lg tracking-tight">Ryze Studios</span>
        <span className="text-xs text-muted-foreground font-heading ml-1">Partner Program</span>
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
        <p className="text-xs text-muted-foreground mb-8">Step {step + 1} of {steps.length} — {steps[step]}</p>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-6">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {/* Step 0: Company Info */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1">Tell us about your company</h2>
                  <p className="text-muted-foreground text-sm">We'll use this to set up your partner account.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Agency name *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="company" placeholder="e.g. Creative Agency Co." value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Your full name *</Label>
                    <Input id="contact" placeholder="John Doe" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pwebsite">Website (optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="pwebsite" placeholder="https://youragency.com" value={website} onChange={(e) => setWebsite(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">About your business (optional)</Label>
                    <Textarea id="about" placeholder="We help e-commerce brands scale their content..." value={aboutBusiness} onChange={(e) => setAboutBusiness(e.target.value)} rows={3} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Client Volume */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1">How many clients do you serve?</h2>
                  <p className="text-muted-foreground text-sm">This helps us recommend the right partner tier for you.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {clientVolumes.map((vol) => (
                    <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`p-5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                        selectedVolume === vol
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-primary/40 text-foreground/80"
                      }`}
                    >
                      <Users className={`w-5 h-5 flex-shrink-0 ${selectedVolume === vol ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{vol}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1">Which services interest you?</h2>
                  <p className="text-muted-foreground text-sm">Select all the services you'd like to offer your clients through Ryze.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((svc) => {
                    const selected = selectedServices.includes(svc.label);
                    return (
                      <button
                        key={svc.label}
                        onClick={() => toggleService(svc.label)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${selected ? "text-primary" : "text-foreground/80"}`}>{svc.label}</p>
                          {selected && <Check className="w-4 h-4 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{svc.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: White-Label */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1">White-label preferences</h2>
                  <p className="text-muted-foreground text-sm">Customize how your clients see the platform. You can update these anytime.</p>
                </div>
                <div className="space-y-4">
                  <div className="glass-card p-4 flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Upload your logo</p>
                      <p className="text-xs text-muted-foreground">PNG, SVG, or JPG up to 5MB</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Brand accent color</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                      />
                      <Input value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="flex-1 uppercase" maxLength={7} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Custom client portal domain (optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="domain" placeholder="studio.youragency.com" value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} className="pl-10" />
                    </div>
                    <p className="text-xs text-muted-foreground">Your clients will access the portal through this domain.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Application Submitted */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="text-center space-y-6 py-8">
                <div className="w-20 h-20 rounded-2xl bg-amber-500/15 flex items-center justify-center mx-auto">
                  <Clock className="w-9 h-9 text-amber-500" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-3xl mb-2">Application Submitted</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for applying to the Ryze Partner Network. Our team will review your application and verify your business within 1–3 business days.
                  </p>
                </div>
                <div className="glass-card p-5 max-w-sm mx-auto text-left space-y-3">
                  <h4 className="font-heading font-semibold text-sm">What happens next?</h4>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">We review your company details and market fit</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">A partner manager may reach out for a quick call</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Once approved, you'll receive an email with your partner portal access</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>We'll notify you at your registered email</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pb-12">
            {step > 0 && step < steps.length - 1 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="gap-1 text-muted-foreground">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            {step === steps.length - 1 ? (
              <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-6 gap-1">
                Back to Home <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={next} disabled={!canNext()} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-6 gap-1">
                {step === steps.length - 2 ? "Submit Application" : "Continue"} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerOnboarding;

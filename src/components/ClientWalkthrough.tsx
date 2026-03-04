import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Factory, ClipboardList, Palette, Download, MessageSquare,
  ArrowRight, X, Sparkles,
} from "lucide-react";

const walkthroughSteps = [
  {
    icon: Sparkles,
    title: "Welcome to Ryze Studios!",
    desc: "Let's take a quick tour of your creative dashboard. This will only take a minute.",
  },
  {
    icon: Factory,
    title: "AI Factory",
    desc: "Generate studio-grade product images with AI. Upload a photo, pick a style, and get results in minutes.",
  },
  {
    icon: ClipboardList,
    title: "Production Requests",
    desc: "Submit creative briefs for UGC videos, social content, and more. Our team handles the rest.",
  },
  {
    icon: Palette,
    title: "Brand Kit",
    desc: "Store your brand colors, fonts, logos, and guidelines. Everything stays consistent across all deliverables.",
  },
  {
    icon: Download,
    title: "Deliverables",
    desc: "Review, approve, or request revisions on completed work — all in one place.",
  },
  {
    icon: MessageSquare,
    title: "Messages",
    desc: "Chat directly with your dedicated creative lead. Fast feedback loops, zero email chaos.",
  },
];

interface Props {
  onComplete: () => void;
}

const ClientWalkthrough: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const current = walkthroughSteps[step];
  const isLast = step === walkthroughSteps.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-1.5">
            {walkthroughSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i <= step ? "bg-primary w-6" : "bg-muted w-3"
                }`}
              />
            ))}
          </div>
          <button
            onClick={onComplete}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto cyan-glow-sm">
                <current.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl">{current.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-heading">
            {step + 1} / {walkthroughSteps.length}
          </span>
          <div className="flex gap-2">
            {step > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(step - 1)}
                className="font-heading"
              >
                Back
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => (isLast ? onComplete() : setStep(step + 1))}
              className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-1 rounded-full px-5"
            >
              {isLast ? "Get Started" : "Next"} <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientWalkthrough;

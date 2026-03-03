import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const BookDemo = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 group">
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <img src={ryzeLogo} alt="Ryze Studios" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-heading font-bold text-lg">Ryze Studios</span>
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left - value prop */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/10 text-primary border-0 font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3 mr-1.5" /> FREE STRATEGY CALL
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 leading-tight">
              Let's build your <span className="text-primary">content engine</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg">
              Hop on a 20-minute call with a Ryze creative lead. We'll map out a content strategy tailored to your brand. No obligations, no fluff.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Personalized content strategy for your brand",
                "See real examples of what we'd create for you",
                "Get a custom pricing recommendation",
                "Learn how brands like yours scaled with Ryze",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex -space-x-2">
                {[
                  "bg-gradient-to-br from-rose-400 to-pink-500",
                  "bg-gradient-to-br from-sky-400 to-blue-500",
                  "bg-gradient-to-br from-amber-400 to-orange-500",
                  "bg-gradient-to-br from-emerald-400 to-teal-500",
                ].map((grad, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${grad} border-2 border-background flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">{["S", "K", "C", "T"][i]}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">1,800+</strong> brands trust Ryze Studios
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Calendly embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
              <div className="p-4 border-b border-border bg-muted/30">
                <h3 className="font-heading font-semibold text-sm">Pick a time that works for you</h3>
                <p className="text-xs text-muted-foreground mt-0.5">20-minute strategy call · Free · No obligations</p>
              </div>
              {/* Calendly placeholder - replace YOUR_CALENDLY_URL with actual URL */}
              <div className="relative" style={{ minHeight: 650 }}>
                <iframe
                  src="https://calendly.com/d/placeholder"
                  width="100%"
                  height="650"
                  frameBorder="0"
                  title="Book a demo with Ryze Studios"
                  className="w-full"
                  style={{ border: "none" }}
                />
                {/* Overlay for placeholder state */}
                <div className="absolute inset-0 bg-card flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">Calendly Widget</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-6">
                    Replace the iframe <code className="bg-muted px-1.5 py-0.5 rounded text-xs">src</code> with your Calendly scheduling URL to activate this widget.
                  </p>
                  <div className="bg-muted rounded-xl p-4 text-left w-full max-w-sm">
                    <p className="text-[10px] text-muted-foreground font-heading mb-1">EXAMPLE URL</p>
                    <code className="text-xs text-primary break-all">https://calendly.com/your-username/strategy-call</code>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookDemo;

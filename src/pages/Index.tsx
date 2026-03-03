import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Play, Star, ArrowRight, Sparkles, ChevronRight, Zap, Shield, Users, MessageSquare, Calendar, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const pricingTiers = [
  {
    name: "Entry Level Pass",
    price: 10,
    deliverables: ["1 AI Edit"],
    support: "AI FAQ & Email",
    icon: Zap,
  },
  {
    name: "Visual Starter Kit",
    price: 110,
    deliverables: ["10 AI Edits"],
    support: "AI FAQ & Email",
    icon: Sparkles,
  },
  {
    name: "Viral Growth",
    price: 240,
    deliverables: ["1 UGC Video", "5 AI Edits"],
    support: "AI FAQ & Email",
    icon: Users,
    popular: true,
  },
  {
    name: "Full Brand Manager",
    price: 299,
    deliverables: ["Managed Social", "20 AI Edits"],
    support: "Live Chat",
    icon: Shield,
  },
  {
    name: "Done For You",
    price: 499,
    deliverables: ["Full Content Batch", "Strategy"],
    support: "Meeting Booking",
    icon: Calendar,
  },
  {
    name: "Master Production",
    price: 679,
    deliverables: ["Unlimited AI", "Premium UGC"],
    support: "Priority Meeting Access",
    icon: Crown,
    premium: true,
  },
];

const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none border border-border"
      onMouseDown={() => { dragging.current = true; }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => { dragging.current = true; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Before - Raw */}
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-xl bg-secondary mb-4 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
          <p className="text-muted-foreground font-heading font-semibold text-lg">Raw Product Photo</p>
          <p className="text-muted-foreground/60 text-sm mt-1">Plain background, basic lighting</p>
        </div>
      </div>

      {/* After - Ryze */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4 flex items-center justify-center cyan-glow">
            <span className="text-4xl">✨</span>
          </div>
          <p className="font-heading font-semibold text-lg text-foreground">Ryze AI Environment</p>
          <p className="text-muted-foreground text-sm mt-1">Studio-grade, brand-ready</p>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary cyan-glow"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center cyan-glow cursor-col-resize">
          <span className="text-primary-foreground text-xs font-bold">⟷</span>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4">
        <Badge variant="secondary" className="font-heading">Before</Badge>
      </div>
      <div className="absolute top-4 right-4">
        <Badge className="bg-primary text-primary-foreground font-heading">After</Badge>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center cyan-glow-sm">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">Ryze Studios</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="font-heading">Sign In</Button>
            <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary-pressed cyan-glow-sm font-heading">
              Start Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 font-heading">
              <Sparkles className="w-3 h-3 mr-1" /> AI-Powered Creative Studio
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-6 leading-[1.1]">
              Top 1 Percent
              <br />
              <span className="text-primary cyan-glow-text">Global AI Creative</span>
              <br />
              Talent
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-3 font-heading font-medium">
              Studio-grade content from <span className="text-primary font-bold">$10 USD</span> per month
            </p>
            <p className="text-lg text-muted-foreground/70 mb-10 max-w-2xl mx-auto">
              Win the three-second judgment. Compete like a global brand from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-primary text-primary-foreground hover:bg-primary-pressed cyan-glow font-heading text-lg px-8 py-6"
              >
                Start Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 font-heading text-lg px-8 py-6"
              >
                Book Free Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Factory Proof */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Factory Proof</h2>
            <p className="text-muted-foreground text-lg">See the transformation. Drag to compare.</p>
          </motion.div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Wall of Proof */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Wall of Proof</h2>
            <p className="text-muted-foreground text-lg">Real results from real brands</p>
          </motion.div>

          {/* Video Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Sarah K.", role: "E-commerce Brand Owner", quote: "Ryze transformed our product imagery overnight." },
              { name: "Marcus T.", role: "Dropship Entrepreneur", quote: "From $0 to $50k months with Ryze content." },
              { name: "Jenna L.", role: "Fashion Label Founder", quote: "Studio-quality without the studio price." },
            ].map((t, i) => (
              <Card key={i} className="group hover:border-primary/30 transition-all duration-300 hover:cyan-glow-sm">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg bg-muted mb-4 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <Play className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground font-medium mb-2">"{t.quote}"</p>
                  <p className="text-sm text-muted-foreground">{t.name} · {t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pilot Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { metric: "312%", label: "Avg. Engagement Lift" },
              { metric: "48hr", label: "Avg. Turnaround" },
              { metric: "2,400+", label: "Edits Delivered" },
              { metric: "98%", label: "Client Satisfaction" },
            ].map((r, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-card border border-border">
                <p className="text-3xl md:text-4xl font-heading font-black text-primary cyan-glow-text">{r.metric}</p>
                <p className="text-sm text-muted-foreground mt-2">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Choose Your Tier</h2>
            <p className="text-muted-foreground text-lg">Scale from solo creator to full production house</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className={`relative h-full transition-all duration-300 hover:cyan-glow-sm ${tier.popular ? "border-primary cyan-glow-sm" : ""} ${tier.premium ? "border-primary/50 bg-gradient-to-br from-card to-primary/5" : ""}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground font-heading">Most Popular</Badge>
                    </div>
                  )}
                  {tier.premium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-heading">Premium</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <tier.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-xl">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-heading font-black text-primary">${tier.price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {tier.deliverables.map((d, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{d}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{tier.support}</span>
                      </div>
                    </div>
                    <Button
                      className={`w-full font-heading ${tier.popular || tier.premium ? "bg-primary text-primary-foreground hover:bg-primary-pressed" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                    >
                      Get Started <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg">Ryze Studios</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Ryze Studios. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</button>
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</button>
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

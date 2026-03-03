import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Play, Star, ArrowRight, Sparkles, ChevronRight, Zap, Shield, Users, MessageSquare, Calendar, Crown, Heart, MessageCircle, Send, Bookmark, TrendingUp, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const pricingTiers = [
  { name: "Entry Level Pass", price: 10, deliverables: ["1 AI Edit"], support: "AI FAQ & Email", icon: Zap },
  { name: "Visual Starter Kit", price: 110, deliverables: ["10 AI Edits"], support: "AI FAQ & Email", icon: Sparkles },
  { name: "Viral Growth", price: 240, deliverables: ["1 UGC Video", "5 AI Edits"], support: "AI FAQ & Email", icon: Users, popular: true },
  { name: "Full Brand Manager", price: 299, deliverables: ["Managed Social", "20 AI Edits"], support: "Live Chat", icon: Shield },
  { name: "Done For You", price: 499, deliverables: ["Full Content Batch", "Strategy"], support: "Meeting Booking", icon: Calendar },
  { name: "Master Production", price: 679, deliverables: ["Unlimited AI", "Premium UGC"], support: "Priority Meeting Access", icon: Crown, premium: true },
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
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-xl bg-secondary mb-4 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
          <p className="text-muted-foreground font-heading font-semibold text-lg">Raw Product Photo</p>
          <p className="text-muted-foreground/60 text-sm mt-1">Plain background, basic lighting</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4 flex items-center justify-center cyan-glow">
            <span className="text-4xl">✨</span>
          </div>
          <p className="font-heading font-semibold text-lg text-foreground">Ryze AI Environment</p>
          <p className="text-muted-foreground text-sm mt-1">Studio-grade, brand-ready</p>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 w-1 bg-primary cyan-glow" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center cyan-glow cursor-col-resize">
          <span className="text-primary-foreground text-xs font-bold">⟷</span>
        </div>
      </div>
      <div className="absolute top-4 left-4"><Badge variant="secondary" className="font-heading">Before</Badge></div>
      <div className="absolute top-4 right-4"><Badge className="bg-primary text-primary-foreground font-heading">After</Badge></div>
    </div>
  );
};

/* Fake social post card */
const SocialPostCard: React.FC<{ color: string; title: string; hasVideo?: boolean }> = ({ color, title, hasVideo }) => (
  <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
    <div className={`aspect-[4/5] ${color} flex items-center justify-center relative`}>
      {hasVideo && (
        <div className="w-14 h-14 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
          <Play className="w-6 h-6 text-foreground ml-1" />
        </div>
      )}
      <p className="absolute bottom-4 left-4 right-4 text-white font-heading font-bold text-lg leading-tight drop-shadow-lg">{title}</p>
    </div>
    <div className="p-3 flex items-center gap-3">
      <Heart className="w-5 h-5 text-destructive fill-destructive" />
      <MessageCircle className="w-5 h-5 text-muted-foreground" />
      <Send className="w-5 h-5 text-muted-foreground" />
      <Bookmark className="w-5 h-5 text-muted-foreground ml-auto" />
    </div>
  </div>
);

const StoryCard: React.FC<{ color: string }> = ({ color }) => (
  <div className={`rounded-2xl ${color} aspect-[9/16] w-full flex items-end p-3`}>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-background/50 border-2 border-primary" />
      <span className="text-xs text-white font-medium drop-shadow">Business · 3s ago</span>
    </div>
  </div>
);

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <img src={ryzeLogo} alt="Ryze Studios" className="w-9 h-9 rounded-lg object-cover" />
              <span className="font-heading font-bold text-xl tracking-tight">Ryze Studios</span>
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Services</button>
              <button className="hover:text-foreground transition-colors">Examples</button>
              <button className="hover:text-foreground transition-colors">Pricing</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="font-medium text-sm">Log in</Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="font-medium text-sm hidden sm:inline-flex">Get Started</Button>
            <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-5">
              Book a Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero — Feedbird-style split layout */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-6"
          >
            <Badge className="mb-6 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3 mr-1.5 text-primary" /> TOP 1% OF GLOBAL CREATIVE TALENT
            </Badge>

            <h1 className="text-4xl md:text-[3.4rem] font-heading font-black tracking-tight leading-[1.1] mb-6">
              Expert AI creative
              <br />
              management from
              <br />
              only <span className="text-primary">$10/mo</span>
            </h1>

            <div className="space-y-3 mb-8">
              {[
                { bold: "Premium", text: "content with your branding" },
                { bold: "80% cheaper", text: "than alternatives" },
                { bold: "Studio-grade AI", text: "– win the 3‑second judgment" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <p className="text-base">
                    <strong>{item.bold}</strong> {item.text}
                  </p>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-primary text-primary-foreground hover:bg-primary-pressed cyan-glow-sm font-heading text-base px-8 py-6 rounded-full mb-5"
            >
              Schedule a free demo call <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-sm text-muted-foreground">
              Trusted by <strong className="text-foreground">2,400+</strong> brands  |  Cancel anytime
            </p>
          </motion.div>

          {/* Right: social content grid (reference style) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-3 gap-3">
              {/* Row 1: 3 social post cards */}
              <SocialPostCard color="bg-gradient-to-br from-amber-400 to-orange-500" title="ANOTHER WAY TO GROW" hasVideo />
              <SocialPostCard color="bg-gradient-to-br from-slate-600 to-slate-800" title="RISE ABOVE THE REST" />
              <SocialPostCard color="bg-gradient-to-br from-rose-400 to-red-500" title="GAME, YOUR STORY" />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* Stories card */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center"><Bookmark className="w-3 h-3 text-muted-foreground" /></div>
                  <span className="font-heading font-semibold text-sm">Instagram Stories</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <StoryCard color="bg-gradient-to-b from-emerald-400 to-teal-600" />
                  <StoryCard color="bg-gradient-to-b from-cyan-500 to-blue-600" />
                </div>
              </Card>

              {/* Growth card */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center"><TrendingUp className="w-3 h-3 text-muted-foreground" /></div>
                  <span className="font-heading font-semibold text-sm">Growth Analytics</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Followers</span>
                      <BarChart3 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-2xl font-heading font-black">8.4K <span className="text-xs text-primary font-medium">+128%</span></p>
                    <div className="h-16 mt-2 flex items-end gap-1">
                      {[30, 45, 35, 55, 50, 70, 65, 80, 90, 85, 95, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${h}%` }}>
                          <div className="w-full bg-primary rounded-t" style={{ height: `${h * 0.6}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Reach</span>
                      <BarChart3 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-2xl font-heading font-black">129K <span className="text-xs text-primary font-medium">+348%</span></p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Factory Proof */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Factory Proof</h2>
            <p className="text-muted-foreground text-lg">See the transformation. Drag to compare.</p>
          </motion.div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Wall of Proof */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Wall of Proof</h2>
            <p className="text-muted-foreground text-lg">Real results from real brands</p>
          </motion.div>
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
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-foreground font-medium mb-2">"{t.quote}"</p>
                  <p className="text-sm text-muted-foreground">{t.name} · {t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Choose Your Tier</h2>
            <p className="text-muted-foreground text-lg">Scale from solo creator to full production house</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className={`relative h-full transition-all duration-300 hover:cyan-glow-sm ${tier.popular ? "border-primary cyan-glow-sm" : ""} ${tier.premium ? "border-primary/50 bg-gradient-to-br from-card to-primary/5" : ""}`}>
                  {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground font-heading">Most Popular</Badge></div>}
                  {tier.premium && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-heading">Premium</Badge></div>}
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
                    <Button className={`w-full font-heading ${tier.popular || tier.premium ? "bg-primary text-primary-foreground hover:bg-primary-pressed" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
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
          <div className="flex items-center gap-2.5">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-7 h-7 rounded-lg object-cover" />
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

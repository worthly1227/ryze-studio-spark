import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Play, Star, ArrowRight, Sparkles, ChevronRight, Zap, Shield, Users, MessageSquare, Calendar, Crown, Heart, MessageCircle, Send, Bookmark, TrendingUp, BarChart3, ImageIcon, BookOpen, Palette } from "lucide-react";
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

/* Service preview cards for scrolling hero */
const ServiceCard: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode; tall?: boolean }> = ({ icon, label, children, tall }) => (
  <div className={`rounded-2xl border border-border bg-card shadow-sm flex-shrink-0 overflow-hidden ${tall ? "" : ""}`}>
    <div className="flex items-center gap-2 px-4 pt-4 pb-2">
      <div className="w-5 h-5 text-muted-foreground">{icon}</div>
      <span className="font-heading font-semibold text-sm">{label}</span>
    </div>
    <div className="px-4 pb-4">{children}</div>
  </div>
);

const InstaPostMock: React.FC<{ gradient: string; overlayText: string }> = ({ gradient, overlayText }) => (
  <div className="rounded-xl overflow-hidden border border-border">
    <div className="flex items-center gap-2 px-3 py-2 bg-card">
      <div className="w-6 h-6 rounded-full bg-muted border border-border" />
      <span className="text-xs font-medium">Business</span>
      <span className="text-xs text-muted-foreground ml-auto">···</span>
    </div>
    <div className={`aspect-square ${gradient} flex items-center justify-center relative`}>
      <p className="text-white font-heading font-bold text-sm text-center px-4 drop-shadow-lg">{overlayText}</p>
    </div>
    <div className="p-2.5 flex items-center gap-2.5 bg-card">
      <Heart className="w-4 h-4 text-destructive fill-destructive" />
      <MessageCircle className="w-4 h-4 text-muted-foreground" />
      <Send className="w-4 h-4 text-muted-foreground" />
      <Bookmark className="w-4 h-4 text-muted-foreground ml-auto" />
    </div>
  </div>
);

/* Column 1 cards */
const col1Cards = [
  <ServiceCard key="ugc" icon={<Play className="w-5 h-5" />} label="UGC Videos">
    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
        <Play className="w-5 h-5 text-foreground ml-0.5" />
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="social" icon={<Heart className="w-5 h-5" />} label="Social Media Posts">
    <InstaPostMock gradient="bg-gradient-to-br from-teal-400 to-cyan-600" overlayText="RISE ABOVE THE REST" />
  </ServiceCard>,
  <ServiceCard key="stories" icon={<Bookmark className="w-5 h-5" />} label="Instagram Stories">
    <div className="grid grid-cols-2 gap-2">
      <div className="aspect-[9/16] rounded-xl bg-gradient-to-b from-emerald-400 to-teal-600 flex items-end p-2">
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-background/50 border border-primary" /><span className="text-[9px] text-white font-medium">3s ago</span></div>
      </div>
      <div className="aspect-[9/16] rounded-xl bg-gradient-to-b from-cyan-500 to-blue-600 flex items-end p-2">
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-background/50 border border-primary" /><span className="text-[9px] text-white font-medium">3s ago</span></div>
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="ads" icon={<TrendingUp className="w-5 h-5" />} label="AI Ad Creatives">
    <InstaPostMock gradient="bg-gradient-to-br from-violet-500 to-purple-700" overlayText="GAME, YOUR STORY" />
  </ServiceCard>,
  <ServiceCard key="photo2" icon={<ImageIcon className="w-5 h-5" />} label="Product Photography">
    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
      <span className="text-4xl">📸</span>
    </div>
  </ServiceCard>,
];

/* Column 2 cards */
const col2Cards = [
  <ServiceCard key="growth" icon={<TrendingUp className="w-5 h-5" />} label="Growth Analytics">
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Followers</span>
          <BarChart3 className="w-3.5 h-3.5 text-primary" />
        </div>
        <p className="text-xl font-heading font-black">8.4K <span className="text-xs text-primary font-medium">+128%</span></p>
        <div className="h-12 mt-1.5 flex items-end gap-0.5">
          {[30,45,35,55,50,70,65,80,90,85,95,100].map((h,i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${h}%` }}>
              <div className="w-full bg-primary rounded-t" style={{ height: `${h * 0.6}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Reach</span>
          <BarChart3 className="w-3.5 h-3.5 text-primary" />
        </div>
        <p className="text-xl font-heading font-black">129K <span className="text-xs text-primary font-medium">+348%</span></p>
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="email" icon={<MessageSquare className="w-5 h-5" />} label="Email Design">
    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center">
      <div className="bg-background/90 rounded-lg p-3 text-center">
        <p className="font-heading font-bold text-xs">NEW STYLES</p>
        <p className="font-heading font-bold text-xs">JUST DROPPED</p>
        <p className="text-[9px] text-primary mt-1">SHOP NOW →</p>
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="seo" icon={<BookOpen className="w-5 h-5" />} label="SEO Content">
    <div className="space-y-2">
      {[
        { img: "bg-gradient-to-br from-amber-200 to-amber-400", title: "The Role of Healthy..." },
        { img: "bg-gradient-to-br from-green-200 to-green-400", title: "How Local Ingredients..." },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2">
          <div className={`w-10 h-10 rounded-lg ${item.img} flex-shrink-0`} />
          <span className="text-xs font-medium truncate">{item.title}</span>
        </div>
      ))}
    </div>
  </ServiceCard>,
  <ServiceCard key="carousel" icon={<ImageIcon className="w-5 h-5" />} label="Carousel Posts">
    <InstaPostMock gradient="bg-gradient-to-br from-yellow-400 to-amber-500" overlayText="BUILD YOUR EMPIRE" />
  </ServiceCard>,
  <ServiceCard key="brand" icon={<Palette className="w-5 h-5" />} label="Brand Assets">
    <div className="grid grid-cols-3 gap-1.5">
      {["bg-primary", "bg-foreground", "bg-muted", "bg-destructive", "bg-secondary", "bg-accent"].map((c, i) => (
        <div key={i} className={`aspect-square rounded-lg ${c} border border-border`} />
      ))}
    </div>
  </ServiceCard>,
];

const ScrollingColumn: React.FC<{ cards: React.ReactNode[]; speed?: number; reverse?: boolean }> = ({ cards, speed = 30, reverse = false }) => (
  <div className="relative overflow-hidden h-[600px]">
    <div
      className={`flex flex-col gap-3 ${reverse ? "animate-scroll-down" : "animate-scroll-up"}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {[...cards, ...cards].map((card, i) => (
        <div key={i}>{card}</div>
      ))}
    </div>
  </div>
);

const contentTypes = ["Posts", "Videos", "UGC", "Static Ads", "Video Ads", "Emails", "Blogs", "Stories"];
const industries = ["Featured", "Beauty Services", "Food & Beverages", "Health & Wellness", "Home Services", "Products", "Professional Services", "Real Estate", "SaaS & Tech", "Travel & Tourism", "Other"];

const proofItems = [
  { before: "📦", after: "✨", category: "Posts", industry: "Beauty Services", gradient: "from-rose-400 to-pink-600" },
  { before: "📷", after: "🎨", category: "Posts", industry: "Food & Beverages", gradient: "from-amber-400 to-orange-500" },
  { before: "🏷️", after: "💎", category: "Posts", industry: "Products", gradient: "from-emerald-400 to-teal-600" },
  { before: "🎥", after: "🎬", category: "Videos", industry: "Travel & Tourism", gradient: "from-sky-400 to-blue-600" },
  { before: "📸", after: "🌟", category: "UGC", industry: "Health & Wellness", gradient: "from-violet-400 to-purple-600" },
  { before: "📄", after: "🔥", category: "Static Ads", industry: "SaaS & Tech", gradient: "from-cyan-400 to-teal-500" },
  { before: "🎞️", after: "⚡", category: "Video Ads", industry: "Real Estate", gradient: "from-indigo-400 to-blue-700" },
  { before: "✉️", after: "💌", category: "Emails", industry: "Professional Services", gradient: "from-rose-300 to-red-500" },
  { before: "📝", after: "📖", category: "Blogs", industry: "Home Services", gradient: "from-lime-400 to-green-600" },
  { before: "📱", after: "🚀", category: "Stories", industry: "Beauty Services", gradient: "from-fuchsia-400 to-pink-600" },
  { before: "🖼️", after: "🎯", category: "Posts", industry: "Featured", gradient: "from-yellow-400 to-amber-600" },
  { before: "🏠", after: "🏡", category: "Static Ads", industry: "Real Estate", gradient: "from-slate-400 to-gray-600" },
];

const MiniSlider: React.FC<{ item: typeof proofItems[0] }> = ({ item }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const handleMove = (clientX: number) => {
    if (!ref.current || !drag.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const up = () => { drag.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, []);

  return (
    <div
      ref={ref}
      className="aspect-square rounded-xl overflow-hidden cursor-col-resize select-none relative"
      onMouseDown={() => { drag.current = true; }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => { drag.current = true; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Before */}
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">{item.before}</span>
          <p className="text-xs text-muted-foreground mt-2 font-heading font-semibold">Before</p>
        </div>
      </div>
      {/* After */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="text-center">
          <span className="text-5xl">{item.after}</span>
          <p className="text-xs text-white/90 mt-2 font-heading font-semibold">After</p>
        </div>
      </div>
      {/* Slider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/80" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center cursor-col-resize">
          <span className="text-foreground text-[10px] font-bold">⟷</span>
        </div>
      </div>
    </div>
  );
};

const ProofCard: React.FC<{ item: typeof proofItems[0] }> = ({ item }) => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    {/* Header like Instagram */}
    <div className="flex items-center gap-2 px-3 py-2.5">
      <img src={ryzeLogo} alt="Ryze" className="w-7 h-7 rounded-full object-cover" />
      <span className="text-sm font-semibold font-heading">Ryze Studios</span>
      <span className="text-muted-foreground ml-auto text-sm">···</span>
    </div>
    {/* Slider image */}
    <MiniSlider item={item} />
    {/* Engagement bar */}
    <div className="px-3 py-2.5 flex items-center gap-3">
      <Heart className="w-5 h-5 text-destructive fill-destructive" />
      <MessageCircle className="w-5 h-5 text-muted-foreground" />
      <Send className="w-5 h-5 text-muted-foreground" />
      <Bookmark className="w-5 h-5 text-muted-foreground ml-auto" />
    </div>
  </div>
);

const FactoryProofSection: React.FC = () => {
  const [activeType, setActiveType] = useState("Posts");
  const [activeIndustry, setActiveIndustry] = useState("Featured");
  const [showAll, setShowAll] = useState(false);

  const filtered = proofItems.filter((item) => {
    const typeMatch = item.category === activeType;
    const industryMatch = activeIndustry === "Featured" || item.industry === activeIndustry;
    return typeMatch && industryMatch;
  });

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Examples of our work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get your design & marketing content done without the hassle. Pay a fixed, monthly, and predictable rate, with no contracts or surprises.</p>
        </motion.div>

        {/* Content type tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-card border border-border rounded-full p-1 gap-0.5 flex-wrap justify-center">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => { setActiveType(type); setShowAll(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeType === type ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Industry filter pills */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 flex-wrap justify-center">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => { setActiveIndustry(ind); setShowAll(false); }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${activeIndustry === ind ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((item, i) => (
              <motion.div key={`${item.category}-${item.industry}-${i}`} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <ProofCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No examples yet for this combination. Check back soon!</p>
          </div>
        )}

        {/* Load more */}
        {filtered.length > 6 && !showAll && (
          <div className="flex justify-center mt-10">
            <Button onClick={() => setShowAll(true)} className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-heading px-8">
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
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

          {/* Right: scrolling social content columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Fade masks top and bottom */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-2 gap-3">
              <ScrollingColumn cards={col1Cards} speed={30} />
              <ScrollingColumn cards={col2Cards} speed={35} reverse />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Factory Proof */}
      <FactoryProofSection />

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

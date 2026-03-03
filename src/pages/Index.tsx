import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check, X, Play, ArrowRight, Sparkles, Zap, Shield, Users,
  Calendar, Crown, Heart, MessageCircle, Send, Bookmark,
  TrendingUp, BarChart3, ImageIcon, Lightbulb, Globe,
  LayoutGrid, Plus, Volume2, CalendarDays, ChevronDown, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const subscriptionTiers = [
  { name: "Entry Level Pass", price: 10, tagline: "Test premium visuals.", icon: Zap,
    features: [
      { text: "1 AI Product Edit", included: true }, { text: "Standard Processing", included: true },
      { text: "Email Support", included: true }, { text: "UGC Video", included: false },
      { text: "Managed Social Posting", included: false }, { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false }, { text: "Unlimited AI", included: false },
    ],
  },
  { name: "Visual Starter Kit", price: 110, tagline: "Consistent brand visuals.", icon: Sparkles,
    features: [
      { text: "10 AI Product Edits", included: true }, { text: "Standard Processing", included: true },
      { text: "Email Support", included: true }, { text: "UGC Video", included: false },
      { text: "Managed Social Posting", included: false }, { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false }, { text: "Unlimited AI", included: false },
    ],
  },
  { name: "Viral Growth", price: 240, tagline: "Performance focused content.", icon: Users, popular: true,
    features: [
      { text: "1 UGC Video", included: true }, { text: "5 AI Product Edits", included: true },
      { text: "Standard Processing", included: true }, { text: "Email Support", included: true },
      { text: "Managed Social Posting", included: false }, { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false }, { text: "Unlimited AI", included: false },
    ],
  },
  { name: "Full Brand Manager", price: 299, tagline: "Structured social execution.", icon: Shield,
    features: [
      { text: "Managed Social Posting", included: true }, { text: "20 AI Edits", included: true },
      { text: "1 UGC Video", included: true }, { text: "Standard Processing", included: true },
      { text: "Live Chat Support", included: true }, { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false }, { text: "Unlimited AI", included: false },
    ],
  },
  { name: "Done For You", price: 499, tagline: "Full creative outsourcing.", icon: Calendar,
    features: [
      { text: "Full Content Batch", included: true }, { text: "Strategic Direction", included: true },
      { text: "AI + UGC Mix", included: true }, { text: "Managed Social Posting", included: true },
      { text: "Strategy Call Booking", included: true }, { text: "Fast Track Processing", included: true },
      { text: "Unlimited AI", included: false }, { text: "Priority Queue", included: false },
    ],
  },
  { name: "Master Production", price: 679, tagline: "High volume scaling.", icon: Crown, premium: true,
    features: [
      { text: "Unlimited AI Edits", included: true }, { text: "Premium UGC Priority", included: true },
      { text: "Full Content Batch", included: true }, { text: "Strategic Direction", included: true },
      { text: "Managed Social Posting", included: true }, { text: "Priority Queue", included: true },
      { text: "Strategy Access", included: true }, { text: "Priority Strategy Access", included: true },
      { text: "Instant Processing", included: true },
    ],
  },
];

const addOns = [
  { name: "Extra AI Product Image", price: "$10", unit: "per final download", desc: "Generate unlimited variations and only pay for the final image you choose.", icon: ImageIcon },
  { name: "30-Second UGC Video", price: "$99", unit: "", desc: "Professionally produced social media-ready video featuring vetted creators.", icon: Play },
  { name: "Short Video (<20 sec)", price: "$59", unit: "", desc: "Quick, attention-grabbing clips optimized for Reels, TikTok, and social posts.", icon: TrendingUp },
  { name: "Strategic Consultancy", price: "$225", unit: "", desc: "A 45-minute one-on-one session to guide your brand strategy and growth planning.", icon: Lightbulb },
  { name: "Website Templates", price: "$999", unit: "each", desc: "Pre-built, fully branded Ryze designs that integrate seamlessly with your content.", icon: Globe },
];

const comparisonData = [
  { feature: "Cost Basis", agency: "High Retainers ($2k+)", ai: "Monthly Subscriptions", ryze: "$10 Pay-Per-Product" },
  { feature: "Product Integrity", agency: "Manual (Human Error)", ai: "AI Hallucinations", ryze: "100% Geometry Lock" },
  { feature: "Production", agency: "Studio/Physical Setup", ai: "Background Swaps Only", ryze: "AI Production Factory" },
  { feature: "Turnaround", agency: "2 to 4 Weeks", ai: "Minutes (Low Quality)", ryze: "High-Speed Luxury" },
  { feature: "Strategy", agency: "$5k+ Monthly Commit", ai: "None (DIY)", ryze: "$225 On-Demand" },
  { feature: "Design", agency: "Hired Designer Needed", ai: "Manual Templates", ryze: "Editorial Built-In" },
];

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

const beforeAfterClients = ["SpinSudz", "KokoKai Foods LLC", "Crystal Imagery", "True North Wellness", "No Place Like Home", "Darkhorse Solutions"];
const gridIndustries = ["Beauty", "Skincare", "Real Estate", "Dental Clinic", "Food Products", "Yoga"];
const gridEmojis: Record<string, string> = { Beauty: "💅", Skincare: "🧴", "Real Estate": "🏠", "Dental Clinic": "🦷", "Food Products": "🍔", Yoga: "🧘" };

const featureTabs = ["Services", "Onboarding", "Communication", "Collaboration", "Scheduling", "Analytics"];
const featureContent: Record<string, { title: string; desc: string }> = {
  Services: { title: "Choose & Customize", desc: "Browse our full service catalog and build your perfect creative package." },
  Onboarding: { title: "Quick Setup", desc: "Get started in minutes with our guided onboarding flow." },
  Communication: { title: "Real-time Chat", desc: "Message your dedicated team directly for updates and feedback." },
  Collaboration: { title: "Easy Collaboration", desc: "Review, approve, and request revisions all in one place." },
  Scheduling: { title: "Schedule & Post", desc: "We handle scheduling and posting across your social channels." },
  Analytics: { title: "Track Performance", desc: "Monitor content performance with detailed analytics." },
};

const faqItems = [
  { q: "How much does it cost?", a: "Plans start at just $10/month for the Entry Level Pass. Choose the tier that fits your needs and scale up anytime." },
  { q: "Why are you so affordable?", a: "Our AI-powered production pipeline eliminates the overhead of traditional agencies while maintaining premium quality." },
  { q: "Where is the Ryze team located?", a: "We're a distributed global team with creative talent across North America, Europe, and Asia." },
  { q: "How do I get started?", a: "Simply choose a plan, complete onboarding (takes ~5 minutes), and your first content is in production." },
  { q: "What happens after I sign up?", a: "You'll be guided through brand onboarding, then your account manager begins producing content immediately." },
  { q: "How will I communicate with your team?", a: "Through our built-in chat system, scheduled calls (on qualifying tiers), and email support." },
];

/* ═══════════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

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
      className="aspect-square rounded-2xl overflow-hidden cursor-col-resize select-none relative"
      onMouseDown={() => { drag.current = true; }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => { drag.current = true; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">{item.before}</span>
          <p className="text-xs text-muted-foreground mt-2 font-heading font-semibold">Before</p>
        </div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="text-center">
          <span className="text-5xl">{item.after}</span>
          <p className="text-xs text-white/90 mt-2 font-heading font-semibold">After</p>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/80" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center">
          <span className="text-foreground text-[10px] font-bold">⟷</span>
        </div>
      </div>
    </div>
  );
};

const ProofCard: React.FC<{ item: typeof proofItems[0] }> = ({ item }) => (
  <div className="rounded-3xl border border-border/60 bg-gradient-to-b from-card to-card/80 overflow-hidden organic-shadow card-hover">
    <div className="flex items-center gap-2 px-4 py-3">
      <img src={ryzeLogo} alt="Ryze" className="w-7 h-7 rounded-full object-cover" />
      <span className="text-sm font-semibold font-heading">Ryze Studios</span>
      <span className="text-muted-foreground ml-auto text-sm">···</span>
    </div>
    <MiniSlider item={item} />
    <div className="px-4 py-3 flex items-center gap-3">
      <Heart className="w-5 h-5 text-destructive fill-destructive" />
      <MessageCircle className="w-5 h-5 text-muted-foreground" />
      <Send className="w-5 h-5 text-muted-foreground" />
      <Bookmark className="w-5 h-5 text-muted-foreground ml-auto" />
    </div>
  </div>
);

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-heading font-semibold text-base">{q}</span>
        <Plus className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Floating stat pill */
const StatPill: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="inline-flex items-center gap-3 bg-gradient-to-r from-card to-card/90 border border-border/60 rounded-2xl px-5 py-3 organic-shadow card-hover"
  >
    <span className="text-2xl font-heading font-black text-primary">{value}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeType, setActiveType] = useState("Posts");
  const [activeIndustry, setActiveIndustry] = useState("Featured");
  const [showAllProof, setShowAllProof] = useState(false);
  const [activeGridIndustry, setActiveGridIndustry] = useState("Beauty");
  const [activeClient, setActiveClient] = useState("SpinSudz");
  const [activeFeatureTab, setActiveFeatureTab] = useState("Services");

  const filteredProof = proofItems.filter((item) => {
    const typeMatch = item.category === activeType;
    const industryMatch = activeIndustry === "Featured" || item.industry === activeIndustry;
    return typeMatch && industryMatch;
  });
  const visibleProof = showAllProof ? filteredProof : filteredProof.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 rounded-xl object-cover" />
              <span className="font-heading font-bold text-lg tracking-tight">Ryze Studios</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#work" className="hover:text-foreground transition-colors">Work</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
              <a href="#compare" className="hover:text-foreground transition-colors">Why Ryze</a>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-sm">Log in</Button>
            <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-xl px-5 text-sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO — centered, unique ═══ */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-accent text-accent-foreground border-0 font-heading text-xs tracking-wider px-5 py-2 rounded-full">
              AI-Powered Creative Studio
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tight leading-[1.05] mb-6"
          >
            Premium content,{" "}
            <span className="text-primary">radically</span>
            <br />simple pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Studio-grade AI product photography, UGC videos, social management & brand strategy — all starting at just $10/month. No contracts, no surprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading text-base px-8 py-6 rounded-2xl cyan-glow-sm"
            >
              Start creating <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="font-heading text-base px-8 py-6 rounded-2xl border-border"
            >
              Book a demo
            </Button>
          </motion.div>

          {/* Floating stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <StatPill value="2,400+" label="Brands served" delay={0.4} />
            <StatPill value="80%" label="Cost reduction" delay={0.5} />
            <StatPill value="98%" label="Satisfaction rate" delay={0.6} />
          </div>
        </div>

        {/* Marquee of service capabilities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { icon: ImageIcon, label: "AI Product Edits", desc: "Studio-grade photos" },
            { icon: Play, label: "UGC Videos", desc: "Creator-driven content" },
            { icon: Heart, label: "Social Management", desc: "Posting & scheduling" },
            { icon: Lightbulb, label: "Brand Strategy", desc: "On-demand consulting" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-gradient-to-br from-card to-card/80 border border-border/60 rounded-2xl p-5 organic-shadow card-hover group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                <s.icon className="w-5 h-5 text-accent-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-1">{s.label}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ BEFORE/AFTER SLIDER SHOWCASE ═══ */}
      <section className="py-20 px-6 bg-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 font-heading text-xs px-4 py-1.5 rounded-full">
              THE TRANSFORMATION
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">See the difference</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">Drag the slider to reveal how Ryze Studios transforms raw product photos into studio-grade visuals.</p>
          </motion.div>
          <BeforeAfterHero />
        </div>
      </section>

      {/* ═══ FACTORY PROOF GALLERY ═══ */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Our work speaks</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Browse our portfolio by content type and industry.</p>
          </motion.div>

          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-muted rounded-2xl p-1 gap-0.5 flex-wrap justify-center">
              {contentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setActiveType(type); setShowAllProof(false); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeType === type ? "bg-card text-foreground organic-shadow" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <div className="flex gap-2 flex-wrap justify-center">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => { setActiveIndustry(ind); setShowAllProof(false); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${activeIndustry === ind ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {visibleProof.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProof.map((item, i) => (
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

          {filteredProof.length > 6 && !showAllProof && (
            <div className="flex justify-center mt-10">
              <Button onClick={() => setShowAllProof(true)} variant="outline" className="rounded-2xl font-heading px-8">
                Load more
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ WHY RYZE — COMPARISON ═══ */}
      <section id="compare" className="py-20 px-6 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 font-heading text-xs px-4 py-1.5 rounded-full">
              WHY RYZE
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">The smarter alternative</h2>
            <p className="text-muted-foreground text-lg">See how we compare — across every metric that matters.</p>
          </motion.div>

          <div className="rounded-3xl border border-border/60 bg-gradient-to-b from-card to-card/80 overflow-hidden organic-shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-5 font-heading font-semibold text-sm text-muted-foreground">Feature</th>
                    <th className="p-5 font-heading font-semibold text-sm text-muted-foreground text-center">Agencies</th>
                    <th className="p-5 font-heading font-semibold text-sm text-muted-foreground text-center">AI Tools</th>
                    <th className="p-5 font-heading font-semibold text-sm text-primary text-center bg-primary/5">Ryze Studios</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="p-5 font-heading font-semibold text-sm">{row.feature}</td>
                      <td className="p-5 text-sm text-muted-foreground text-center">{row.agency}</td>
                      <td className="p-5 text-sm text-muted-foreground text-center">{row.ai}</td>
                      <td className="p-5 text-sm font-semibold text-primary text-center bg-primary/5">{row.ryze}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 font-heading text-xs px-4 py-1.5 rounded-full">
              PRICING
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Plans for every stage</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Scale from solo creator to full production house. No contracts, cancel anytime.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subscriptionTiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className={`relative h-full rounded-3xl transition-all duration-300 card-hover ${tier.popular ? "border-primary ring-2 ring-primary/20 organic-shadow-lg" : ""} ${tier.premium ? "bg-gradient-to-b from-card to-primary/5 border-primary/30" : "organic-shadow border-border/60"}`}>
                  {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground font-heading text-[10px] rounded-full px-4">Most Popular</Badge></div>}
                  {tier.premium && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-foreground text-background font-heading text-[10px] rounded-full px-4">Premium</Badge></div>}
                  <CardHeader className="pb-3 pt-7">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-2">
                      <tier.icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <CardTitle className="font-heading text-base">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-4xl font-heading font-black">${tier.price}</span>
                      <span className="text-muted-foreground text-sm">/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{tier.tagline}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2.5 mb-6">
                      {tier.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          {f.included ? (
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              <X className="w-3 h-3 text-muted-foreground/40" />
                            </div>
                          )}
                          <span className={`text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50"}`}>{f.text}</span>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full rounded-xl font-heading ${tier.popular || tier.premium ? "bg-primary text-primary-foreground hover:bg-primary-pressed" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADD-ONS ═══ */}
      <section className="py-16 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Enhance any plan</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Add individual services to your subscription.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {addOns.map((addon, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="h-full rounded-3xl organic-shadow card-hover border-border/60">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
                      <addon.icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-sm mb-1">{addon.name}</h3>
                    <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{addon.desc}</p>
                    <div className="mt-auto">
                      <span className="text-2xl font-heading font-black">{addon.price}</span>
                      {addon.unit && <span className="text-xs text-muted-foreground ml-1">{addon.unit}</span>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL MEDIA GRID ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Template store</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">See how our templates transform your brand's social presence.</p>
          </motion.div>

          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {gridIndustries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveGridIndustry(ind)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${activeGridIndustry === ind ? "bg-card border border-border organic-shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {gridEmojis[ind]} {ind}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const gradients = [
                "from-rose-300 to-pink-500", "from-amber-300 to-orange-500", "from-emerald-300 to-teal-500",
                "from-sky-300 to-blue-500", "from-violet-300 to-purple-500", "from-cyan-300 to-teal-400",
                "from-fuchsia-300 to-pink-500", "from-yellow-300 to-amber-500", "from-lime-300 to-green-500",
                "from-indigo-300 to-blue-600", "from-red-300 to-rose-500", "from-teal-300 to-cyan-500",
              ];
              const isCenter = (i >= 1 && i <= 4) || (i >= 7 && i <= 10);
              return (
                <motion.div key={`${activeGridIndustry}-${i}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  {isCenter ? (
                    <div className="rounded-2xl overflow-hidden border border-border bg-card">
                      <div className="flex items-center gap-1.5 px-2 py-1.5">
                        <img src={ryzeLogo} alt="Ryze" className="w-4 h-4 rounded-full object-cover" />
                        <span className="text-[10px] font-semibold font-heading">Ryze Studios</span>
                      </div>
                      <div className={`aspect-square bg-gradient-to-br ${gradients[i]} flex items-center justify-center`}>
                        <span className="text-white text-3xl drop-shadow-lg">{gridEmojis[activeGridIndustry]}</span>
                      </div>
                      <div className="p-1.5 flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-destructive fill-destructive" />
                        <MessageCircle className="w-3 h-3 text-muted-foreground" />
                        <Send className="w-3 h-3 text-muted-foreground" />
                        <Bookmark className="w-3 h-3 text-muted-foreground ml-auto" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-2xl border-2 border-dashed border-border/50 bg-muted/20" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="rounded-2xl font-heading px-8">
              Browse Template Store <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ BEFORE & AFTER CLIENTS ═══ */}
      <section className="py-20 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 font-heading text-xs px-4 py-1.5 rounded-full">
              CLIENT TRANSFORMATIONS
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Before & After</h2>
          </motion.div>

          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {beforeAfterClients.map((client) => (
              <button
                key={client}
                onClick={() => setActiveClient(client)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${activeClient === client ? "bg-primary text-primary-foreground" : "text-muted-foreground border border-border hover:text-foreground"}`}
              >
                {client}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4">Before</h3>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-muted border border-border flex items-center justify-center">
                    <span className="text-2xl opacity-50">📷</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {["Inconsistent visual identity", "Basic stock-like content", "Limited content variety", "Missed engagement opportunities"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-primary">After</h3>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => {
                  const grads = ["from-rose-400 to-pink-500", "from-teal-400 to-cyan-500", "from-amber-400 to-orange-500", "from-violet-400 to-purple-500", "from-sky-400 to-blue-500", "from-emerald-400 to-teal-500", "from-fuchsia-400 to-pink-500", "from-indigo-400 to-blue-500", "from-yellow-400 to-amber-500"];
                  return (
                    <div key={i} className={`aspect-square rounded-2xl bg-gradient-to-br ${grads[i]} flex items-center justify-center`}>
                      <span className="text-2xl text-white drop-shadow">✨</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 space-y-2">
                {["Strong brand consistency", "Custom designed content", "Diverse content mix", "Strategic engagement"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEMO VIDEO ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3">See Ryze in action</h2>
            <p className="text-muted-foreground mb-8">Watch our 4-min demo, then get started or book a call.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-video rounded-3xl overflow-hidden bg-muted border border-border organic-shadow-lg group cursor-pointer mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/70 to-foreground/50 flex items-center justify-center">
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center cyan-glow group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-heading text-sm bg-foreground/40 px-3 py-1 rounded-full">4:15</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
                  <CalendarDays className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-heading font-bold mb-1">Schedule a call</h3>
                <p className="text-sm text-muted-foreground mb-4">Book a 20-min call and get your questions answered.</p>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-heading rounded-xl">Book a Call</Button>
              </CardContent>
            </Card>
            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold mb-1">Get started now</h3>
                <p className="text-sm text-muted-foreground mb-4">Select a plan and start using Ryze Studios right away.</p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-xl">Start Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ SEAMLESS EXPERIENCE ═══ */}
      <section className="py-20 px-6 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 font-heading text-xs px-4 py-1.5 rounded-full">
              <LayoutGrid className="w-3 h-3 mr-1.5" /> FEATURES
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Seamless experience</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A flexible subscription service powered by technology to deliver compelling creative at scale.</p>
          </motion.div>

          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {featureTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFeatureTab(tab)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-heading font-medium transition-all ${activeFeatureTab === tab ? "bg-card text-foreground organic-shadow border border-border" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div key={activeFeatureTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-card border border-border organic-shadow-lg p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">{featureContent[activeFeatureTab].title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{featureContent[activeFeatureTab].desc}</p>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-3">
                    <LayoutGrid className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-heading">{activeFeatureTab} Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE BETTER WAY — with graphs ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 font-heading text-xs px-4 py-1.5 rounded-full">
              THE RYZE ADVANTAGE
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Built different</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Working with <strong className="text-foreground">2,400+</strong> brands, we've perfected the formula for premium creative at scale.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Cost comparison */}
            <Card className="rounded-3xl organic-shadow card-hover bg-gradient-to-br from-card to-accent/20 border-border/60">
              <CardContent className="p-8">
                <Badge className="mb-3 bg-primary/10 text-primary border-0 text-[10px] font-heading rounded-full">📉 COST COMPARISON</Badge>
                <h3 className="text-2xl font-heading font-bold mb-6">Save up to 95%</h3>
                <div className="space-y-4">
                  {[
                    { label: "Traditional Agency", value: 100, amount: "$2,000+/mo", color: "bg-destructive/50" },
                    { label: "Freelancers", value: 60, amount: "$1,200/mo", color: "bg-muted-foreground/30" },
                    { label: "AI SaaS Tools", value: 25, amount: "$500/mo", color: "bg-muted-foreground/20" },
                    { label: "Ryze Studios", value: 5, amount: "From $10/mo", color: "bg-primary" },
                  ].map((bar, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-heading font-medium">{bar.label}</span>
                        <span className="text-xs font-heading font-bold">{bar.amount}</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`h-full rounded-full ${bar.color}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Turnaround */}
            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-8">
                <Badge className="mb-3 bg-accent text-accent-foreground border-0 text-[10px] font-heading rounded-full">⏱️ TURNAROUND TIME</Badge>
                <h3 className="text-2xl font-heading font-bold mb-6">Lightning-fast delivery</h3>
                <div className="flex items-end gap-4 h-48 mb-4">
                  {[
                    { label: "Agency", days: 21, height: "100%", color: "bg-destructive/30" },
                    { label: "Freelancer", days: 14, height: "67%", color: "bg-muted-foreground/20" },
                    { label: "AI SaaS", days: 1, height: "5%", color: "bg-muted-foreground/15", note: "Low quality" },
                    { label: "Ryze", days: 1, height: "5%", color: "bg-primary", note: "Premium" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                      <span className="text-xs font-heading font-bold mb-1">{bar.days}d</span>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: bar.height }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`w-full rounded-xl ${bar.color}`} style={{ minHeight: 12 }} />
                      <span className="text-[10px] text-muted-foreground mt-2 font-heading text-center">{bar.label}</span>
                      {bar.note && <span className="text-[9px] text-primary font-medium">{bar.note}</span>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {/* Quality ring */}
            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-8 text-center">
                <Badge className="mb-3 bg-accent text-accent-foreground border-0 text-[10px] font-heading rounded-full">🎯 QUALITY</Badge>
                <div className="relative w-28 h-28 mx-auto my-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <motion.circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeDasharray={264} initial={{ strokeDashoffset: 264 }} whileInView={{ strokeDashoffset: 264 * 0.02 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-heading font-black">98%</span>
                  </div>
                </div>
                <p className="font-heading font-semibold text-sm">Satisfaction</p>
                <p className="text-xs text-muted-foreground mt-1">2,400+ projects</p>
              </CardContent>
            </Card>

            {/* Collaboration */}
            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-8">
                <Badge className="mb-3 bg-accent text-accent-foreground border-0 text-[10px] font-heading rounded-full">💬 COLLABORATION</Badge>
                <h3 className="text-lg font-heading font-bold mb-4">Built for teams</h3>
                <div className="bg-muted rounded-2xl p-3 space-y-2">
                  <div className="bg-card rounded-xl p-2.5 text-xs"><strong>Martin</strong> · I'm your Account Manager</div>
                  <div className="bg-primary/10 rounded-xl p-2.5 text-xs"><strong>Anna</strong> · Thanks! I'll reach out soon.</div>
                </div>
              </CardContent>
            </Card>

            {/* Output growth */}
            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-8">
                <Badge className="mb-3 bg-accent text-accent-foreground border-0 text-[10px] font-heading rounded-full">📈 GROWTH</Badge>
                <h3 className="text-lg font-heading font-bold mb-4">Content output</h3>
                <div className="flex items-end gap-1.5 h-28 mt-4">
                  {[15, 25, 30, 45, 55, 50, 70, 80, 75, 90, 95, 100].map((h, i) => (
                    <motion.div key={i} className="flex-1 rounded-t-lg relative overflow-hidden" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}>
                      <div className="absolute inset-0 bg-primary/20" />
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg" style={{ height: `${60 + i * 3}%` }} />
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-primary font-heading font-semibold mt-3 text-center">+340% avg. increase</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-8">
                <h3 className="text-xl font-heading font-bold mb-4">Say goodbye to</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Searching for freelancers", "Slow turnaround times", "Expensive agencies", "Dozens of interviews", "Getting 100 applications", "Still having no one"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-destructive" />
                      </div>
                      <span className="text-muted-foreground text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl organic-shadow card-hover border-border/60">
              <CardContent className="p-8">
                <h3 className="text-xl font-heading font-bold mb-4">Flexible & simple</h3>
                <div className="flex flex-wrap gap-2">
                  {["Cancel anytime", "No contracts", "Pause anytime", "Upgrade/Downgrade", "One monthly payment"].map((item, i) => (
                    <Badge key={i} className="bg-accent text-accent-foreground border-0 text-xs font-heading rounded-full px-4 py-1.5">{item}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ RESELLER CTA ═══ */}
      <section className="px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-primary/8 via-card to-accent/40 border border-primary/20 p-7 md:p-9 organic-shadow-lg">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Looking to resell our services?</h3>
                  <p className="text-muted-foreground text-sm">Apply to join the Ryze Studios reseller program</p>
                </div>
              </div>
              <Button onClick={() => navigate("/reseller")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-2xl px-8 py-5 whitespace-nowrap">
                Apply to become a reseller <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 font-heading text-xs px-4 py-1.5 rounded-full">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Questions & answers</h2>
            <p className="text-muted-foreground">Can't find what you need? Book a call with our team.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">
            <div>
              {faqItems.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="hidden md:block">
              <Card className="sticky top-24 rounded-3xl organic-shadow border-primary/15">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Get a free strategy call</h3>
                  <p className="text-sm text-muted-foreground mb-4">Let's discuss how Ryze can help your brand grow.</p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-xl">
                    Schedule Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-7 h-7 rounded-xl object-cover" />
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

/* ═══ BEFORE/AFTER HERO SLIDER ═══ */
const BeforeAfterHero: React.FC = () => {
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
      className="relative w-full max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden cursor-col-resize select-none border border-border organic-shadow-lg"
      onMouseDown={() => { dragging.current = true; }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => { dragging.current = true; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-2xl bg-secondary mb-4 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
          <p className="text-muted-foreground font-heading font-semibold text-lg">Raw Product Photo</p>
          <p className="text-muted-foreground/60 text-sm mt-1">Plain background, basic lighting</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20 flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-4 flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
          <p className="font-heading font-semibold text-lg text-foreground">Ryze AI Environment</p>
          <p className="text-muted-foreground text-sm mt-1">Studio-grade, brand-ready</p>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-primary/60" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-primary flex items-center justify-center cyan-glow-sm cursor-col-resize">
          <span className="text-primary-foreground text-xs font-bold">⟷</span>
        </div>
      </div>
      <div className="absolute top-4 left-4"><Badge variant="secondary" className="font-heading rounded-xl">Before</Badge></div>
      <div className="absolute top-4 right-4"><Badge className="bg-primary text-primary-foreground font-heading rounded-xl">After</Badge></div>
    </div>
  );
};

export default Index;
